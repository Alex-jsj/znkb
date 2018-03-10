/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-08 13:51:13 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-09 17:21:25
 */


<template>
  <div class="messageInfo">
    <!-- 消息列表 -->
    <div class="container">
      <!-- date -->
      <p class="date">
        <span class="float-left">{{messageInfo.date}}</span>
        <span class="float-left">{{messageInfo.week}}</span>
      </p>
      <!-- title -->
      <div class="title">
        <i class="iconfont icon-message float-left" :class="messageInfo.statusClass"></i>
        <span class="float-left">{{messageInfo.title}}</span>
      </div>
      <!-- content -->
      <div class="content">
        <div v-html="messageInfo.content"></div>
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
  name: "messageInfo",
  data() {
    return {
      linkActive: 4, //菜单定位
      messageInfo: {}
    };
  },
  components: {
    Menu
  },
  mounted: function() {
    //修改页面title
    document.title = "消息通知";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      this.$http
        .get("./static/mock/messageInfo.json")
        .then(response => {
          this.messageInfo = response.data;
          //换算星期
          this.messageInfo.week = new Date(this.messageInfo.date).getDay();
          if (this.messageInfo.week == 0) {
            this.messageInfo.week = "周日";
          } else if (this.messageInfo.week == 1) {
            this.messageInfo.week = "周一";
          } else if (this.messageInfo.week == 2) {
            this.messageInfo.week = "周二";
          } else if (this.messageInfo.week == 3) {
            this.messageInfo.week = "周三";
          } else if (this.messageInfo.week == 4) {
            this.messageInfo.week = "周四";
          } else if (this.messageInfo.week == 5) {
            this.messageInfo.week = "周五";
          } else if (this.messageInfo.week == 6) {
            this.messageInfo.week = "周六";
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
.messageInfo {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .date {
      width: 100%;
      height: 3.05rem;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 1rem;
      padding-top: 1.5rem;
      > span {
        display: block;
        font-size: 0.7rem;
        color: #999;
        margin-right: 0.3rem;
      }
    }
    .title {
      width: 100%;
      height: 1.75rem;
      padding: 0 1rem;
      border-bottom: 1px solid #e5e5e5;
      .icon-message {
        font-size: 1rem;
        line-height: 1.75rem;
        color: #666;
        margin-right: 0.45rem;
      }
      .tongzhi {
        color: #86c03f;
      }
      .qingjia {
        color: #f18d1d;
      }
      .shenshu {
        color: #cb121b;
      }
      > span {
        display: block;
        font-size: 0.7rem;
        line-height: 1.75rem;
        color: #666;
      }
    }
    .content {
      width: 100%;
      padding: 0 1rem;
      font-size: 0.65rem;
      color: #999;
      padding-top: 1.1rem;
      line-height: 1.1rem;
      margin-bottom: 3.1rem;
    }
  }
}
</style>
