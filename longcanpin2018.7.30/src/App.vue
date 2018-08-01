<template>
    <div id="app">
        <div class="app img-size" data-height="334">
            <div class="text img-size" data-paddingTop="295">
                活动时间：8月6日-8月15日
            </div>
        </div>
        <div class="main img-size" data-height="398"></div>
        <div class="submit">
            <div class="btn">
                共计获得代金券：
                <em>0元</em>
            </div>
        </div>
        <div class="tit img1 img-size" data-height="39">&nbsp;</div>
        <article class="date">
            <div class="tit">
                <div class="tab" v-for="item in allData" :class="{current:item.current}" :key="item.key">
                    {{item.tit.substr(4,2)}}月<br/>{{item.tit.substr(6,2)}}日
                </div>
            </div>
            <div class="cnt">
                <ul v-for="item in allData" :class="{cur:item.current}" :key="item.key">
                    <li :class="{'-1':'','0':'open','1':'gray'}[item.cnt[0].status]">
                        <h2>建仓满<em>8</em>元</h2>
                        <div class="img img8 img-size" data-width="152" data-height="157"></div>
                        <div class="btn img-size" data-fontSize="28" @click="callApp"
                             data-paddingLeft="15" data-paddingRight="15">
                            {{{'-1':'去建仓解锁','0':'已获得','1':'过期未获得'}[item.cnt[0].status]}}
                        </div>
                    </li>
                    <li :class="{'-1':'','0':'open','1':'gray'}[item.cnt[1].status]">
                        <h2>建仓满<em>200</em>元</h2>
                        <div class="img img200 img-size" data-width="152" data-height="157"></div>
                        <div class="btn img-size" data-fontSize="28" @click="callApp"
                             data-paddingLeft="15" data-paddingRight="15">
                            {{{'-1':'去建仓解锁','0':'已获得','1':'过期未获得'}[item.cnt[1].status]}}
                        </div>
                    </li>
                    <li :class="{'-1':'','0':'open','1':'gray'}[item.cnt[2].status]">
                        <h2>建仓满<em>10000</em>元</h2>
                        <div class="img img888 img-size" data-width="152" data-height="157"></div>
                        <div class="btn img-size" data-fontSize="28" @click="callApp"
                             data-paddingLeft="15" data-paddingRight="15">
                            {{{'-1':'去建仓解锁','0':'已获得','1':'过期未获得'}[item.cnt[2].status]}}
                        </div>
                    </li>
                </ul>
                <p>*仅限农产品交易，产品包括GL大豆、GL小麦、GL玉米。</p>
            </div>
        </article>
        <div class="tit img2 img-size" data-height="62">&nbsp;</div>
        <article class="date date1">
            <div class="cnt">
                <ul>
                    <li>
                        <h2>连续8天<br>建仓满8元</h2>
                        <div class="img img1 img-size" data-width="200" data-height="180"></div>
                        <h3><em>1/8</em>已解锁</h3>
                    </li>
                    <li>
                        <h2>连续8天<br>建仓满200元</h2>
                        <div class="img img2 img-size" data-width="200" data-height="180"></div>
                        <h3><em>1/8</em>已解锁</h3>
                    </li>
                    <li>
                        <h2>连续8天<br>建仓满10000元</h2>
                        <div class="img img3 img-size" data-width="200" data-height="180"></div>
                        <h3><em>1/8</em>已解锁</h3>
                    </li>
                </ul>
            </div>
        </article>
        <div class="tit img3 img-size" data-height="53">&nbsp;</div>
        <div class="explain">
            <p>1、活动时间：2018年8月6日-2018年8月15日，共计8个可交易日。农产品交易时间为 08:00-20:45，21:30-次日02:20，周六日休市。</p>
            <p>2、活动范围：本次活动仅限农产品交易，产品包括GL大豆、GL小麦、GL玉米。</p>
            <p>3、活动期间，每个交易日可以最多开启3个宝箱，当天现金建仓满8元，可以获得8元代金券；当天现金建仓满200元，可再获得40元代金券（5张8元代金券）；当天现金建仓满10000元，可再获得888元代金券（1张400元，2张200元，11张8元），满足条件后，代金券即时发放到账号中。</p>
            <p>4、活动期间，8个交易日连续现金建仓满8元，可获得终极大奖24元（3张8元代金券）；8个交易日连续现金建仓满200元，可获得终极大奖280元（1张200元，10张8元代金券）；如果8个交易日连续现金建仓10000元，可获得终极大奖1096元（2张400元，1张200元代金券，12张8元代金券），满足条件后，代金券即时发放到账号中。</p>
        </div>
        <div class="copyright">
            法律允许范围内活动解释权归简易操盘所有，有任何问题均可咨询客服
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
        },
        data(){
            return{
                data : null,
                dataObj : null,
                data1 : null,
                allData : null,
                today : T.getDate.today().replace(/\-/g,"")
            }
        },
        mounted(){
            this.setImgSize();
            this.init();
        },
        methods:{
            init(){
                let self = this;
                this.ajax({
                    url : "/user/produce_history"
                }).then(data=>{
                    let type = [24,25,26],//额 外加赠终极大奖
                        typeArr = {},
                        allArr = [];
                    data.response.data.days.forEach(val=>{
                       allArr.push({
                           tit : val
                       })
                    });
                    data.response.data.list.forEach(obj=>{
                        allArr.forEach(all=>{
                            if(obj.money_type!="24" &&
                                obj.money_type!="25" &&
                                obj.money_type!="26" &&
                                obj.day == all.tit
                            ){
                                if(!all.cnt){
                                    all.cnt = [];
                                }
                                all.cnt.push(obj);
                            }
                        });
                        type.forEach(typeNum=>{
                            if(obj.money_type===String(typeNum)){
                                if(!typeArr[typeNum]){
                                    typeArr[typeNum] = []
                                }
                                typeArr[typeNum].push(obj)
                            }
                        });
                        /*num.forEach(num=>{
                            if(obj.day_no == num &&
                                obj.money_type!="24" &&
                                obj.money_type!="25" &&
                                obj.money_type!="26"){
                                if(!arr[num]){
                                    arr[num] = [];
                                }
                                arr[num].push(obj);
                            }
                            type.forEach(typeNum=>{
                                if(obj.money_type===String(typeNum)){
                                    if(!typeArr[typeNum]){
                                        typeArr[typeNum] = []
                                    }
                                    typeArr[typeNum].push(obj)
                                }
                            });
                        })*/
                    });
                    allArr.forEach(obj=>{
                        if(!obj.cnt){
                            obj.cnt = [];
                        }
                        [0,1,2].forEach(val=>{//如果data中没有200，800，888的话，则该产品没有使用;
                            //-1未使用 0已使用 1已过期
                            if(!obj.cnt[val]){
                                obj.cnt[val] = {
                                    status : 1
                                };
                            }else if(obj.cnt[val].day<self.today){
                                obj.cnt[val].status = 0;
                            }else{
                                obj.cnt[val].status = -1;
                            }
                        });
                        obj.current = false;
                        if(obj.tit==self.today){
                            obj.current = true;
                        }
                    });
                    /*$.each(arr,(index,data)=>{
                        [0,1,2].forEach(val=>{//如果data中没有200，800，888的话，则该产品没有使用;
                            //-1未使用 0已使用 1已过期
                            if(!data[val]){
                                data[val] = {
                                    status : 1
                                };
                            }else if(data[val].day<self.today){
                                data[val].status = 0;
                            }else{
                                data[val].status = -1;
                            }
                        });
                        data.forEach(obj=>{
                            data.current = false;
                            if(obj.day==self.today){
                                data.current = true;
                            }
                        });
                    });
                    $.each(arr,(index,data)=>{//如果没有一个是当前状态，则所有时间已过期
                        if(data.current && isCurrent){
                            isCurrent = true
                        };
                    });
                    if(!isCurrent){//将最后一个选择上
                        arr[8].current = true;
                    }*/
                    let isCurrent = false;
                    allArr.forEach(obj=>{
                        if(obj.current && isCurrent){
                            isCurrent = true
                        };
                    });
                    if(!isCurrent){//将最后一个选择上
                        allArr[allArr.length-1].current = true;
                    }
                    //self.data = arr;
                    self.allData = allArr;
                    self.data1 = typeArr;
                    console.log(allArr)
                    self.$nextTick(()=>{
                        self.setImgSize();
                    })
                })
            },
            callApp(){
                if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                    directToTrade()
                }else{
                    window.jianyi.directToTrade()
                }
            }
        }
    }
