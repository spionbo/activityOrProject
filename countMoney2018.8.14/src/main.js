//import './css/main.css';
import Vue from "vue";
import VueRouter from 'vue-router';
import info from './common/info';
Vue.use(VueRouter);
/*import info from './common/info'; //获取项目信息
import {participate} from './common/URL';
import requirePop from './pop/requirePop.js';
import directive from './common/directive.js'; // v-touch
directive(Vue);
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/main',
        name: 'main',
        component : function(resolve){
            require(['./module/main/index'],resolve)
        }
    }
    ,
    {
        path: '/game',
        name: 'game',
        component : function(resolve){
            require(['./module/game/index'],resolve)
        }
    }
    ]
});

info.init();
window.router = router;
window.info = info;
window.bus = new Vue();*/
//new Vue({
    //router,
    /*data () {
        return {
            transitionName: 'slide-left' ,
            home : false
        }
    },
    watch: {
        '$route' (to, from) {
            this.home = to.path!='/';
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    },
    mounted(){
        T.init({
            loadding : {
                imgs : [

                ],
                callback : function(){
                    info.click(()=>{
                        if( !T.uid ){
                            router.replace({ path: '/', query: {
                                wap:T.wap,uid:T.uid
                            }});
                            return;
                        };
                        T.ajax({
                            url : participate ,
                            data : { uid : T.uid },
                            callback : true,
                            success : function( _data ){
                                if(!_data.flag){
                                    requirePop('publicTips');
                                }else{
                                    var hash = window.location.hash;
                                    if(hash.search(/#\/\module\d/)>=0){
                                        info.onmap(function(){
                                            info.getDice(function(){
                                                bus.$emit('pointOnMap', info.map.pointOnMap);
                                            })
                                        })
                                    }else{
                                        console.log('多融欢迎您！')
                                    }
                                }
                            }
                        });
                    })
                }
            }
        })
    },*/
/*    template: `
        <div id="app">
            <transition name="left">
                <router-view class="child-view"></router-view>
            </transition>
            <div id='pop'><div class='child'></div></div>
        </div>
    `
}).$mount('#app')*/
const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/main',
            name: 'main',
            component : function(resolve){
                require(['./module/main/index'],resolve)
            }
        },
        {
            path: '/game',
            name: 'game',
            component : function(resolve){
                require(['./module/game/index'],resolve)
            }
        }
    ]
});
info.init();
window.router = router;
window.Main = new Vue({
    template: `
        <div id="app">
            <transition name="left">
                <router-view class="child-view"></router-view>
            </transition>
            <div id='pop'><div class='child'></div></div>
        </div>
    `
}).$mount('#app');
