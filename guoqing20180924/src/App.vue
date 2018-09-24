<template>
    <div id="app">
        <div class="header">
            <img src="./assets/images/header.jpg"/>
        </div>
        <section class="section-1">
            <ul>
                <li v-for="item in signs" :key="item.id" @click.once="signEvent">
                    <div class="box">
                        <div class="time">{{item.day}}</div>
                        <div class="integral">{{item.num}}积分</div>
                        <div class="signin img-size" :class="{show:item.check}" data-width="90" data-height="80"></div>
                    </div>
                </li>
            </ul>
            <div class="box day5" v-if="signs5" @click="signEvent">
                <div class="time">{{signs5.day}}</div>
                <div class="integral">
                    积分翻倍 {{signs5.num}}积分
                    <i class="i1"></i>
                    <i class="i2"></i>
                </div>
                <div class="signin img-size" data-width="90" data-height="80"></div>
            </div>
        </section>
        <section class="section-2">
            <div class="tit2"><img src="./assets/images/tit2.jpg"/> </div>
            <ul v-for="arr in [Investment.slice(0,2),Investment.slice(2)]" :key="arr.id">
                <li v-for="item in arr" :key="item.id">
                    <div class="box">
                        <div class="time">10月1日</div>
                        <div class="integral">
                            <div class="item">
                                <div class="num">
                                    {{item.money200}}<em>元</em>
                                </div>
                                <div class="status" :class="{gray:item.statusNum!==0}">
                                    {{item.status200}}
                                </div>
                            </div>
                            <div class="jian"><img src="./assets/images/jian.jpg"/></div>
                            <div class="item">
                                <div class="num">
                                    {{item.money500}}<em>元</em>
                                </div>
                                <div class="status" :class="{gray:item.statusNum!==1}">
                                    {{item.status500}}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="box day5" v-if="Investment5">
                <div class="time">{{Investment5.day}}</div>
                <div class="integral">
                    <div class="item">
                        <div class="num">
                            {{Investment5.money200}}<em>元</em>
                        </div>
                        <div class="status" :class="{gray:Investment5.statusNum!==0}">
                            {{Investment5.status200}}
                        </div>
                    </div>
                    <div class="jian"><img src="./assets/images/jian.jpg"/></div>
                    <div class="item">
                        <div class="num">
                            {{Investment5.money500}}<em>元</em>
                        </div>
                        <div class="status" :class="{gray:Investment5.statusNum!==1}">
                            {{Investment5.status500}}
                        </div>
                    </div>
                    <i class="i1"></i>
                    <i class="i2"></i>
                </div>
            </div>
        </section>
        <div class="explain">
            <div class="tit3"><img src="./assets/images/tit3.jpg"/> </div>
            <p>1、本活动时间2018年10月1日 至2018年10月5日（每日交易时间为6点-次日4点）</p>
            <p>2、活动期间，签到送积分，每日签到100积分，连续签到5天，第5天可获得500积分，每日现金交易满200元 送20元，满500元送 100元，连续完成5天任务，第5天现金交易满200元 送100元，满500元 送380元。</p>
            <p>3、活动奖励，将会在产生后的下一个交易日内以积分方式发送至账户中，如使用非正常手段套取活动奖励，一经核实，奖励不予发放，并进行封号处理。</p>
        </div>
        <div class="copyright">
            法律范围内的活动解释权归简易操盘所有，有任何问题请咨询APP内客服
            本产品属高风险、高收益投资品种，投资者应具备较高风险识别能力、
            资金实力与风险承受能力，合理配置资产。市场有风险，投资需谨慎。
        </div>
    </div>
</template>

