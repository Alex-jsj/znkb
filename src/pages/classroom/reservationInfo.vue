/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-13 11:58:56
 */

<template>
  <div class="reservationInfo">
    <!-- 提交按钮 -->
    <div class="submit">
      <router-link to="/">
        <p class="submit-btn">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "reservationInfo",
  data() {
    return {};
  },
  components: {},
  mounted: function() {
    //修改页面title
    document.title = "教室预约";
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
.reservationInfo {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;

  .submit {
    width: 11.25rem;
    height: 1.5rem;
    margin: 0 auto;
    .submit-btn {
      width: 11.25rem;
      height: 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      background: #808080;
      color: #fff;
      font-size: 0.65rem;
      border-radius: 0.2rem;
    }
  }
}
</style>
