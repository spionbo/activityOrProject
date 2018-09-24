// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './style/main.css';
import Zepto from 'zepto';
import T from "./common/global";
import Pop from './common/pop/Pop';
import './common/VuePlugin';
import './middle/components';
import "./mixin/global";
/*import "./mock";*/
if (!Object.assign) {
    Object.assign = $.extend;
}
Object.assign(window,{
    $ : Zepto,
    T : T,
    Vue : Vue,
    version : "1.0",
});
Vue.use(Pop);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
