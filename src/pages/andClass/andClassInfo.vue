/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-08 13:51:13 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-19 08:39:22
 */


<template>
  <div class="andClassInfo">
    <!-- 消息列表 -->
    <div class="container">
      <!-- date -->
      <p class="date">
        <span class="float-left">{{andClassInfo.applyDate}}</span>
        <span class="float-left">{{andClassInfo.week}}</span>
      </p>
      <!-- content -->
      <div class="content">
        <ul class="my-class class-list">
          <li>调课课程：{{andClassInfo.myclassname}}</li>
          <li>上课时间：{{andClassInfo.mydate}}</li>
          <li>上课班级：{{andClassInfo.myclass}}</li>
          <li>上课地点：{{andClassInfo.myplace}}</li>
        </ul>
        <ul class="to-class class-list">
          <li>对方课程：{{andClassInfo.toclassname}}</li>
          <li>上课时间：{{andClassInfo.todate}}</li>
          <li>上课班级：{{andClassInfo.toclass}}</li>
          <li>上课地点：{{andClassInfo.toplace}}</li>
        </ul>
      </div>
      <!-- progess -->
      <div class="progess">
        <span class="progess-title float-left">审核进度：</span>
        <ol class="progess-list float-right">
          <li class="float-left" :class="andClassInfo.teacher_examine">
            <span class="float-left">{{andClassInfo.examineTeacher}}</span>
            <i class="iconfont float-right" :class="'icon-'+andClassInfo.teacher_examine"></i>
          </li>
          <li class="float-left" :class="andClassInfo.department_examine">
            <span class="float-left">系办</span>
            <i class="iconfont float-right" :class="'icon-'+andClassInfo.department_examine"></i>
          </li>
          <li class="float-left" :class="andClassInfo.college_examine">
            <span class="float-left">院办</span>
            <i class="iconfont float-right" :class="'icon-'+andClassInfo.college_examine"></i>
          </li>
        </ol>
      </div>
      <!-- info -->
      <div class="info">
        <p>审核回执： {{andClassInfo.receipt}}</p>
        <p>上课时间： {{andClassInfo.classTime}}</p>
        <p>上课地点： {{andClassInfo.classPlace}}</p>
      </div>
      <!-- button -->
      <div class="btn">
        <button>撤销申请</button>
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
  name: "andClassInfo",
  data() {
    return {
      linkActive: 5, //菜单定位
      andClassInfo: {}
    };
  },
  components: {
    Menu
  },
  mounted: function() {
    //修改页面title
    document.title = "并课信息";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      this.$http
        .get("./static/mock/andClassInfo.json")
        .then(response => {
          this.andClassInfo = response.data;
          //老师审核
          if (this.andClassInfo.examineTeacher_uid == 0) {
            this.andClassInfo.teacher_examine = "";
          } else if (this.andClassInfo.examineTeacher_uid == 1) {
            this.andClassInfo.teacher_examine = "tongguo";
          } else if (this.andClassInfo.examineTeacher_uid == 2) {
            this.andClassInfo.teacher_examine = "bohui";
          }
          //系办审核
          if (this.andClassInfo.department == 0) {
            this.andClassInfo.department_examine = "";
          } else if (this.andClassInfo.department == 1) {
            this.andClassInfo.department_examine = "tongguo";
          } else if (this.andClassInfo.department == 2) {
            this.andClassInfo.department_examine = "bohui";
          }
          //院办审核
          if (this.andClassInfo.college == 0) {
            this.andClassInfo.college_examine = "";
            this.andClassInfo.examineClass = "";
          } else if (this.andClassInfo.college == 1) {
            this.andClassInfo.college_examine = "tongguo";
          } else if (this.andClassInfo.college == 2) {
            this.andClassInfo.college_examine = "bohui";
          }
          //换算星期
          this.andClassInfo.week = new Date(
            this.andClassInfo.applyDate
          ).getDay();
          if (this.andClassInfo.week == 0) {
            this.andClassInfo.week = "周日";
          } else if (this.andClassInfo.week == 1) {
            this.andClassInfo.week = "周一";
          } else if (this.andClassInfo.week == 2) {
            this.andClassInfo.week = "周二";
          } else if (this.andClassInfo.week == 3) {
            this.andClassInfo.week = "周三";
          } else if (this.andClassInfo.week == 4) {
            this.andClassInfo.week = "周四";
          } else if (this.andClassInfo.week == 5) {
            this.andClassInfo.week = "周五";
          } else if (this.andClassInfo.week == 6) {
            this.andClassInfo.week = "周六";
          }
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
.andClassInfo {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0 1.25rem;
    .date {
      width: 100%;
      height: 3.05rem;
      padding-top: 1.5rem;
      > span {
        display: block;
        font-size: 0.7rem;
        color: #999;
        margin-right: 0.3rem;
      }
    }
    .content {
      overflow: hidden;
      width: 100%;
      padding: 0 0.55rem;
      margin-bottom: 1rem;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
      .class-list {
        width: 100%;
        > li {
          width: 100%;
          height: 1.2rem;
          overflow: hidden;
          font-size: 0.6rem;
          color: #808080;
          line-height: 1.2rem;
        }
      }
      .my-class {
        margin-top: 0.25rem;
        border-bottom: 1px dashed #e6e6e6;
        padding-bottom: 0.5rem;
      }
      .to-class {
        margin-top: 0.5rem;
        padding-bottom: 0.25rem;
      }
    }
    .progess {
      width: 100%;
      border-top: 1px dashed #e6e6e6;
      border-bottom: 1px dashed #e6e6e6;
      &::after {
        content: "";
        visibility: hidden;
        display: block;
        clear: both;
      }
      .progess-title {
        line-height: 1.25rem;
        font-size: 0.6rem;
        color: #808080;
        margin-bottom: 0.6rem;
        margin-top: 0.6rem;
      }
      .progess-list {
        width: 10.25rem;
        > li {
          height: 1.25rem;
          padding: 0 0.25rem;
          margin-right: 0.6rem;
          border: 1px solid #808080;
          border-radius: 0.2rem;
          margin-bottom: 0.6rem;
          margin-top: 0.6rem;
          &:last-of-type {
            margin-right: 0;
          }
          &::after {
            content: "";
            visibility: hidden;
            display: block;
            clear: both;
          }
          span {
            line-height: 1.25rem;
            font-size: 0.6rem;
            color: #808080;
          }
          .iconfont {
            line-height: 1.25rem;
            font-size: 0.6rem;
            color: #808080;
            margin-left: 0.2rem;
          }
          .icon-bohui {
            font-size: 0.75rem;
          }
        }
        .tongguo {
          border: 1px solid #8bc53f;
          span,
          .iconfont {
            color: #8bc53f;
          }
        }
        .bohui {
          border: 1px solid #cb121b;
          span,
          .iconfont {
            color: #cb121b;
          }
        }
      }
    }
    .info {
      width: 100%;
      margin-top: 0.5rem;
      > p {
        font-size: 0.6rem;
        color: #808080;
        line-height: 1.2rem;
      }
    }
    .btn {
      width: 11.25rem;
      margin: 0 auto;
      margin-top: 1rem;
      margin-bottom: 1rem;
      button {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        border: none;
        background: #808080;
        outline: none;
        text-align: center;
        line-height: 1.5rem;
        color: #fff;
        font-size: 0.65rem;
        letter-spacing: 0.1rem;
      }
    }
  }
}
</style>
