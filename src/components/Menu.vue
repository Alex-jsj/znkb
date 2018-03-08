/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-05 16:43:42 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-08 13:51:58
 */

<template>
  <div class="menu">
    <ul>
      <li class="float-left" v-for="item in menu" :key="item.id">
        <router-link :to="item.link">
          <i class="iconfont" :class="item.icon"></i>
          <p>{{item.title}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      menu: [
        {
          title: "主页",
          icon: "icon-zhuye",
          link: "../pages/Home"
        },
        {
          title: "课表",
          icon: "icon-kebiao",
          link: "../pages/myTimetable"
        },
        {
          title: "考勤",
          icon: "icon-kaoqin",
          link: "../pages/kaoqin"
        },
        {
          title: "请假",
          icon: "icon-qingjia",
          link: "../pages/qingjia"
        },
        {
          title: "通知",
          icon: "icon-tongzhi",
          link: "../pages/messageNotification"
        },
        {
          title: "更多",
          icon: "icon-gengduo",
          link: "../pages/gengduo"
        }
      ]
    };
  },
  mounted: function() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.menu {
  width: 100%;
  height: 2rem;
  background: #ededed;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0 1rem;
  > ul {
    width: 100%;
    height: 100%;
    &::after {
      display: block;
      content: "";
      visibility: hidden;
      clear: both;
    }
    > li {
      width: 1.1rem;
      margin-top: 0.37rem;
      height: 1.4rem;
      margin-right: 1.48rem;
      text-align: center;
      position: relative;
      &:last-of-type {
        margin-right: 0;
      }
      > a {
        width: 100%;
        height: 100%;
        display: block;
      }
      .router-link-exact-active.router-link-active {
        .iconfont,
        p {
          color: #cb121b;
        }
      }
      .iconfont {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        color: #a0a0a0;
        font-size: 0.7rem;
      }
      .icon-kaoqin {
        font-size: 0.74rem;
        top: -0.06rem;
      }
      .icon-qingjia {
        font-size: 0.8rem;
        top: -0.07rem;
      }
      .icon-gengduo {
        font-size: 0.9rem;
        top: -0.1rem;
      }
      p {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.45rem;
        white-space: nowrap;
        color: #a0a0a0;
      }
    }
  }
}
</style>
