/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-05 16:43:42 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-07 22:31:41
 */

<template>
  <div class="home" :class='bg_choose ? "home-good": "home-bad"'>
    <div class="info">
      <div class="top-box">
        <span class="date float-left">2018/01/31 星期三</span>
        <router-link to="/" class="float-right" @click="outLogin()">
          <span class="outlogin" @click="outLogin()">退出登录</span>
        </router-link>
      </div>
      <p class="name">{{user_info.name}}</p>
      <p class="department">{{user_info.department}}</p>
      <p class="job_number">{{user_info.job_number}}</p>
    </div>
    <!-- 考勤信息 -->
    <div class="attendance">
      <div class="title">
        <p>考勤信息</p>
      </div>
      <div class="container">
        <p class="left">
          <span class="text1 float-left">请假：</span>
          <span class="text2 float-left">{{user_info.leave}}</span>
          <span class="text1 float-left">次</span>
        </p>
        <p class="middle">
          <span class="text1 float-left">旷课：</span>
          <span class="text2 float-left">{{user_info.absenteeism}}</span>
          <span class="text1 float-left">节</span>
        </p>
        <p class="right">
          <span class="text1 float-left">出勤率：</span>
          <canvas id="attendance" width="160" height="160"></canvas>
        </p>
      </div>
    </div>
    <!-- 菜单 -->
    <div class="menu">
      <ul v-if="bg_choose">
        <li class="float-left" v-for="item in menu_good" :key="item.id">
          <router-link :to="item.menu_link">
            <img :src="item.img_src" :class="item.img_class">
            <p class="menu-title">{{item.menu_title}}</p>
            <p class="prompt" v-if="item.new_message">{{message}}</p>
          </router-link>
        </li>
      </ul>
      <ul v-else>
        <li class="float-left" v-for="item in menu_bad" :key="item.id">
          <router-link :to="item.menu_link">
            <img :src="item.img_src" :class="item.img_class">
            <p class="menu-title">{{item.menu_title}}</p>
            <p class="prompt" v-if="item.new_message">{{message}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
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
          menu_link: "./myTimetable",
          new_message: false
        },
        {
          img_src: "./static/img/icon2.png",
          img_class: "menu-icon icon2",
          menu_title: "学生考勤",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon3.png",
          img_class: "menu-icon icon3",
          menu_title: "学生请假",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon4.png",
          img_class: "menu-icon",
          menu_title: "教室预约",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon5.png",
          img_class: "menu-icon",
          menu_title: "我要调课",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon6.png",
          img_class: "menu-icon",
          menu_title: "我要并课",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon7.png",
          img_class: "menu-icon",
          menu_title: "消息通知",
          menu_link: "/",
          new_message: true
        }
      ],
      menu_bad: [
        {
          img_src: "./static/img/icon1-1.png",
          img_class: "menu-icon",
          menu_title: "我的课表",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon2-2.png",
          img_class: "menu-icon icon2",
          menu_title: "学生考勤",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon3-3.png",
          img_class: "menu-icon icon3",
          menu_title: "学生请假",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon4-4.png",
          img_class: "menu-icon",
          menu_title: "教室预约",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon5-5.png",
          img_class: "menu-icon",
          menu_title: "我要调课",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon6-6.png",
          img_class: "menu-icon",
          menu_title: "我要并课",
          menu_link: "/",
          new_message: false
        },
        {
          img_src: "./static/img/icon7-7.png",
          img_class: "menu-icon",
          menu_title: "消息通知",
          menu_link: "/",
          new_message: true
        }
      ]
    };
  },
  mounted: function() {
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      let cw =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      this.$http
        .get("./static/mock/home.json")
        .then(response => {
          this.user_info = response.data;
          //消息通知
          if (this.user_info.new_message > 99) {
            this.message = "99+";
          } else if (this.user_info.new_message == 0) {
            this.clear_message(this.menu_good);
            this.clear_message(this.menu_bad);
          } else {
            this.message = this.user_info.new_message;
          }
          //出勤率
          this.attendance = Math.round(
            (1 -
              (response.data.leave + response.data.absenteeism) /
                response.data.all_class) *
              100
          );
          let time_canvas = document.getElementById("attendance");
          let canvas_color;
          if (this.attendance < 90) {
            this.bg_choose = false;
            canvas_color = "#cb121b";
          } else {
            this.bg_choose = true;
            canvas_color = "#86c03f";
          }
          //出勤率进度条
          this.drawMain(time_canvas, this.attendance, canvas_color, "#c8c8c8");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    /* 
        @drawing_elem: 绘制对象 
        @percent：绘制圆环百分比, 范围[0, 100] 
        @forecolor: 绘制圆环的前景色，颜色代码 
        @bgcolor: 绘制圆环的背景色，颜色代码 
    */
    drawMain: function(drawing_elem, percent, forecolor, bgcolor) {
      var context = drawing_elem.getContext("2d");
      var center_x = drawing_elem.width / 2;
      var center_y = drawing_elem.height / 2;
      var rad = Math.PI * 2 / 100;
      var speed = 0;
      // 绘制背景圆圈
      function backgroundCircle() {
        context.save();
        context.beginPath();
        context.lineWidth = 20; //设置线宽
        var radius = center_x - context.lineWidth;
        // context.lineCap = "round";
        context.strokeStyle = bgcolor;
        context.arc(center_x, center_y, radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        context.restore();
      }
      //绘制运动圆环
      function foregroundCircle(n) {
        context.save();
        context.strokeStyle = forecolor;
        context.lineWidth = 20;
        // context.lineCap = "round";
        var radius = center_x - context.lineWidth;
        context.beginPath();
        context.arc(
          center_x,
          center_y,
          radius,
          -Math.PI / 2,
          -Math.PI / 2 + n * rad,
          false
        ); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke();
        context.closePath();
        context.restore();
      }
      //绘制文字
      function text(n) {
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.fillStyle = "#c8c8c8";
        var font_size = 40;
        context.font = font_size + "px Helvetica";
        var text_width = context.measureText(n.toFixed(0) + "%").width;
        context.fillText(
          n.toFixed(0) + "%",
          center_x - text_width / 2,
          center_y + font_size / 2.5
        );
        context.restore();
      }
      //执行动画
      (function drawFrame() {
        window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);
        backgroundCircle();
        text(speed);
        foregroundCircle(speed);
        if (speed >= percent) return;
        speed += 1;
      })();
    },
    //退出登录
    outLogin: function() {
      localStorage.removeItem("userToken");
    },
    //清除消息通知小红点
    clear_message: function(obj) {
      for (let i = 0; i < obj.length; i++) {
        obj[i].new_message = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home {
  width: 100%;
  height: 100vh;
  background: #f6f6f6;
  overflow: hidden;
  .info {
    width: 13.5rem;
    margin: 0 auto;
    margin-top: 5vh;
    font-size: 0.5rem;
    color: #fff;
    .top-box {
      margin-bottom: 4vh;
      &::after {
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
      }
      .date {
        font-size: 0.5rem;
        letter-spacing: 0.05rem;
        letter-spacing: 0.05rem;
      }
      .outlogin {
        font-size: 0.5rem;
        letter-spacing: 0.05rem;
        letter-spacing: 0.05rem;
        color: #fff;
      }
    }
    .name {
      font-size: 1rem;
      margin-bottom: 2vh;
      letter-spacing: 0.1rem;
    }
    .department {
      margin-bottom: 1vh;
      font-size: 0.6rem;
      letter-spacing: 0.05rem;
    }
    .job_number {
      font-size: 0.6rem;
      letter-spacing: 0.05rem;
    }
  }
  .attendance {
    width: 13.5rem;
    height: 19.23vh;
    margin: 0 auto;
    margin-top: 5.29vh;
    background: #fff;
    border-radius: 0.2rem;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    .title {
      width: 100%;
      height: 5.77vh;
      border-bottom: 1px solid #ececec;
      > p {
        line-height: 5.77vh;
        font-size: 0.6rem;
        color: #c4c4c4;
        margin-left: 0.45rem;
        letter-spacing: 0.1rem;
      }
    }
    .container {
      width: 100%;
      height: 13.46vh;
      padding: 0 0.45rem;
      text-align: center;
      position: relative;
      > p {
        height: 3vh;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .text1 {
          font-size: 0.65rem;
          color: #898989;
          white-space: nowrap;
        }
        .text2 {
          color: #86c03f;
          font-size: 0.9rem;
          margin-top: -0.15rem;
        }
      }
      .left {
        left: 0.45rem;
      }
      .middle {
        left: 4.5rem;
      }
      .right {
        width: 4.55rem;
        right: 0.45rem;
        > span {
          left: 0;
        }
      }
      #attendance {
        width: 2.2rem;
        height: 2.2rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }
    }
  }
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
          top: -0.3rem;
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
.home-good {
  background: url("../../static/img/bg2.jpg") no-repeat;
  background-size: 100% 100%;
}
.home-bad {
  background: url("../../static/img/bg3.jpg") no-repeat;
  background-size: 100% 100%;
  .attendance {
    .container {
      > p {
        .text2 {
          color: #cb121b;
        }
      }
    }
  }
}
</style>
