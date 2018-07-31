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
        <div class="tit1 img1 img-size" data-height="39"></div>
        <article class="date">
            <div class="tit">
                <div class="tab current">08月<br/>6日</div>
                <div class="tab">08月<br/>6日</div>
                <div class="tab">08月<br/>6日</div>
                <div class="tab">08月<br/>6日</div>
                <div class="tab">08月<br/>6日</div>
                <div class="tab">08月<br/>6日</div>
                <div class="tab">08月<br/>6日</div>
            </div>
            <div class="cnt">
                <ul>
                    <li>
                        <h2>建仓满<em>8</em>元</h2>
                        <div class="img img8 img-size" data-width="152" data-height="157"></div>
                        <div class="btn">去建仓解锁</div>
                    </li>
                </ul>
            </div>
        </article>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {
        },
        mounted(){
            this.setImgSize();
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
    .img1{
        background:url("./assets/images/tit.png") center 0 no-repeat;
        background-size:contain;
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
            .img8{
                background:url("./assets/images/product/8.png");
                background-size:contain;
            }
            .btn{
                font-size:20px;
                padding:5px 0;
                border-radius:100px;
                color: #ce5d17;
                background-image: -webkit-linear-gradient(top, #fced63, #fec429);
                box-shadow:0 1px 5px rgba(0,0,0,.3);
            }
        }
    }

</style>
