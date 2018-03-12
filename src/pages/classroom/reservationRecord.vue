/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-12 10:40:08
 */

<template>
  <div class="reservationRecord">
  </div>
</template>
<script>
export default {
  name: "reservationRecord",
  data() {
    return {
      reservation_record: [],
      loading: false
    };
  },
  components: {},
  mounted: function() {
    //修改页面title
    document.title = "预约记录";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      this.$http
        .get("./static/mock/classroomList.json")
        .then(response => {
          this.reservation_record = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.reservationRecord {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
}
</style>
