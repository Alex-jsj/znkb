/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-14 17:04:16
 */

<template>
  <div class="classroom">
    <!-- title switch -->
    <SwitchBar :switchList="switchList"></SwitchBar>
    <!-- view -->
    <router-view></router-view>
    <!-- 底部菜单 -->
    <Menu :linkActive="linkActive"></Menu>
  </div>
</template>
<script>
/* 引入组件 */
import Menu from "@/components/Menu";
import SwitchBar from "@/components/SwitchBar";
export default {
  name: "classroom",
  data() {
    return {
      linkActive: 3, //菜单定位
      switchList: [
        {
          title: "教室预约",
          url: "/pages/classroom/classroom/classroomReservation",
          show: false
        },
        {
          title: "预约记录",
          url: "/pages/classroom/classroom/reservationRecord",
          show: false
        }
      ]
    };
  },
  components: {
    Menu,
    SwitchBar
  },
  mounted: function() {
    //修改页面title
    document.title = "教室预约";
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.classroom {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  background: #f2f2f2;
}
</style>
