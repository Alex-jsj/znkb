/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-08 13:51:13 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-08 17:39:17
 */


<template>
  <div class="messageNotification">
    <!-- 消息列表 -->
    <div class="message">
      <div class="title">
        <span class="float-left width-1">时间</span>
        <span class="float-left width-2">通知概览</span>
        <span class="float-left width-3">操作</span>
      </div>
      <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
        <li v-for="(item,index) in message_list" :key="index">
          <!-- 未读提示 -->
          <i class="notRead" v-if="!item.read"></i>
          <div class="width-1 float-left list-item item-1">{{item.date}}</div>
          <div class="width-2 float-left list-item item-2">
            <p class="status" :class="item.statusClass">{{item.status}}</p>
            <p class="list-title">{{item.title}}</p>
          </div>
          <div class="width-3 float-left list-item">
            <router-link to="/" class="info">查看</router-link>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部菜单 -->
    <Menu></Menu>
  </div>
</template>
<script>
//引入loading组件
import { Indicator } from "mint-ui";
/* 引入组件 */
import Menu from "@/components/Menu";
export default {
  name: "messageNotification",
  data() {
    return {
      message_list: [],
      loading: false
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
        .get("./static/mock/messageNotification.json")
        .then(response => {
          this.message_list = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    loadMore() {
      // 防止多次加载
      if (this.loading) {
        return false;
      }
      this.loading = true;
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$http
        .get("./static/mock/messageNotification.json")
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            this.message_list.push(response.data[i]);
          }
          this.loading = false;
          Indicator.close();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.messageNotification {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  .message {
    width: 100%;
    .title {
      width: 100%;
      height: 1.75rem;
      background: #808080;
      > span {
        text-align: center;
        line-height: 1.75rem;
        font-size: 0.6rem;
        color: #fff;
        letter-spacing: 0.1rem;
        border-right: 1px solid rgb(180, 180, 180);
        &:last-of-type {
          border: none;
        }
      }
    }
    .list {
      border-bottom: 1px solid rgb(180, 180, 180);
      > li {
        height: 3.5rem;
        background: rgb(242, 242, 242);
        position: relative;
        &:nth-child(2n) {
          background: #fff;
        }
        .notRead {
          position: absolute;
          width: 0.3rem;
          height: 0.3rem;
          background: #cb121b;
          border-radius: 50%;
          top: 0.1rem;
          left: 0.1rem;
        }
        .list-item {
          height: 100%;
          border-right: 1px solid rgb(180, 180, 180);
          &:last-of-type {
            border: none;
          }
          .status {
            display: inline-block;
            border-radius: 0.15rem;
            color: #fff;
            font-size: 0.45rem;
            padding: 0.06rem 0.25rem;
            background: #86c03f;
            letter-spacing: 0.05rem;
            position: absolute;
            top: 0.8rem;
          }
          .tongzhi {
            background: #86c03f;
          }
          .qingjia {
            background: #f18d1d;
          }
          .shenshu {
            background: #cb121b;
          }
          .list-title {
            white-space: nowrap;
            width: 6.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.6rem;
            color: rgb(128, 128, 128);
            position: absolute;
            top: 2rem;
          }
          .info {
            display: block;
            width: 100%;
            height: 100%;
            font-size: 0.6rem;
            text-align: right;
            line-height: 3.5rem;
            color: rgb(128, 128, 128);
            padding-right: 1rem;
          }
        }
        .item-1 {
          color: rgb(128, 128, 128);
          text-align: left;
          font-size: 0.6rem;
          line-height: 3.5rem;
          padding-left: 1rem;
        }
        .item-2 {
          padding-left: 0.75rem;
          position: relative;
        }
      }
    }
    .width-1 {
      width: 5rem;
    }
    .width-2 {
      width: 7.88rem;
    }
    .width-3 {
      width: 3.12rem;
    }
  }
}
</style>
