<style>
    .article{
        //background:url("./assets/images/bg.jpg") repeat-y;
        background:#3d2353;
        background-size: 100%;
        height:100%;
        overflow-y:scroll;
        .top{
            img{
                width:100%;
            }
        }
        .box{
            padding:20px;
            .tit{
                text-align:center;
                .name{
                    display:inline-block;
                    padding:5px 15px;
                    border:1px solid #fff;
                    border-radius:100px;
                    background:#f2577b;
                    color:#fff;
                }

            }
            .cnt{
                margin-top:10px;
                padding:10px;
                border:1px solid #fff;
                border-radius:10px;
                .container{
                    padding:10px;
                    background:#fff;
                    border-radius:10px;
                }
            }
        }
        .nav{
            display:flex;
            li{
                flex:1;
                padding:7px 0;
                border-radius:50px;
                border:1px solid #ddd;
                color:#fff;
                &:first-child{
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }
                &:last-child{
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
                &.cur{
                    background:#f2577b;
                }
            }
        }
        .explain{
            font-size:12px;
            h2{
                padding:5px 0;
                font-size:14px;
                line-height: 25px;
            }
            .tab{
                margin:10px 0;
                border-bottom:1px solid #ddd;
                background:#f8f8f8;
               ul{
                   display: flex;
                   border-left:1px solid #ddd;
                   border-top:1px solid #ddd;
                   li{
                       flex:1;
                       border-right:1px solid #ddd;
                       padding:5px;
                   }
               }
            }
            p{
                color:#666;
            }
        }
        .gua{
            padding-top: 0;
        }
        .bottom{
            padding-top:10px;
            overflow:hidden;
            .pro{
                float:left;
                width:50%;
            }
            .percent{
                height:6px;
                line-height:6px;
                border-radius:5px;
                background:#eee;
                .num{
                    height:6px;
                    background:#f25472;
                }
            }
            .txt{
                padding-top:5px;
                em{
                    color:#c50000;
                }
            }
            .submit{
                float:right;
                width:40%;
                .btn{
                    padding:5px 0;
                }
            }
        }
        .container{
            .option{
                &:last-child{
                    max-height:320px;
                    overflow-y:scroll;
                }
                ul{
                    display:flex;
                    height:30px;
                    line-height:30px;
                    li{
                        flex:1;
                    }
                }
            }
        }
    }
</style>
<template>
    <article class="article">
        <div class="top">
            <img src="./assets/images/appd.png"/>
        </div>
        <div class="box gua">
            <div class="tit">
                <div class="name">
                    每日 10:00刮刮卡 限量抢 100%中奖
                </div>
            </div>
            <div class="cnt">
                <div class="container">
                    <div class="img">
                        <guagua :data="guaNum" :result="data1" :isCheck="isCheck"></guagua>
                    </div>
                    <div class="bottom" v-if="guaNum.time_start==0">
                        <div class="pro">
                            <div class="percent">
                                <div class="num" :style="{width:parseInt(guaNum.end_left_num)/parseInt(guaNum.max_num)*100+'%'}"></div>
                            </div>
                            <div class="txt">
                                限量{{guaNum.max_num}}张，剩余<em>{{guaNum.end_left_num}}</em>张
                            </div>
                        </div>
                        <div class="submit">
                            <div class="btn" :class="{gray:!guaNum.use_num}" @click="btnEvent">
                                {{btnVal}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box explain">
            <div class="tit">
                <ul class="nav">
                    <li @click="setTab(0)" :class="{cur:navIndex==0}">活动规则</li>
                    <li @click="setTab(1)" :class="{cur:navIndex==1}">中奖记录</li>
                </ul>
            </div>
            <div class="cnt">
                <div class="container">
                    <div class="option" v-show="navIndex==0">
                        <h2>1、活动时间：2018.8.16至2018.9.30中的交易日，非交易日活动不开放。</h2>
                        <h2>2、刮刮卡</h2>
                        <p>活动期间，每天限量{{guaNum.max_num}} 张刮刮卡，10：00开抢，每天每人限抢1张，抢完为止。 刮刮乐，可刮出手续费减免卡和折扣卡，如下：</p>
                        <div class="tab">
                            <div class="header">
                                <ul>
                                    <li>刮刮卡</li>
                                    <li>使用说明</li>
                                </ul>
                            </div>
                            <div class="list">
                                <ul>
                                    <li>手机费减免</li>
                                    <li>当日手续费全部减免</li>
                                </ul>
                                <ul>
                                    <li>手续费5折</li>
                                    <li>当日手续费全部5折</li>
                                </ul>
                                <ul>
                                    <li>手续费7折</li>
                                    <li>当日手续费全部7折</li>
                                </ul>
                                <ul>
                                    <li>手续费8折</li>
                                    <li>当日手续费全部8折</li>
                                </ul>
                                <ul>
                                    <li>手续费9折</li>
                                    <li>当日手续费全部9折</li>
                                </ul>
                                <ul>
                                    <li>手续费9.5折</li>
                                    <li>当日手续费全部9.5折</li>
                                </ul>
                            </div>
                        </div>
                        <!--<p>当日抢到的刮刮乐，需当日24:00前刮开，逾期不刮，自动作废，概不补发</p>-->
                        <h2>3、刮到相应福利后，享受的手续费减免或打折，当天交易日内有效，如老王2018年9月4日刮到手续费5折，则他在9月4日06:00到次日凌晨04:00之间的全部现金建仓的手续费，享受5折优惠，平仓时间不限。</h2>
                        <h2>4、减免的手续费将在第二个交易日18:00点前以积分的形式即发送到账户中（100=1元代金券）。</h2>
                        <h2>5、在法律范围内活动最终解释权权归简易操盘所有</h2>
                    </div>
                    <div class="option option-list" v-show="navIndex==1">
                        <div class="tablist" v-if="logList">
                            <ul class="head">
                                <li>奖品折扣</li>
                                <li>时间</li>
                            </ul>
                            <ul v-for="item in logList" :key="item.id">
                                <li>{{{1:"全免",2:"5折",3:"7折",4:"8折",5:"9折",6:"9.5折"}[item.card_type]}}</li>
                                <li>{{item.add_time}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    /**
     * http://devapi.jianyicp.com/user/user_gua_add?token=96dbc4eb6a63ef2fcafec2c554c0239e  用这接口测刮刮卡
     */
    import guagua from "./guagua"
    export default {
        components:{
            guagua
        },
        computed:{
        },
        data(){
            return{
                navIndex : 0,
                btnVal : "抢刮刮卡",
                guaNum:{
                    end_left_num:0,//#今日剩余领取刮刮卡个数
                    use_num: 1,//#当前用户可以领取的刮刮卡次数
                },
                data1 : {},
                logList : [],
                isCheck : false,
            }
        },
        mounted(){
            this.setImgSize();
            this.init();
            this.getAllList();
        },
        methods:{
            setTab( i ){
                  this.navIndex = i;
            },
            getAllList(){
                let self = this,
                    page = 1 ,
                    pageSize = 10,
                    loading = true;

                function getList(){
                    if(loading==false) return;
                    loading = false;
                    self.ajax({
                        url: "http://api4.jianyicp.com/user/user_gua_log",
                        data: {
                            page: page,
                            page_count: pageSize
                        }
                    }).then(_data=>{
                        /*_data ={
                            "ret": 0,
                            "response": {
                                "message": "success",
                                "data": {
                                    "list": [
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                        {
                                            "card_type": "6", //#卡类型: 1全免，2，5折，3 7折，4 8折，5 9折	;6 9.5折
                                            "add_time": "08-10 17:17:46", //生成时间
                                            "use_day": "20180810"  //日期
                                        },
                                    ]
                                }
                            },
                            "benchmark": 0
                        }*/
                        let list = _data.response.data.list;
                        if(!list || !list.length) return;
                        self.logList = self.logList.concat(list);
                        loading = true;
                        self.$nextTick(function(){
                            let box = $('.option-list');
                            box.unbind().on('scroll',function(){
                                let scrollHeight = box[0].scrollHeight ,
                                    height = box.height();
                                console.log(1)
                                let scrollTop = $(this).scrollTop()+height+100;
                                if(scrollTop>scrollHeight){
                                    page++;
                                    getList();
                                }
                            })
                        });
                    });
                }
                getList();
            },
            init() {
                let self = this;
                self.ajax({
                    url : "http://api4.jianyicp.com/user/user_gua_num",
                    load : true
                }).then(data=>{
                    /*data = {
                        "ret":0,
                        "response":{
                            "message":"\u8bf7\u6c42\u6210\u529f",
                            "data":{
                                "end_left_num":"5",
                                "use_num":1,
                                "time_start":0,
                                max_num : 100
                            }
                        },
                        "benchmark":0
                    };*/
                    self.guaNum = data.response.data;
                    self.btnVal = self.guaNum.use_num<1?"今日已抢":"抢刮刮卡";
                    if(self.guaNum.end_left_num<1){
                        self.btnVal = "没有机会了"
                    }
                });
            },
            callApp(){
                if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                    directToTrade()
                }else{
                    window.jianyi.directToTrade()
                }
            },
            btnEvent(){
                let self = this;
                if(self.guaNum.use_num<1) return;
                self.guaNum.use_num = 0;
                self.ajax({
                    url : "http://api4.jianyicp.com/user/user_gua_add",
                    callback:true
                }).then(data=>{
                    //data = {"ret":0,"response":{"message":"\u9886\u53d6\u6210\u529f","data":{"user_id":"11","status":1,"card_type":6,"add_time":1533890636,"use_day":"20180810"}},"benchmark":0}
                    if(data.ret==0){
                        self.isCheck = true;
                        self.btnVal = "今日已抢";
                        self.guaNum.use_num = 0;
                        self.guaNum.end_left_num--;
                        self.data1 = data.response.data;
                        return;
                    }
                    self.$pop({
                        title: "错误",
                        icon : "icon2",
                        close: true,//是否显示关闭按钮
                        content: data.response.message
                    });
                })
            }
        }
    }
</script>
