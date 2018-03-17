/*
 * @Author: alex (chenzeyongjsj@163.com) 
 * @Date: 2018-03-17 17:39:42 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-17 18:06:40
 */


<template>
  <div class="andClass">
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
  name: "andClass",
  data() {
    return {
      linkActive: 5, //菜单定位
      switchList: [
        {
          title: "并课申请",
          url: "/pages/andClass/andClass/andClassApply",
          show: false
        },
        {
          title: "并课记录",
          url: "/pages/andClass/andClass/reservationRecord",
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
    document.title = "并课申请";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.andClass {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  background: #f2f2f2;
}
</style>
