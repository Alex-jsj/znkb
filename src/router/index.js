/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-02-28 16:43:09 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-22 10:19:01
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login' //登录页
import Home from '@/pages/Home' //首页
import More from '@/pages/More' //首页
import myTimetable from '@/pages/myTimetable' //我的课表
import messageNotification from '@/pages/message/messageNotification' //消息通知
import messageInfo from '@/pages/message/messageInfo' //消息通知
import classroom from '@/pages/classroom/classroom' //教室预约
import classroomReservation from '@/pages/classroom/classroomReservation' //教室预约
import reservationInfo from '@/pages/classroom/reservationInfo' //预约记录
import reservationRecord from '@/pages/classroom/reservationRecord' //预约记录
import reservationDetails from '@/pages/classroom/reservationDetails' //预约详情页
import studentsLeave from '@/pages/studentsLeave/studentsLeave' //学生请假
import leaveInfo from '@/pages/studentsLeave/leaveInfo' //学生请假详情页
import andClass from '@/pages/andClass/andClass' //并课申请
import andClassApply from '@/pages/andClass/andClassApply' //并课申请
import andClassRecord from '@/pages/andClass/andClassRecord' //并课申请记录
import andClassInfo from '@/pages/andClass/andClassInfo' //并课申请详情页
import adjustmentClass from '@/pages/adjustmentClass/adjustmentClass' //并课申请
import adjustmentClassApply from '@/pages/adjustmentClass/adjustmentClassApply' //并课申请
import adjustmentClassRecord from '@/pages/adjustmentClass/adjustmentClassRecord' //并课申请记录
import adjustmentClassInfo from '@/pages/adjustmentClass/adjustmentClassInfo' //并课申请详情页
import keepTime from '@/pages/keepTime/keepTime' //学生考勤
import keepInfo from '@/pages/keepTime/keepInfo' //学生考勤详情页

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
            path: '/pages/More',
            component: More
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
            path: '/pages/keepTime/keepTime',
            component: keepTime
        },
        {
            path: '/pages/keepTime/keepInfo',
            component: keepInfo
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
            path: '/pages/studentsLeave/studentsLeave',
            component: studentsLeave,
        },
        {
            path: '/pages/studentsLeave/leaveInfo',
            component: leaveInfo,
        },
        {
            path: '/pages/andClass/andClass',
            component: andClass,
            children: [{
                    path: '/',
                    redirect: 'andClassApply',
                    component: andClassApply
                },
                {
                    path: 'andClassApply',
                    component: andClassApply
                },
                {
                    path: 'andClassRecord',
                    component: andClassRecord
                }
            ]
        },
        {
            path: '/pages/andClass/andClassInfo',
            component: andClassInfo,
        },
        {
            path: '/pages/adjustmentClass/adjustmentClass',
            component: adjustmentClass,
            children: [{
                    path: '/',
                    redirect: 'adjustmentClassApply',
                    component: adjustmentClassApply
                },
                {
                    path: 'adjustmentClassApply',
                    component: adjustmentClassApply
                },
                {
                    path: 'adjustmentClassRecord',
                    component: adjustmentClassRecord
                }
            ]
        },
        {
            path: '/pages/adjustmentClass/adjustmentClassInfo',
            component: adjustmentClassInfo,
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
            path: '/pages/classroom/reservationDetails',
            component: reservationDetails,
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
