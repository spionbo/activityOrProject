<style>
    .article{}
</style>
<template>
    <article class="article">
        <div class="top">

        </div>
    </article>
</template>

<script>
    export default {
        computed:{
        },
        data(){
            return{
            }
        },
        mounted(){
            this.setImgSize();
            this.init();
        },
        methods:{
            init() {
                let self = this;
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
