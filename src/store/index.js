/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-02-28 16:43:12 
 * @Last Modified by:   Alex chenzeyongjsj@163.com 
 * @Last Modified time: 2018-02-28 16:43:12 
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        class_id: '', //教师预约页面教室id
        class_list: [] //教师预约课时列表
    },
    mutations: {
        change_class_id(state, uid) {
            state.class_id = uid;
        },
        change_class_list(state, list) {
            state.class_list = list;
        }
    }
})
