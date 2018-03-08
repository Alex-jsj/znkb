/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-05 16:43:42 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-08 15:31:40
 */

<template>
  <div class="myTimetable">
    <!-- 课表 -->
    <!-- 底部菜单 -->
    <Menu></Menu>
  </div>
</template>
<script>
/* 引入组件 */
import Menu from "@/components/Menu";
export default {
  name: "myTimetable",
  data() {
    return {};
  },
  components: {
    Menu
  },
  mounted: function() {
    //修改页面title
    document.title = "我的课表";
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
.myTimetable {
  width: 100%;
  min-height: 100vh;
  padding: 0 1rem;
}
</style>
