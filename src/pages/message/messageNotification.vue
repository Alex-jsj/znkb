/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-08 13:51:13 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-09 15:38:58
 */


<template>
  <div class="messageNotification">
    <mt-spinner type="triple-bounce" class="loading" :class="{'loading-show':!page_loading}"></mt-spinner>
    <!-- 消息列表 -->
    <div class="message">
      <div class="title">
        <span class="float-left width-1">时间</span>
        <span class="float-left width-2">通知概览</span>
        <span class="float-left width-3">操作</span>
      </div>
      <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
        <li v-for="(item,index) in message_list" :key="index" :class="item.status?'read':'unread'">
          <div class="width-1 float-left list-item item-1">{{item.time}}</div>
          <div class="width-2 float-left list-item item-2">
            <!-- <p class="status" :class="item.statusClass">{{item.status}}</p> -->
            <p class="list-title">{{item.title}}</p>
          </div>
          <div class="width-3 float-left list-item">
            <span class="info" @click="lookInfo(item.id,item.status)">查看</span>
          </div>
        </li>
      </ul>
      <p class="to-bottom" :class="{'bottom-show':bottom}">已经到底啦</p>
    </div>
    <!-- 底部菜单 -->
    <Menu :linkActive="linkActive"></Menu>
  </div>
</template>
<script>
//引入loading组件
import { Indicator, Toast } from "mint-ui";
import qs from "qs"; //序列化
/* 引入组件 */
import Menu from "@/components/Menu";
export default {
  name: "messageNotification",
  data() {
    return {
      linkActive: 4,
      message_list: [],
      loading: false,
      page_loading: true,
      bottom: false, //已加载所有数据
      currentPage: 1 //分页页码
    };
  },
  components: {
    Menu
  },
  mounted: function() {
    let that = this;
    //修改页面title
    document.title = "消息通知";
    //默认关闭下拉加载 覆盖Indicator插件bug
    that.loading = true;
    //修改页面title
    document.title = "消息通知";
    //判断登录状态
    that
      .$http({
        method: "get",
        url: "/Home/Verify/index?token=" + localStorage.getItem("token")
      })
      .then(response => {
        //登录成功之后获取用户数据
        if (response.data.verify) {
          that
            .$http({
              method: "post",
              url: "/Home/Index/message",
              data: {
                job_num: localStorage.getItem("job_num"),
                currentPage: this.currentPage,
                pageSize: 10
              },
            })
            .then(response => {
              if (response.data) {
                this.page_loading = false;
                //打开下拉加载
                that.loading = false;
                this.message_list = response.data;
              } else {
                let instance = Toast("暂无数据");
                this.page_loading = false;
              }
            })
            .catch(error => {
              alert("网络错误");
            });
        } else {
          //登录过期 => 清除前台存储的登录信息并返回登录页
          let instance = Toast("登录已失效，请重新登录！");
          setTimeout(() => {
            instance.close();
            localStorage.removeItem("userToken");
            localStorage.removeItem("student_num");
            this.$router.push({ path: "/pages/Login" });
          }, 1000);
        }
      })
      .catch(error => {
        alert("网络错误！");
      });
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
        color: #808080;
        &:nth-child(2n) {
          background: #fff;
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
            color: #808080;
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
            color: #808080;
            padding-right: 1rem;
          }
        }
        .item-1 {
          color: #808080;
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
      /* 已读 */
      .read {
        .list-item {
          .list-title {
            color: #c5c4c4;
          }
          .info {
            color: #c5c4c4;
          }
        }
        .item-1 {
          color: #c5c4c4;
        }
      }
      /* 未读 */
      .unread {
        .list-item {
          .list-title {
            color: #696969;
          }
          .info {
            color: #696969;
          }
        }
        .item-1 {
          color: #696969;
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
