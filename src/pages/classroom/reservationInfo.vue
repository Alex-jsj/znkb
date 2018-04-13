/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-14 17:11:51
 */

<template>
  <div class="reservationInfo">
    <!-- 伪红线 -->
    <div class="mock-active">
      <span>教室预约</span>
    </div>
    <!-- form -->
    <div class="form">
      <div class="form-item">
        <span class="item-title float-left">开始时间：</span>
        <div class="item-container float-right">
          <!-- datepicker -->
          <div class="start-date float-left" @click="open('startPicker')">
            <span>{{startDate}}</span>
            <i class="iconfont icon-down"></i>
          </div>
          <mt-datetime-picker ref="startPicker" type="date" :startDate="nowDate" @confirm="handleChange">
          </mt-datetime-picker>
          <!-- picker -->
          <div class="picker float-right">
            <select class="picker-select" v-model="startClass" @change="classChange()">
              <option v-for="item in startClassList" :key="item.id" :value="item">{{item.name}}</option>
            </select>
            <span>{{startClass.name}}</span>
            <i class="iconfont icon-down"></i>
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="item-title float-left">结束时间：</span>
        <div class="item-container float-right">
          <!-- datepicker -->
          <div class="end-date float-left" @click="open('endPicker')">
            <span>{{endDate}}</span>
            <i class="iconfont icon-down"></i>
          </div>
          <mt-datetime-picker ref="endPicker" type="date" :startDate="nowDate2" @confirm="handleChange2">
          </mt-datetime-picker>
          <!-- picker -->
          <div class="picker float-right" :class="{'picker-err':picker_err}">
            <select class="picker-select" v-model="endClass" @change="classChange()">
              <option v-for="item in endClassList" :key="item.id" :value="item">{{item.name}}</option>
            </select>
            <span>{{endClass.name}}</span>
            <i class="iconfont icon-down"></i>
          </div>
        </div>
      </div>
      <div class="form-item">
        <span class="item-title float-left">使用人数：</span>
        <div class="item-container float-right">
          <!-- picker -->
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
        <span class="item-title float-left">教室用途：</span>
        <div class="item-container float-right">
          <input type="text" placeholder="如：教学活动" class="purpose" v-model="purpose">
        </div>
      </div>
      <div class="form-item">
        <span class="item-title float-left">备注：</span>
        <div class="item-container float-right">
          <!-- textarea -->
          <textarea class="textarea float-left" rows="5" v-model="remarks"></textarea>
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
import qs from "qs"; //序列化
export default {
  name: "reservationInfo",
  data() {
    return {
      startDate: "", //开始时间
      endDate: "", //结束时间
      startClass: {},
      endClass: {},
      users: {
        //使用人数
        value: 1,
        title: "0-20人"
      },
      purpose: "",
      remarks: "", //备注
      startClassList: [],
      endClassList: [],
      nowDate: new Date(), //最小时间
      nowDate2: new Date(), //最小时间
      usersList: [
        //使用人数列表
        {
          title: "0-20人",
          value: 1
        },
        {
          title: "20-50人",
          value: 2
        },
        {
          title: "50-100人",
          value: 3
        },
        {
          title: "100人以上",
          value: 4
        }
      ],
      picker_err: false, //课程节数错误提示
      submit_btn: true //提交成功之后关闭提交按钮
    };
  },
  mounted: function() {
    let that = this;
    //修改页面title
    document.title = "教室预约";
    //设置初始时间
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    month < 10 ? (month = "0" + month) : month;
    day < 10 ? (day = "0" + day) : day;
    this.startDate = year + "-" + month + "-" + day;
    this.endDate = year + "-" + month + "-" + day;
    //判断登录状态
    that
      .$http({
        method: "get",
        url: "/Home/Verify/index?token=" + localStorage.getItem("tec_token")
      })
      .then(response => {
        if (response.data.verify) {
          if(!that.$store.state.class_list[0]){
            that.$router.push({ path: "/pages/classroom/classroom/classroomReservation" });
          }
          that.startClassList = that.$store.state.class_list;
          that.endClassList = that.$store.state.class_list;
          that.startClass = that.startClassList[0];
          that.endClass = that.endClassList[0];
        } else {
          //登录过期 => 清除前台存储的登录信息并返回登录页
          let instance = Toast("登录已失效，请重新登录！");
          setTimeout(() => {
            instance.close();
            localStorage.removeItem("tec_token");
            localStorage.removeItem("job_num");
            that.$router.push({ path: "/pages/Login" });
          }, 1000);
        }
      })
      .catch(error => {
        alert("网络错误！");
        console.log(error);
      });
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
        if (this.startClass.value > this.endClass.value) {
          MessageBox("提示", "同一日的结束课程节数不能小于开始课程节数");
          this.picker_err = true;
        } else {
          this.picker_err = false;
        }
      } else if (this.startDate == this.endDate) {
        if (this.startClass.value > this.endClass.value) {
          MessageBox("提示", "同一日的结束课程节数不能小于开始课程节数");
          this.picker_err = true;
        } else {
          this.picker_err = false;
        }
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
      if (
        this.startDate == this.endDate &&
        this.startClass.value > this.endClass.value
      ) {
        MessageBox("提示", "同一日的结束课程节数不能小于开始课程节数");
        this.picker_err = true;
      } else {
        this.picker_err = false;
      }
    },
    //下拉菜单change事件
    classChange() {
      if (this.startDate == this.endDate) {
        if (this.startClass.value > this.endClass.value) {
          MessageBox("提示", "同一日的结束课程节数不能小于开始课程节数");
          this.picker_err = true;
        } else {
          this.picker_err = false;
        }
      }
    },
    //表单提交
    submit: function() {
      let that = this;
      if (that.purpose) {
        if (that.submit_btn) {
          //关闭提交按钮防止重复提交
          that.submit_btn = false;
          if (that.picker_err) {
            MessageBox("提示", "同一日的结束课程节数不能小于开始课程节数");
            that.picker_err = true;
          } else {
            that.picker_err = false;
            //验证通过
            that
              .$http({
                method: "post",
                url: "/Home/Teacher/classroom_submit",
                data: qs.stringify({
                  job_num: localStorage.getItem("job_num"), //工号
                  start_time: that.startDate + "," + that.startClass.id, //开始时间
                  end_time: that.endDate + "," + that.endClass.id, //结束时间
                  people: that.users.title, //使用人数
                  purpose: that.purpose, //教室用途
                  reason: that.remarks, //备注
                  id: that.$store.state.class_id //教室id
                })
              })
              .then(response => {
                if (response.data) {
                  if (response.data.code == 1) {
                    let instance = Toast("提交成功");
                    setTimeout(() => {
                      instance.close();
                      that.$router.push({
                        path: "/pages/classroom/classroom/reservationRecord"
                      });
                    }, 500);
                  } else {
                    //提交失败则重新开放登录按钮
                    that.submit_btn = true;
                    let instance = Toast("提交失败");
                    setTimeout(() => {
                      instance.close();
                    }, 1000);
                  }
                } else {
                  let instance = Toast("网络错误");
                  setTimeout(() => {
                    instance.close();
                    //提交失败则重新开放登录按钮
                    that.submit_btn = true;
                  }, 1000);
                }
              })
              .catch(error => {
                alert("网络错误");
                console.log(error);
                //请求失败重新打开提交按钮
                that.submit_btn = true;
              });
          }
        }
      } else {
        MessageBox("提示", "请输入教室用途！");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.reservationInfo {
  width: 100%;
  position: relative;
  padding-top: 1.75rem;
  .mock-active {
    width: 8rem;
    height: 1.75rem;
    background: #fff;
    position: absolute;
    top: -1.75rem;
    left: 0;
    z-index: 999;
    line-height: 1.75rem;
    text-align: center;
    font-size: 0.65rem;
    color: #cb121b;
    letter-spacing: 0.05rem;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.08rem;
      background: #cb121b;
    }
  }
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
      .purpose {
        width: 100%;
        height: 1.25rem;
        padding: 0 0.2rem;
        border: 1px solid #787878;
        border-radius: 0.2rem;
        font-size: 0.6rem;
        color: #808080;
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