</script>

<style>
    #app{
        background:#fd4647;
    }
    .app{
        background:url("./assets/images/top.png");
        background-size:contain;
        .text{
            text-align:center;
            color:#fff;
        }
    }
    .main{
        background:url("./assets/images/top1.png");
        background-size:contain;
    }
    .tit{
        &.img1{
            background:url("./assets/images/tit.png") center 0 no-repeat;
            background-size:contain;
        }
        &.img2{
            background:url("./assets/images/tit2.png") center 0 no-repeat;
            background-size:contain;
        }
        &.img3{
            background:url("./assets/images/tit3.png") center 0 no-repeat;
            background-size:contain;
        }
    }
    .submit{
        padding:20px 30px;
        .btn{
            font-size:20px;
            padding:15px 0;
            border-radius:100px;
            color: #ce5d17;
            background-image: -webkit-linear-gradient(top, #fced63, #fec429);
            box-shadow:0 1px 5px rgba(0,0,0,.3);
            em{
                font-size: 25px;
                color:#fd5e49;
            }
        }
    }
    .date{
        padding:15px;
        .tit{
            display:flex;
            background:#f23c38;
            border-top-left-radius:10px;
            border-top-right-radius:10px;
            overflow:hidden;
            .tab{
                flex:1;
                padding:5px;
                text-align:center;
                color:#ff9999;
                border-top:1px solid #df3b26;
                &:first-child{
                    border-left:1px solid #df3b26;
                }
                &:last-child{
                    border-right:1px solid #df3b26;
                }
                &:not(:last-child){
                    border-right:1px solid #df3b26;
                }
                &.current{
                    background:#fff;
                    &:first-child{
                        border-left:none;
                    }
                    &:last-child{
                        border-right:none;
                    }
                }
            }
        }
        .cnt{
            background:#fff;
            padding:10px;
            border-bottom-left-radius:10px;
            border-bottom-right-radius:10px;
            h2{
                color:#fd5e49;
                font-size:15px;
            }
            li{
                .img8{
                    background:url("./assets/images/product/8.png");
                    background-size:contain;
                }
                .img200{
                    background:url("./assets/images/product/200.png");
                    background-size:contain;
                }
                .img888{
                    background:url("./assets/images/product/888.png");
                    background-size:contain;
                }
                &.open{
                    .img8{
                        background-image:url("./assets/images/product/8open.png");
                    }
                    .img200{
                        background-image:url("./assets/images/product/200open.png");
                    }
                    .img888{
                        background-image:url("./assets/images/product/888open.png");
                    }
                    .btn{
                        background:none;
                        box-shadow: none;
                        color:#333;
                    }
                }
                &.gray{
                    .img8{
                        background-image:url("./assets/images/product/8gray.png");
                    }
                    .img200{
                        background-image:url("./assets/images/product/200gray.png");
                    }
                    .img888{
                        background-image:url("./assets/images/product/888gray.png");
                    }
                    .btn{
                        background:none;
                        box-shadow: none;
                        color:#333;
                    }
                }
            }

            .btn{
                font-size:14px;
                padding:5px 15px;
                border-radius:100px;
                color: #ce5d17;
                background-image: -webkit-linear-gradient(top, #fced63, #fec429);
                box-shadow:0 1px 5px rgba(0,0,0,.3);
            }
            ul{
                display:none;
                justify-content:center;
                align-items: center;
                &.cur{
                    display:flex;
                }
                li{
                    flex:1;
                    display:flex;
                    justify-content:center;
                    align-items: center;
                    flex-direction:column;
                }
            }
            p{
                padding-top:20px;
                color:#999;
            }
        }
    }
    .date1{
        .cnt{
            border-radius:10px;
            ul{
                display:flex;
            }
        }
        h2{
            text-align:center;
            padding-bottom:10px;
        }
        h3{
            padding-top:10px;
            text-align:center;
            em{
                color:#fd5e49;
            }
        }
        .img1{
            background:url("./assets/images/pic1.png");
            background-size: contain;
        }
        .img2{
            background:url("./assets/images/pic2.png");
            background-size: contain;
        }
        .img3{
            background:url("./assets/images/pic3.png");
            background-size: contain;
        }
    }
    .explain{
        margin:20px;
        padding:15px;
        background:#f23c38;
        border-radius:10px;
        color:#fff;
        p{
            padding:5px 0;
            line-height:22px;
        }
    }
    .copyright{
        background:#e23a24;
        padding:10px 15px;
        text-align:center;
        color:#fff;
    }
</style>
