/*
 * @Author: alex (chenzeyongjsj@163.com) 
 * @Date: 2018-03-17 17:39:42 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-19 08:30:47
 */


<template>
  <div class="adjustmentClass">
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
  name: "adjustmentClass",
  data() {
    return {
      linkActive: 5, //菜单定位
      switchList: [
        {
          title: "调课申请",
          url: "/pages/adjustmentClass/adjustmentClass/adjustmentClassApply",
          show: false
        },
        {
          title: "调课记录",
          url: "/pages/adjustmentClass/adjustmentClass/adjustmentClassRecord",
          show: false
        }
      ]
    };
  },
  components: {
    Menu,
    SwitchBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.adjustmentClass {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  background: #f2f2f2;
}
</style>
