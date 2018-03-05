/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-05 16:43:42 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-05 17:34:08
 */

<template>
  <div class="home" :class='bg_choose ? "home-good": "home-bad"'></div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      user_info: Object,
      attendance: 100,
      bg_choose: true //根据出勤率更换风格
    };
  },
  mounted: function() {
    this.$http
      .get("./static/mock/home.json")
      .then(response => {
        this.user_info = response.data;
        //出勤率
        this.attendance = Math.round(
          (1 -
            (response.data.leave + response.data.absenteeism) /
              response.data.all_class) *
            100
        );
        if (this.attendance < 80) {
          this.bg_choose = false;
        } else {
          this.bg_choose = true;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home {
  width: 100%;
  height: 100vh;
  background: #f6f6f6;
  overflow: hidden;
}
.home-good {
  background: url("../../static/img/bg2.jpg") no-repeat;
  background-size: 100% 100%;
}
.home-bad {
  background: url("../../static/img/bg3.jpg") no-repeat;
  background-size: 100% 100%;
}
</style>
