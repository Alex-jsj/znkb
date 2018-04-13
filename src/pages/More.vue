/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-05 16:43:42 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-22 09:46:51
 */

<template>
  <div class="more">
    <!-- 菜单 -->
    <div class="menu">
      <ul v-if="bg_choose">
        <li class="float-left" v-for="item in menu_good" :key="item.id">
          <router-link :to="item.menu_link">
            <img :src="item.img_src" :class="item.img_class">
            <p class="menu-title">{{item.menu_title}}</p>
            <p class="prompt" v-if="item.information">{{message}}</p>
          </router-link>
        </li>
      </ul>
      <ul v-else>
        <li class="float-left" v-for="item in menu_bad" :key="item.id">
          <router-link :to="item.menu_link">
            <img :src="item.img_src" :class="item.img_class">
            <p class="menu-title">{{item.menu_title}}</p>
            <p class="prompt" v-if="item.information">{{message}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import qs from "qs"; //序列化
export default {
  name: "Home",
  data() {
    return {
      user_info: Object,
      message: 0,
      attendance: 100,
      bg_choose: true, //根据出勤率更换风格
      menu_good: [
        {
          img_src: "./static/img/icon1.png",
          img_class: "menu-icon",
          menu_title: "我的课表",
          menu_link: "/pages/myTimetable",
          new_message: false
        },
        {
          img_src: "./static/img/icon2.png",
          img_class: "menu-icon icon2",
          menu_title: "学生考勤",
          menu_link: "/pages/keepTime/keepTime",
          new_message: false
        },
        {
          img_src: "./static/img/icon3.png",
          img_class: "menu-icon icon3",
          menu_title: "学生请假",
          menu_link: "/pages/studentsLeave/studentsLeave",
          new_message: false
        },
        {
          img_src: "./static/img/icon4.png",
          img_class: "menu-icon",
          menu_title: "教室预约",
          menu_link: "/pages/classroom/classroom",
          new_message: false
        },
        {
          img_src: "./static/img/icon5.png",
          img_class: "menu-icon",
          menu_title: "我要调课",
          menu_link: "/pages/adjustmentClass/adjustmentClass",
          new_message: false
        },
        {
          img_src: "./static/img/icon6.png",
          img_class: "menu-icon",
          menu_title: "我要并课",
          menu_link: "/pages/andClass/andClass",
          new_message: false
        },
        {
          img_src: "./static/img/icon7.png",
          img_class: "menu-icon",
          menu_title: "消息通知",
          menu_link: "/pages/message/messageNotification",
          new_message: true
        }
      ],
      menu_bad: [
        {
          img_src: "./static/img/icon1-1.png",
          img_class: "menu-icon",
          menu_title: "我的课表",
          menu_link: "/pages/myTimetable",
          new_message: false
        },
        {
          img_src: "./static/img/icon2-2.png",
          img_class: "menu-icon icon2",
          menu_title: "学生考勤",
          menu_link: "/pages/keepTime/keepTime",
          new_message: false
        },
        {
          img_src: "./static/img/icon3-3.png",
          img_class: "menu-icon icon3",
          menu_title: "学生请假",
          menu_link: "/pages/studentsLeave/studentsLeave",
          new_message: false
        },
        {
          img_src: "./static/img/icon4-4.png",
          img_class: "menu-icon",
          menu_title: "教室预约",
          menu_link: "/pages/classroom/classroom",
          new_message: false
        },
        {
          img_src: "./static/img/icon5-5.png",
          img_class: "menu-icon",
          menu_title: "我要调课",
          menu_link: "/pages/adjustmentClass/adjustmentClass",
          new_message: false
        },
        {
          img_src: "./static/img/icon6-6.png",
          img_class: "menu-icon",
          menu_title: "我要并课",
          menu_link: "/pages/andClass/andClass",
          new_message: false
        },
        {
          img_src: "./static/img/icon7-7.png",
          img_class: "menu-icon",
          menu_title: "消息通知",
          menu_link: "/pages/message/messageNotification",
          new_message: true
        }
      ]
    };
  },
  mounted: function() {
    //修改页面title
    document.title = "菜单列表";
    let that = this;
    //进页面先判断登录是否过期
    that
      .$http({
        method: "get",
        url: "/Home/Verify/index?token=" + localStorage.getItem("tec_token")
      })
      .then(response => {
        if (response.data.verify) {
          //登录未过期 => 获取用户数据
          that
            .$http({
              method: "post",
              url: "/Home/Teacher/index",
              data: qs.stringify({
                job_num: localStorage.getItem("job_num")
              })
            })
            .then(response => {
              that.user_info = response.data;
              //消息通知
              if (that.user_info.information > 99) {
                that.message = "99+";
              } else if (that.user_info.information == 0) {
                that.clear_message(that.menu_good);
                that.clear_message(that.menu_bad);
              } else {
                that.message = that.user_info.information;
              }
              //出勤率
              if (response.data.request) {
                that.attendance = Math.round(
                  (1 -
                    (response.data.request + response.data.truant) /
                      response.data.count) *
                    100
                );
              }
            })
            .catch(error => {
              alert("网络错误");
              console.log(error);
            });
        } else {
          //登录过期 => 清除前台存储的登录信息并返回登录页
          let instance = Toast("登录已失效，请重新登录！");
          setTimeout(() => {
            instance.close();
            localStorage.removeItem("tec_token");
            localStorage.removeItem("job_num");
            this.$router.push({ path: "/pages/Login" });
          }, 1000);
        }
      })
      .catch(error => {
        alert("网络错误");
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.more {
  width: 100%;
  height: 100vh;
  background: #f6f6f6;
  overflow: hidden;
  .menu {
    width: 13.5rem;
    margin: 0 auto;
    margin-top: 7.02vh;
    > ul {
      > li {
        width: 2.5rem;
        height: 3.45rem;
        position: relative;
        text-align: center;
        margin-right: 1.15rem;
        margin-bottom: 3.85vh;
        &:nth-child(4n) {
          margin-right: 0;
        }
        .menu-icon {
          width: 100%;
          height: auto;
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .icon2 {
          top: -0.17rem;
        }
        .icon3 {
          width: 2.68rem;
          top: -0.15rem;
        }
        .menu-title {
          font-size: 0.6rem;
          color: #a0a0a0;
          display: block;
          margin-top: 0.9vh;
          position: absolute;
          bottom: 0;
          white-space: nowrap;
        }
        .prompt {
          display: block;
          position: absolute;
          top: -0.25rem;
          right: -0.3rem;
          font-size: 0.5rem;
          color: #fff;
          background: #e71b23;
          border-radius: 0.5rem;
          padding: 0 0.2rem;
        }
      }
    }
  }
}
</style>
