/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-02-28 16:43:16 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-13 15:12:04
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//引入axios
import axios from 'axios'
Vue.prototype.$http = axios // 通过修改原型链，来更方便的使用
//引入外部资源
import public_css from './assets/css/public.css'
import icon_css from './assets/iconfont/iconfont.css' //阿里巴巴图标库
//按需引入mint-ui
import {
    InfiniteScroll,
    DatetimePicker,
    Spinner,
    Radio
} from "mint-ui";
Vue.use(InfiniteScroll);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Spinner.name, Spinner);
Vue.component(Radio.name, Radio);
import 'mint-ui/lib/style.css'


Vue.config.productionTip = false
//Vue.config.process.env.NODE_ENV === 'development' ? '/api' : ''

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