<script>
    import API from "./contant/urls/URLS";

    export default {
        computed:{
        },
        data(){
            return{
                signs : [],
                signs5 : null,
                Investment : [],
                Investment5 : null,
            }
        },
        mounted(){
            this.setImgSize();
            this.init();
        },
        methods:{
            init(){
                let self = this;
                self.$pops.loadding();
                const promises = [API.user_guoqin_list,API.user_guoqin_ticket].map(url=>{
                    return new Promise((resolve,reject)=>{
                        this.ajax({
                            url : url
                        }).then(data=>{
                            data.url = url;
                            resolve(data);
                        })
                    });
                });
                Promise.all(promises).then(arr=>{
                    arr.forEach(data=>{
                        if(data.url === API.user_guoqin_list){
                            if(data.response.data){
                                let list = data.response.data.list.map(obj=>{
                                    obj.day= obj.day.substr(4,2)+"月"+obj.day.substr(6)+"日";
                                    return obj;
                                });
                                self.signs = list.slice(0,4);
                                self.signs5 = list[4];
                                self.$nextTick(()=>{
                                    self.setImgSize();
                                })
                            }
                        }else if(data.url === API.user_guoqin_ticket){
                            if(data.response.data){
                                let list = data.response.data.list.map(obj=>{
                                    obj.day= obj.day.substr(4,2)+"月"+obj.day.substr(6)+"日";
                                    /*let statusVal = {
                                        "0" : "未完成",//日期还没到达
                                        "1" : "未完成",//是当日
                                        "2" : "已完成",//以前日期，已经领取过
                                        "3" : "未完成",//以前日期，没有达到条件
                                    };*/
                                    obj.statusNum= obj.trade_deposit >= 200?0:obj.trade_deposit >= 500?1:-1;
                                    obj.status200 = obj.statusNum === 0?"已完成":"未完成";
                                    obj.status500 = obj.statusNum === 1?"已升级":"未完成";
                                    //obj.statusVal = statusVal[obj.status];
                                    return obj;
                                });
                                self.Investment = list.slice(0,4);
                                self.Investment5 = list[4];
                                self.$nextTick(()=>{
                                    self.setImgSize();
                                })
                            }
                        }
                    });
                    self.$pops.removeLoadding();
                });
            },
            signEvent(){
                this.ajax({
                    url : API.user_guoqin_add,
                    callback : true,
                }).then(data=>{
                    if(data.ret===1){
                        this.$pop({
                            title : "错误",
                            close : true,//是否显示关闭按钮
                            icon : "icon2",
                            content :data.response.message,
                            superClass : "singinOk",
                        });
                        return;
                    }
                    this.$pop({
                        title : "奖励"+data.response.data.integral_num+"积分",
                        close : true,//是否显示关闭按钮
                        content : `
                        <div class="img"></div>
                        <p>活动期间交易，更多奖励等你拿！</p>
                    `,
                        icon : "icon1",//icon1 确定 2取消 3提示
                        superClass : "singinOk",
                    });
                })
            }
        },
    }
</script>

<style>
    #app{
        background:#ffcd94;
    }
    .header{
        img{
            display:block;
            width:100%;
        }
    }
    .box{
        flex:1;
        margin:0 7px;
        padding:3px;
        background:#d41819;
        color:#fff;
        position:relative;
        z-index: 2;
        .time{
            height:25px;
            line-height:25px;
            background:#e15045;
            text-align:center;
            font-size: 12px;
            color:rgba(255,255,255,.5);
        }
        .integral{
            display:flex;
            position:relative;
            z-index: 3;
            min-height:40px;
            justify-content:center;
            align-items:center;
        }
        .signin{
             position:absolute;
             right:0;
             bottom:0;
            display:none;
             background:url("./assets/images/qian.png") no-repeat;
             background-size: contain;
            &.show{
                display:block;
            }
         }
        .i1,.i2{
            position:absolute;
            left:20px;
            width:50px;
            height:30px;
            background:url("./assets/images/img1.png") no-repeat;
            background-size: contain;
        }
        .i2{
            left:auto;
            right:20px;
            top:15px;
            transform:rotate(90deg);
        }
    }
    .section-1,.section-2{
        margin-bottom:20px;
        padding:0 5px;
        ul{
            padding:10px 0;
            display:flex;
            flex-direction:row;
            li{
                flex:1;
                display:flex;
                justify-content:center;
                align-items:center;
            }
        }
        .day5{
            margin:0 7px;
        }
    }
    .section-2{
        .integral{
            display:flex;
            padding:5px 0;
            .item{
                flex:1;
                line-height:25px;
                text-align:center;
            }
            .jian{
                width:20%;
                img{
                    display:block;
                    width:100%;
                }
            }
            .status{
                display:inline-block;
                line-height:20px;
                padding:0 5px;
                border-radius:5px;
                background:#830404;
                font-size:12px;
                &.gray{
                    background:none;
                    color:rgba(255,255,255,.5);
                }
            }
            .i1{
                left:10px;
            }
            .i2{
                top:25px;
                right:0;
            }
        }
    }
    .tit2{
        img{
            display: block;
            width:75%;
            margin:0 auto;
        }
    }
    .tit3{
        margin-bottom:5px;
        img{
            display: block;
            width:28%;
            margin:0 auto;
        }
    }
    .explain{
        padding:20px 20px 10px;
        color:#333;
        p{
            padding:5px 0;
            line-height:25px;
        }
    }
    .copyright{
        background:#e7b378;
        padding:20px;
        line-height:22px;
        color:#894900;
    }
    .singinOk{
        .img{
            background: url("./assets/images/singinsuccess1.jpg") center 0 no-repeat;
            background-size: contain;
            width:50px;
            height:80px;
            margin:0 auto;
        }
    }
</style>
