/*
 * @Author: alex (chenzeyongjsj@163.com) 
 * @Date: 2018-03-17 18:01:19 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-19 08:32:34
 */


<template>
  <div class="adjustmentClassApply">
    <!-- form -->
    <div class="form">
      <!-- 己方 -->
      <div class="form-item">
        <span class="item-title float-left">调课课程：</span>
        <div class="item-container float-right">
          <select class="picker-select" v-model="myClass" @change="selectChecked()">
            <option v-for="item in myClassList" :key="item.id" :value="item">{{item.title}}</option>
          </select>
          <span>{{myClass.title}}</span>
          <i class="iconfont icon-down"></i>
        </div>
      </div>
      <div class="form-item">
        <span class="item-title float-left">上课时间：</span>
        <!-- datepicker -->
        <div class="item-container float-right" @click="open('startPicker')">
          <span>{{myDate}}</span>
          <i class="iconfont icon-down"></i>
        </div>
        <mt-datetime-picker ref="startPicker" type="date" :startDate="nowDate" @confirm="handleChange">
        </mt-datetime-picker>
      </div>
      <!-- 选中班级后显示 -->
      <div v-if="myClass">
        <div class="form-item item-2">
          <div class="item-container2 float-right">
            <span>上课教师：{{myTeacher}}</span>
          </div>
        </div>
        <div class="form-item item-2">
          <div class="item-container2 float-right">
            <span>上课地点：{{myPlace}}</span>
          </div>
        </div>
        <div class="form-item item-2">
          <div class="item-container2 float-right">
            <span>上课班级：{{myC}}</span>
          </div>
        </div>
      </div>
      <!-- 对方 -->
      <div class="form-item toItem">
        <span class="item-title float-left">对方课程：</span>
        <div class="item-container float-right">
          <select class="picker-select" v-model="toClass" @change="selectChecked2()">
            <option v-for="item in toClassList" :key="item.id" :value="item">{{item.title}}</option>
          </select>
          <span>{{toClass.title}}</span>
          <i class="iconfont icon-down"></i>
        </div>
      </div>
      <div class="form-item">
        <span class="item-title float-left">上课时间：</span>
        <div class="item-container float-right" @click="open('toPicker')">
          <span>{{toDate}}</span>
          <i class="iconfont icon-down"></i>
        </div>
        <mt-datetime-picker ref="toPicker" type="date" :startDate="nowDate2" @confirm="handleChange2">
        </mt-datetime-picker>
      </div>
      <!-- 选中班级后显示 -->
      <div v-if="toClass">
        <div class="form-item item-2">
          <div class="item-container2 float-right">
            <span>上课教师：{{toTeacher}}</span>
          </div>
        </div>
        <div class="form-item item-2">
          <div class="item-container2 float-right">
            <span>上课地点：{{toPlace}}</span>
          </div>
        </div>
        <div class="form-item item-2">
          <div class="item-container2 float-right">
            <span>上课班级：{{toC}}</span>
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="item-title float-left">调课事由：</span>
        <div class="item-container3 float-right">
          <textarea class="textarea" rows="5" v-model="remarks"></textarea>
        </div>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="submit">
      <p class="submit-btn" @click="submit()">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</p>
    </div>
  </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
