/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-02-28 16:43:09 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-07 22:38:08
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login' //登录页
import Home from '@/pages/Home' //首页
import myTimetable from '@/pages/myTimetable' //我的课表

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/pages/Home',
            component: Home
        },
        {
            path: '/pages/Login',
            component: Login
        },
        {
            path: '/pages/myTimetable',
            component: myTimetable
        },
    ]
})
