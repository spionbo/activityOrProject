<style scoped>
#c1{
    display: inherit;
    border:none;
    padding:0;
    margin:0;
    position: relative;
    z-index: 3;
}
    #top{
        position:relative;
        z-index: 2;
        height:150px;
        .result{
            position:absolute;
            left:0;
            top:0;
            right:0;
            display:flex;
            height:100%;
            align-items: center;
            justify-content: center;
            text-align:center;
            background:#ffebd8;
            img{
                display:block;
                max-width: 100%;
            }
        }
        .getTime{
            width:100%;
            height:100%;
            font-size:20px;
            display:flex;
            justify-items: center;
            align-items: center;
            time{
                display:block;
                width:100%;
                text-align:center;
            }
        }
    }
</style>
<template>
    <div id="top" v-if="data">
        <canvas id="c1" v-show="canvasShow" class="canvas"></canvas>
        <div class="result" v-if="data.time_start<=0">
            <img :src="imgSrc">
        </div>
        <div v-else class="getTime">
            <time>{{time}}</time>
        </div>
    </div>
</template>
<script>
    import "./common/time";
    export default {
        props:['data','result','isCheck'],
        data(){
            return{
                msg:"",
                imgSrc : require("./assets/images/product/else.png"),
                canvasShow : false,
                canvasText : "请先抢刮刮卡",
                time:"",
            }
        },
        mounted(){
            let self = this;
            self.canvasShow = self.data.use_num>0;
            this.$nextTick(function(){
                self.init();
            });
            if(this.data.use_num==0){
                this.imgSrc = require("./assets/images/product/no.png");
            }
        },
        watch:{
            isCheck(val){
                this.canvasText="刮一下";
                self.canvasShow = true;
                this.init();
            },
            data( data ){
                let self = this ,
                    time = "";
                function timestampToTime(timestamp) {
                    let date = new Date(timestamp * 1000),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                        Y = date.getFullYear() + '/',
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                        D = date.getDate() + ' ',
                        h = date.getHours() + ':',
                        m = date.getMinutes() + ':',
                        s = date.getSeconds();
                    return Y+M+D+h+m+s;
                }
                if(data.time_start>0){
                    self.canvasShow = false;
                    new CountTime({
                        updateTime : true,
                        startTime : timestampToTime(data.time_start),
                        callback : function(obj){
                            time = "倒计时"+obj.day+"天 "+obj.hour+":"+obj.minute+":"+obj.second;
                            self.time = time;
                        }
                    });
                }else{
                    if(self.data.use_num>0){ //如果有机会
                        self.canvasShow = true;
                    }
                    if(!self.isCheck && self.data.use_num<1){//没有机会
                        self.canvasShow = false;
                        self.imgSrc = require("./assets/images/product/no.png");
                    }
                    if(self.data.end_left_num==0){
                        self.canvasShow = false;
                        self.imgSrc = require("./assets/images/product/00.png");
                    }
                }
            },
            result( obj ){
                /*let imgName = "0"+obj.card_type ,
                    src = "./assets/images/product/"+imgName+".png";*/
                let num = {1:1,2:5,3:7,4:8,5:9,6:9.5};
                switch(num[obj.card_type]){
                    case 1:
                        this.imgSrc = require("./assets/images/product/01.png");
                        break;
                    case 5:
                        this.imgSrc = require("./assets/images/product/05.png");
                        break;
                    case 7:
                        this.imgSrc = require("./assets/images/product/07.png");
                        break;
                    case 8:
                        this.imgSrc = require("./assets/images/product/08.png");
                        break;
                    case 9:
                        this.imgSrc = require("./assets/images/product/09.png");
                        break;
                    case 9.5:
                        this.imgSrc = require("./assets/images/product/09.5.png");
                        break;
                }
            }
        },
        methods:{
            init(){
                let self = this,
                    top = $("#top"),
                    c1 = document.getElementById("c1"); //画布
                if(!c1) return;
                let ctx, //画笔
                    ismousedown, //标志用户是否按下鼠标或开始触摸
                    isOk=0, //标志用户是否已经刮开了一半以上
                    width = top.width(),
                    height = 150,
                    fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);//这是为了不同分辨率上配合@media自动调节刮的宽度

                function add(){
                    //这里很关键，canvas自带两个属性width、height,我理解为画布的分辨率，跟style中的width、height意义不同。
                    //最好设置成跟画布在页面中的实际大小一样
                    //不然canvas中的坐标跟鼠标的坐标无法匹配
                    c1.width=width;
                    c1.height=height;
                    ctx = c1.getContext("2d");
                    //PC端的处理
                    c1.addEventListener("mousemove",eventMove,false);
                    c1.addEventListener("mousedown",eventDown,false);
                    c1.addEventListener("mouseup",eventUp,false);
                    //移动端的处理
                    c1.addEventListener('touchstart', eventDown,false);
                    c1.addEventListener('touchend', eventUp,false);
                    c1.addEventListener('touchmove', eventMove,false);
                    //初始化
                    initCanvas();
                }
                add();
                function initCanvas(){//网上的做法是给canvas设置一张背景图片，我这里的做法是直接在canvas下面另外放了个div
                    //c1.style.backgroundImage="url(中奖图片.jpg)";
                    ctx.globalCompositeOperation = "source-over";
                    ctx.fillStyle = '#dddddd';
                    ctx.fillRect(0,0,width,height);
                    ctx.fill();
                    ctx.font = "Bold 30px Arial";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#999999";
                    ctx.fillText(self.canvasText,width/2,150/2);//把这个属性设为这个就可以做出圆形橡皮擦的效果
                    //有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
                    ctx.globalCompositeOperation = 'destination-out';
                }
                function eventDown(e){
                    if(!self.isCheck) return;
                    e.preventDefault();
                    ismousedown=true;
                }
                function eventUp(e){
                    e.preventDefault();
                    //得到canvas的全部数据
                    let a = ctx.getImageData(0,0,width,height);
                    let j=0;
                    for(let i=3; i<a.data.length; i+=4){
                        if(a.data[i]==0)j++;
                    }
                    //当被刮开的区域等于一半时，则可以开始处理结果
                    if(j>=a.data.length/8){
                        isOk = 1;
                    }
                    ismousedown=false;
                }

                //鼠标移动 和 触摸移动
                function eventMove(e){
                    e.preventDefault();
                    if(ismousedown) {
                        if(e.changedTouches){
                            e=e.changedTouches[e.changedTouches.length-1];
                        }
                        let ele = document.getElementById("top");
                        let topY = ele.offsetTop-document.querySelector(".article").scrollTop;
                        let oX = c1.offsetLeft+50,
                            oY = topY;
                        //console.log(document.querySelector(".article").scrollTop)
                        let x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
                            y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;
                        //画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
                        //画出来是透明的
                        ctx.beginPath();
                        ctx.arc(x, y, fontem*1.2, 0, Math.PI * 2,true);

                        //下面3行代码是为了修复部分手机浏览器不支持destination-out
                        //我也不是很清楚这样做的原理是什么
                        c1.style.display = 'none';
                        //c1.offsetHeight;
                        c1.style.display = 'inherit';
                        ctx.fill();
                    }
                    if(isOk){
                        console.log(1)
                    }
                }
            }
        }
    }
</script>
