/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-02-28 16:43:09 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-05 16:22:01
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login' //登录页
import Home from '@/pages/Home' //首页

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: Login
        },
        {
            path: '/pages/Home',
            component: Home
        }
    ]
})
