/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-05 16:43:42 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-05 17:34:08
 */

<template>
  <div class="home" :class='bg_choose ? "home-good": "home-bad"'>
    <div class="info">
      <div class="top-box">
        <span class="date float-left">2018/01/31 星期三</span>
        <a href="javascript:void(0);" class="float-right">
          <span class="outlogin">退出登录</span>
        </a>
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
      <ul>
        <li>
          <img src="../../static/img/icon1.png" alt="">
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
      attendance: 100,
      bg_choose: true //根据出勤率更换风格
    };
  },
  mounted: function() {
    let cw =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
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
        let time_canvas = document.getElementById("attendance");
        let canvas_color;
        if (this.attendance < 90) {
          this.bg_choose = false;
          canvas_color = "#cb121b";
        } else {
          this.bg_choose = true;
          canvas_color = "#86c03f";
        }
        this.drawMain(time_canvas, this.attendance, canvas_color, "#c8c8c8");
      })
      .catch(error => {
        console.log(error);
      });
    //出勤率进度条
  },
  methods: {
    /* 
        @drawing_elem: 绘制对象 
        @percent：绘制圆环百分比, 范围[0, 100] 
        @forecolor: 绘制圆环的前景色，颜色代码 
        @bgcolor: 绘制圆环的背景色，颜色代码 
    */
    drawMain(drawing_elem, percent, forecolor, bgcolor) {
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
        > span {
          color: #cb121b;
        }
      }
    }
  }
}
</style>
