/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-02-28 16:43:09 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-13 18:04:28
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login' //登录页
import Home from '@/pages/Home' //首页
import myTimetable from '@/pages/myTimetable' //我的课表
import messageNotification from '@/pages/message/messageNotification' //消息通知
import messageInfo from '@/pages/message/messageInfo' //消息通知
import classroom from '@/pages/classroom/classroom' //教室预约
import classroomReservation from '@/pages/classroom/classroomReservation' //教室预约
import reservationInfo from '@/pages/classroom/reservationInfo' //预约记录
import reservationRecord from '@/pages/classroom/reservationRecord' //预约记录

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
        {
            path: '/pages/message/messageNotification',
            component: messageNotification,
        },
        {
            path: '/pages/message/messageInfo',
            component: messageInfo,
        },
        {
            path: '/pages/classroom/classroom',
            component: classroom,
            children: [{
                    path: '/',
                    redirect: 'classroomReservation',
                    component: classroomReservation
                },
                {
                    path: 'classroomReservation',
                    component: classroomReservation
                },
                {
                    path: 'reservationInfo',
                    component: reservationInfo
                },
                {
                    path: 'reservationRecord',
                    component: reservationRecord
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
