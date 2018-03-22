/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-08 13:51:13 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-22 10:52:56
 */


<template>
  <div class="keepInfo">
    <!-- 消息列表 -->
    <div class="container">
      <!-- date -->
      <p class="date">
        <span class="float-left">{{keepInfo.date}}</span>
        <span class="float-left">{{keepInfo.week}}</span>
      </p>
      <!-- title -->
      <div class="title-box">
        <span class="title">{{keepInfo.class}}</span>
        <div class="info">
          <p class="float-left">应到
            <span>{{keepInfo.to_be}}</span>
            人</p>
          <p class="float-right">实到
            <span>{{keepInfo.to}}</span>
            人</p>
        </div>
      </div>
      <!-- 到课 -->
      <div class="container">
        <div class="title">到课</div>
        <ul class="list">
          <li class="float-left" v-for="item in keepInfo.students" :key="item.id">{{item}}</li>
        </ul>
      </div>
      <!-- 请假 -->
      <div class="container">
        <div class="title">请假</div>
        <ul class="list">
          <li class="float-left" v-for="item in keepInfo.leave_person" :key="item.id">{{item}}</li>
        </ul>
      </div>
      <!-- 旷课 -->
      <div class="container">
        <div class="title">旷课</div>
        <ul class="list">
          <li class="float-left" v-for="item in keepInfo.absenteeism" :key="item.id">{{item}}</li>
        </ul>
      </div>
    </div>
    <!-- 底部菜单 -->
    <Menu :linkActive="linkActive"></Menu>
  </div>
</template>
<script>
/* 引入组件 */
import Menu from "@/components/Menu";
export default {
  name: "keepInfo",
  data() {
    return {
      linkActive: 2, //菜单定位
      keepInfo: {}
    };
  },
  components: {
    Menu
  },
  mounted: function() {
    //修改页面title
    document.title = "学生考勤";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      this.$http
        .get("./static/mock/keepInfo.json")
        .then(response => {
          this.keepInfo = response.data;
          //换算星期
          this.keepInfo.week = new Date(this.keepInfo.date).getDay();
          if (this.keepInfo.week == 0) {
            this.keepInfo.week = "周日";
          } else if (this.keepInfo.week == 1) {
            this.keepInfo.week = "周一";
          } else if (this.keepInfo.week == 2) {
            this.keepInfo.week = "周二";
          } else if (this.keepInfo.week == 3) {
            this.keepInfo.week = "周三";
          } else if (this.keepInfo.week == 4) {
            this.keepInfo.week = "周四";
          } else if (this.keepInfo.week == 5) {
            this.keepInfo.week = "周五";
          } else if (this.keepInfo.week == 6) {
            this.keepInfo.week = "周六";
          }
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
.keepInfo {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .date {
      width: 13.5rem;
      margin: 0 auto;
      height: 3.05rem;
      padding-top: 1.5rem;
      > span {
        display: block;
        font-size: 0.7rem;
        color: #999;
        margin-right: 0.3rem;
      }
    }
    .title-box {
      width: 13.5rem;
      margin: 0 auto;
      height: 4.5rem;
      font-size: 0.65rem;
      color: #666;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
      margin-bottom: 1.25rem;
      .title {
        display: block;
        width: 100%;
        height: 1.5rem;
        padding: 0.35rem 0.5rem 0 0.5rem;
        border-bottom: 1px solid #e5e5e5;
      }
      .info {
        width: 100%;
        height: 3rem;
        padding: 0 1.7rem;
        p {
          line-height: 3rem;
          span {
            font-size: 1rem;
            color: #cb121b;
          }
        }
      }
    }
    .container {
      width: 13.5rem;
      margin: 0 auto;
      margin-bottom: 1rem;
      .title {
        font-size: 0.6rem;
        color: #666;
        padding-bottom: 0.5rem;
        border-bottom: 1px dashed #e6e6e6;
        margin-bottom: 0.5rem;
      }
      .list {
        width: 14.5rem;
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          clear: both;
        }
        > li {
          font-size: 0.6rem;
          color: #808080;
          margin-right: 1rem;
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}
</style>
