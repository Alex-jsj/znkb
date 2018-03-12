/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-12 12:37:41
 */

<template>
  <div class="classroomReservation">
    <!-- 教室列表 -->
    <ul class="classroom-list">
      <li v-for="(item,index) in classroom_list" :key="item.id" class="float-left" @click="clooseF(index)" :class="{'cloose-item':item.cloose}">
        <span class="list-item">{{item.classroom_title}}</span>
      </li>
    </ul>
    <!-- 提交按钮 -->
    <div class="submit">
      <router-link to="/pages/classroom/classroom/reservationInfo">
        <p class="submit-btn">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</p>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "classroomReservation",
  data() {
    return {
      classroom_list: [],
      this_cloose: 0 //当前选中教室
    };
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
      this.$http
        .get("./static/mock/classroomList.json")
        .then(response => {
          this.classroom_list = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    clooseF: function(idx) {
      for (let i = 0; i < this.classroom_list.length; i++) {
        this.classroom_list[i].cloose = false;
      }
      this.classroom_list[idx].cloose = true;
      this.this_cloose = this.classroom_list[idx].classroom_id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.classroomReservation {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  .classroom-list {
    width: 100%;
    margin-top: 1.75rem;
    padding: 0 1.25rem;
    margin-bottom: 2rem;
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    > li {
      width: 4.13rem;
      height: 1.25rem;
      overflow: hidden;
      border: 1px solid #9b9b9b;
      border-radius: 0.15rem;
      margin-bottom: 0.55rem;
      margin-right: 0.55rem;
      background: #fff;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .list-item {
        color: #808080;
        display: block;
        line-height: 1.25rem;
        text-align: center;
        font-size: 0.6rem;
      }
    }
    .cloose-item {
      background: #cb121b;
      border-color: #cb121b;
      .list-item {
        color: #fff;
      }
    }
  }
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
