/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-02-28 16:42:39 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-13 17:27:44
 */
<template>
  <div class="login">
    <div class="logo">
      <img src="../../static/img/logo2.png" alt="logo">
    </div>
    <div class="text">
      <p>设计艺术学院</p>
      <p>智慧管理系统</p>
    </div>
    <div class="login-box">
      <!-- user -->
      <div class="container user">
        <input type="text" placeholder="请输入学号 / 工号" v-model="user" @blur="userV()" :class="{'test':userTest}">
        <i class="iconfont icon-user"></i>
        <!-- 错误提示 -->
        <span class="errText">{{userErr}}</span>
      </div>
      <!-- password -->
      <div class="container password">
        <input type="password" placeholder="初始密码为身份证后6位" v-model="password" @blur="psdV()" :class="{'test':psdTest}">
        <i class="iconfont icon-password"></i>
        <!-- 错误提示 -->
        <span class="errText">{{psdErr}}</span>
      </div>
      <!-- submit -->
      <div class="container submit">
        <button @click="formSubmit()">登&nbsp;&nbsp;&nbsp;录</button>
      </div>
      <!-- 微信快捷登录 -->
      <div class="container wechat-submit">
        <button>微信快捷登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import Qs from "qs";
export default {
  name: "Login",
  data() {
    return {
      user: "", //用户名
      userErr: "", //错误提示语
      userTest: false, //正确边框
      password: "",
      psdErr: "",
      psdTest: false,
      userToken: ""
    };
  },
  mounted: function() {
    //修改页面title
    document.title = "登录";
    //如果已登录
    if (localStorage.getItem("userToken")) {
      //跳转到首页
      this.$router.push({ path: "/pages/Home" });
    }
  },
  methods: {
    //用户名验证
    userV: function() {
      var reg = /^[0-9a-zA-Z]{1,}$/; //数字字母组合
      if (this.user) {
        if (!reg.test(this.user)) {
          this.userErr = "用户名为学号/工号！";
          this.userTest = false;
        } else {
          this.userErr = "";
          this.userTest = true;
        }
      } else {
        this.userErr = "用户名不能为空！";
        this.userTest = false;
      }
    },
    //密码验证
    psdV: function() {
      var reg = /^[a-zA-Z0-9_]{6,12}$/; //6-12为字母数字下划线
      if (this.password) {
        if (!reg.test(this.password)) {
          this.psdErr = "密码为6-12位字母/数字/下划线组合！";
          this.psdTest = false;
        } else {
          this.psdErr = "";
          this.psdTest = true;
        }
      } else {
        this.psdErr = "密码不能为空！";
        this.psdTest = false;
      }
    },
    //提交
    formSubmit: function() {
      var that = this;
      if (this.userTest && this.psdTest) {
        //验证通过
        this.$http({
          method: "get",
          // url: "/Admin/Login/logTodo",
          url: "./static/mock/login.json",
          data: {
            name: this.user,
            password: this.password
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          //格式化
          transformRequest: [
            function(data) {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            }
          ]
        })
          .then(response => {
            localStorage.setItem("userToken", response.data.token);
            if (response.data.status == "001") {
              //提交成功后跳转到首面
              that.$router.push({ path: "/pages/Home" });
            }
            // console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        if (this.userTest) {
          this.userErr = "";
        } else {
          this.userErr = "用户名格式错误！";
        }
        if (this.psdTest) {
          this.psdErr = "";
        } else {
          this.psdErr = "密码格式错误！";
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url("../../static/img/bg.jpg") no-repeat;
  background-size: 100% 100%;
  .logo {
    width: 8.6rem;
    height: 7.31vh;
    margin: 0 auto;
    margin-top: 8.08vh;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    text-align: center;
    margin-top: 11vh;
    > p {
      font-size: 1rem;
      color: #000;
      line-height: 5.5vh;
      letter-spacing: 0.2rem;
    }
  }
  .login-box {
    width: 11.25rem;
    margin: 0 auto;
    .container {
      width: 100%;
      height: 5.77vh;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border: 1px solid #5d5d5d;
        border-radius: 0.2rem;
        background: #fff;
        font-size: 0.6rem;
        padding-left: 0.5rem;
        padding-right: 1.65rem;
        transition: all 0.3s;
        -webkit-appearance: none; //关闭移动端内阴影
        &:focus {
          border-color: #eb454c;
        }
      }
      .test {
        border-color: #67c23a;
      }
      .errText {
        font-size: 0.45rem;
        position: absolute;
        bottom: -0.62rem;
        left: 0;
        color: #eb454c;
      }
      /* placeholder颜色 */
      :-moz-placeholder {
        color: #c4c4c4;
      }
      ::-moz-placeholder {
        color: #c4c4c4;
      }
      input:-ms-input-placeholder {
        color: #c4c4c4;
      }
      input::-webkit-input-placeholder {
        color: #c4c4c4;
      }
      .iconfont {
        font-size: 0.8rem;
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        color: #c4c4c4;
      }
    }
    .user {
      margin-top: 15.39vh;
    }
    .password {
      margin-top: 2.21vh;
    }
    .submit {
      margin-top: 4.62vh;
      button {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        border: none;
        background: #000;
        outline: none;
        text-align: center;
        line-height: 5.77vh;
        color: #fff;
        font-size: 0.65rem;
      }
    }
    .wechat-submit {
      margin-top: 2.21vh;
      button {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        border: none;
        background: #36ae4a;
        outline: none;
        text-align: center;
        line-height: 5.77vh;
        color: #fff;
        font-size: 0.65rem;
        letter-spacing: 0.1rem;
      }
    }
  }
}
</style>
