/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-05 16:43:42 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-07 22:52:00
 */

<template>
  <div class="myTimetable">
    <div class="info">
      <div class="top-box">
        <router-link to="./Login" class="float-right" @click="outLogin()">
          <span class="outlogin" @click="outLogin()">退出登录</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "myTimetable",
  data() {
    return {};
  },
  mounted: function() {
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
    }
  },
  methods: {
    //退出登录
    outLogin: function() {
      localStorage.removeItem("userToken");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