export default {
  name: "adjustmentClassApply",
  data() {
    return {
      // 登录信息
      userToken: "",
      student_num: "",
      //
      myDate: "", //己方时间
      myTeacher: "", //己方上课教师
      myPlace: "", //己方上课地点
      myC: "", //己方上课班级
      toDate: "", //对方时间
      toTeacher: "", //对方上课教师
      toPlace: "", //对方上课地点
      toC: "", //对方上课班级
      myClassList: [], //己方课程
      myClass: "",
      toClassList: [], //对方课程
      toClass: "",
      //已选择课程
      selectCheck: false,
      selectCheck2: false,
      remarks: "", //备注
      nowDate: new Date(), //最小时间
      nowDate2: new Date(), //最小时间
      submit_btn: true //提交成功之后关闭提交按钮
    };
  },
  mounted: function() {
    //修改页面title
    document.title = "调课申请";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      let that = this;
      // 设置登录信息
      that.userToken = localStorage.getItem("userToken");
      that.student_num = localStorage.getItem("student_num");
      //设置初始时间
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      month < 10 ? (month = "0" + month) : month;
      day < 10 ? (day = "0" + day) : day;
      this.myDate = year + "-" + month + "-" + day;
      this.toDate = year + "-" + month + "-" + day;
      //获取下拉列表数据
      function myClassList() {
        return that.$http.get("./static/mock/myClassList.json");
      }

      function toClassList() {
        return that.$http.get("./static/mock/toClassList.json");
      }

      that.$http.all([myClassList(), toClassList()]).then(
        that.$http.spread(function(myClass, toClass) {
          // 两个请求现在都执行完成
          that.myClassList = myClass.data;
          that.toClassList = toClass.data;
        })
      );
    }
  },
  methods: {
    //打开日期选择器
    open(picker) {
      this.$refs[picker].open();
    },
    //start datepicker change 事件
    handleChange(value) {
      //格式化时间
      let data = new Date(value);
      let year = data.getFullYear();
      let month = data.getMonth() + 1;
      let day = data.getDate();
      month < 10 ? (month = "0" + month) : month;
      day < 10 ? (day = "0" + day) : day;
      this.myDate = year + "-" + month + "-" + day;
      //设置结束时间的最小时间
      if (this.myDate > this.toDate) {
        this.toDate = this.myDate;
      }
      this.nowDate2 = new Date(this.myDate);
    },
    //end datepicker change 事件
    handleChange2(value) {
      //格式化时间
      let data = new Date(value);
      let year = data.getFullYear();
      let month = data.getMonth() + 1;
      let day = data.getDate();
      month < 10 ? (month = "0" + month) : month;
      day < 10 ? (day = "0" + day) : day;
      this.toDate = year + "-" + month + "-" + day;
    },
    //select change
    selectChecked() {
      let that = this;
      that.selectCheck = true;
      that
        .$http({
          method: "get",
          url: "./static/mock/andClassSelect.json",
          data: {
            date: that.myDate,
            classname: that.myClass.title
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
          that.myTeacher = response.data.teacher;
          that.myPlace = response.data.place;
          that.myC = response.data.class;
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectChecked2() {
      let that = this;
      that.selectCheck2 = true;
      that
        .$http({
          method: "get",
          url: "./static/mock/andClassSelect2.json",
          data: {
            date: that.toDate,
            classname: that.toClass.title
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
          that.toTeacher = response.data.teacher;
          that.toPlace = response.data.place;
          that.toC = response.data.class;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //表单提交
    submit: function() {
      var that = this;
      if (that.selectCheck && that.selectCheck2) {
        //验证通过
        that
          .$http({
            method: "get",
            url: "./static/mock/login.json",
            data: {},
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
            let instance = Toast("提交成功");
            //提交成功之后关闭提交按钮并跳转到预约列表页
            that.submit_btn = false;
            setTimeout(() => {
              instance.close();
              that.$router.push({
                path: "/pages/andClass/andClass/andClassRecord"
              });
            }, 500);
          })
          .catch(error => {
            let instance = Toast("提交失败");
            setTimeout(() => {
              instance.close();
            }, 1000);
            //提交失败则重新开放登录按钮
            that.submit_btn = true;
            console.log(error);
          });
      } else {
        MessageBox("提示", "请选择课程");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.adjustmentClassApply {
  width: 100%;
  position: relative;
  padding-top: 1.75rem;
  padding-bottom: 2rem;
  .form {
    width: 100%;
    padding: 0 1.25rem;
    margin: 0 auto;
    margin-top: -0.55rem;
    .form-item {
      width: 100%;
      margin-top: 0.55rem;
      position: relative;
      &::after {
        content: "";
        visibility: hidden;
        clear: both;
        display: block;
      }
      .item-title {
        width: 2.8rem;
        white-space: nowrap;
        font-size: 0.6rem;
        color: #808080;
        line-height: 1.75rem;
      }
      .item-container {
        width: 10.4rem;
        height: 1.25rem;
        border: 1px solid #787878;
        border-radius: 0.2rem;
        margin-top: 0.26rem;
        background: #fff;
        font-size: 0.6rem;
        color: #808080;
        line-height: 1.25rem;
        padding-left: 0.4rem;
        padding-right: 0.8rem;
        position: relative;
        overflow: hidden;
        .icon-down {
          position: absolute;
          top: 50%;
          right: 0.4rem;
          transform: translateY(-50%);
          font-size: 0.6rem;
        }
        .picker-select {
          width: 100%;
          height: 1.25rem;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
      }
      .item-container2 {
        width: 10.4rem;
        height: 1rem;
        font-size: 0.5rem;
        color: #808080;
        line-height: 1rem;
        position: relative;
        overflow: hidden;
      }
      .item-container3 {
        width: 10.4rem;
      }
      .textarea {
        width: 100%;
        border: 1px solid #787878;
        border-radius: 0.2rem;
        background: #fff;
        font-size: 0.6rem;
        color: #808080;
        font-size: 0.6rem;
        //去除移动版的内阴影
        -webkit-appearance: none;
      }
    }
    .toItem {
      margin-top: 2rem;
    }
    .item-2 {
      margin-top: 0;
    }
  }
  .submit {
    width: 11.25rem;
    height: 1.5rem;
    margin: 0 auto;
    margin-top: 2.8rem;
    .submit-btn {
      width: 11.25rem;
      height: 1.5rem;
      text-align: center;
      line-height: 1.5rem;
      background: #808080;
      color: #fff;
      font-size: 0.65rem;
      border-radius: 0.2rem;
    }
  }
}
</style>
