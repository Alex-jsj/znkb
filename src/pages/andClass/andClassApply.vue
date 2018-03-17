/*
 * @Author: alex (chenzeyongjsj@163.com) 
 * @Date: 2018-03-17 18:01:19 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-17 18:18:32
 */


<template>
  <div class="andClassApply">
    <!-- form -->
    <div class="form">
      <div class="form-item">
        <span class="item-title float-left">开始时间：</span>
        <!-- datepicker -->
        <div class="item-container float-right" @click="open('startPicker')">
          <span>{{startDate}}</span>
          <i class="iconfont icon-down"></i>
          <mt-datetime-picker ref="startPicker" type="date" :startDate="nowDate" @confirm="handleChange">
          </mt-datetime-picker>
        </div>
      </div>
      <!-- <div class="form-item">
        <span class="item-title float-left">结束时间：</span>
        <div class="item-container float-right" @click="open('endPicker')">
          <span>{{endDate}}</span>
          <i class="iconfont icon-down"></i>
          <mt-datetime-picker ref="endPicker" type="date" :startDate="nowDate2" @confirm="handleChange2">
          </mt-datetime-picker>
        </div>
      </div>
      <div class="form-item">
        <span class="item-title float-left">使用人数：</span>
        <div class="item-container float-right">
          <div class="picker picker2 float-right">
            <select class="picker-select" v-model="users">
              <option v-for="item in usersList" :key="item.id" :value="item">{{item.title}}</option>
            </select>
            <span>{{users.title}}</span>
            <i class="iconfont icon-down"></i>
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="item-title float-left">并课事由：</span>
        <div class="item-container float-right">
          <textarea class="textarea float-left" rows="5" v-model="remarks"></textarea>
        </div>
      </div> -->
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
  name: "andClassApply",
  data() {
    return {
      startDate: "", //开始时间
      endDate: "", //结束时间
      users: {
        value: 0,
        title: "20-50人"
      }, //使用人数
      remarks: "", //备注
      nowDate: new Date(), //最小时间
      nowDate2: new Date(), //最小时间
      usersList: [
        {
          title: "20-50人",
          value: 0
        },
        {
          title: "50-100人",
          value: 1
        },
        {
          title: "100人以上",
          value: 2
        }
      ], //使用人数列表
      submit_btn: true //提交成功之后关闭提交按钮
    };
  },
  components: {},
  mounted: function() {
    //修改页面title
    document.title = "并课申请";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      //设置初始时间
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      month < 10 ? (month = "0" + month) : month;
      day < 10 ? (day = "0" + day) : day;
      this.startDate = year + "-" + month + "-" + day;
      this.endDate = year + "-" + month + "-" + day;
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
      this.startDate = year + "-" + month + "-" + day;
      //设置结束时间的最小时间
      if (this.startDate > this.endDate) {
        this.endDate = this.startDate;
      }
      this.nowDate2 = new Date(this.startDate);
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
      this.endDate = year + "-" + month + "-" + day;
    },
    //表单提交
    submit: function() {
      var that = this;
      if (that.submit_btn) {
        if (that.picker_err) {
          MessageBox("提示", "同一日的结束课程节数不能小于开始课程节数");
          that.picker_err = true;
        } else {
          that.picker_err = false;
          //验证通过
          that
            .$http({
              method: "get",
              // url: "/Admin/Login/logTodo",
              url: "./static/mock/login.json",
              data: {
                startDate: that.startDate, //开始时间
                endDate: that.endDate, //结束时间
                startClass: that.startClass.title, //结束课时
                endClass: that.endClass.title, //结束课时
                users: that.users.title, //使用人数
                purpose: that.purpose.title, //教室用途
                remarks: that.remarks //结束时间
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
              let instance = Toast("提交成功");
              //提交成功之后关闭提交按钮并跳转到预约列表页
              that.submit_btn = false;
              setTimeout(() => {
                instance.close();
                that.$router.push({
                  path: "/pages/classroom/classroom/reservationRecord"
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
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.andClassApply {
  width: 100%;
  position: relative;
  padding-top: 1.75rem;
  .form {
    width: 100%;
    padding: 0 1.25rem;
    margin: 0 auto;
    .form-item {
      width: 100%;
      margin-bottom: 0.55rem;
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
      }
      .start-date,
      .end-date {
        width: 5.8rem;
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
      }
      .picker {
        width: 3.9rem;
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
          width: 3.9rem;
          height: 1.25rem;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
      }
      .picker2 {
        width: 100%;
        .picker-select {
          width: 100%;
        }
      }
      .picker-err {
        border-color: #cb121b;
      }
      .textarea {
        width: 100%;
        border: 1px solid #787878;
        border-radius: 0.2rem;
        background: #fff;
        font-size: 0.6rem;
        color: #808080;
        //去除移动版的内阴影
        -webkit-appearance: none;
      }
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
