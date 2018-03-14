/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-14 11:10:34 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-14 16:44:21
 */



<template>
  <div class="leaveInfo">
    <!-- 消息列表 -->
    <div class="container">
      <!-- date -->
      <div class="date">
        <span class="float-left">{{leaveInfo.date}}</span>
        <span class="float-left week">{{leaveInfo.week}}</span>
      </div>
      <!-- list -->
      <div class="list">
        <div class="list-item">
          <span class="float-left">请假人员：</span>
          <span class="float-left">{{leaveInfo.leave_person}}</span>
        </div>
        <div class="list-item">
          <span class="float-left">班级：</span>
          <span class="float-left">{{leaveInfo.class}}</span>
        </div>
        <div class="list-item">
          <span class="float-left">请假类型：</span>
          <span class="float-left">{{leaveInfo.leave_type}}</span>
        </div>
        <div class="list-item">
          <span class="float-left">请假时间：</span>
          <span class="float-left">{{leaveInfo.leave_date}}</span>
        </div>
        <div class="list-item">
          <span class="float-left">请假课程：</span>
          <span class="float-left">{{leaveInfo.classname}}</span>
        </div>
        <div class="list-item item-excuse">
          <span class="float-left">请假事由：</span>
          <div v-html="leaveInfo.excuse_for_leave"></div>
        </div>
      </div>
      <!-- type -->
      <i class="iconfont type" :class="leaveInfo.statusClass"></i>
    </div>
    <!-- 底部菜单 -->
    <Menu :linkActive="linkActive"></Menu>
  </div>
</template>
<script>
/* 引入组件 */
import Menu from "@/components/Menu";
export default {
  name: "leaveInfo",
  data() {
    return {
      linkActive: 3, //菜单定位
      leaveInfo: {}
    };
  },
  components: {
    Menu
  },
  mounted: function() {
    //修改页面title
    document.title = "学生请假";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      this.$http
        .get("./static/mock/leaveInfo.json")
        .then(response => {
          this.leaveInfo = response.data;
          //换算星期
          this.leaveInfo.week = new Date(this.leaveInfo.date).getDay();
          if (this.leaveInfo.week == 0) {
            this.leaveInfo.week = "周日";
          } else if (this.leaveInfo.week == 1) {
            this.leaveInfo.week = "周一";
          } else if (this.leaveInfo.week == 2) {
            this.leaveInfo.week = "周二";
          } else if (this.leaveInfo.week == 3) {
            this.leaveInfo.week = "周三";
          } else if (this.leaveInfo.week == 4) {
            this.leaveInfo.week = "周四";
          } else if (this.leaveInfo.week == 5) {
            this.leaveInfo.week = "周五";
          } else if (this.leaveInfo.week == 6) {
            this.leaveInfo.week = "周六";
          }
          if (this.leaveInfo.status == 0) {
            this.leaveInfo.statusClass = "icon-shenhezhong";
          } else if (this.leaveInfo.status == 1) {
            this.leaveInfo.statusClass = "icon-shenhetongguo";
          } else if (this.leaveInfo.status == 2) {
            this.leaveInfo.statusClass = "icon-yibohui";
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
.leaveInfo {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  .container {
    width: 100%;
    padding: 0 1.25rem;
    overflow: hidden;
    position: relative;
    .date {
      margin-top: 1.75rem;
      margin-bottom: 0.7rem;
      font-size: 0.7rem;
      color: #999;
      &::after {
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
      }
      .week {
        margin-left: 0.5rem;
      }
    }
    .list {
      width: 100%;
      padding: 0 0.55rem;
      margin-bottom: 1.25rem;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
      .list-item {
        width: 100%;
        height: 1.9rem;
        overflow: hidden;
        font-size: 0.6rem;
        color: #666;
        line-height: 1.9rem;
        border-bottom: 1px solid #e5e5e5;
        &:last-child {
          border-bottom: none;
        }
      }
      .item-excuse {
        height: auto;
      }
    }
    .type {
      position: absolute;
      top: 0.7rem;
      right: 0.5rem;
      font-size: 5rem;
      color: #808080;
    }
    .icon-shenhezhong {
      color: #808080;
    }
    .icon-shenhetongguo {
      color: #86c03f;
    }
    .icon-yibohui {
      color: #cb121b;
      right: -1.2rem;
    }
  }
}
</style>
