/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-14 11:10:34 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-22 16:43:26
 */



<template>
  <div class="reservationDetails">
    <!-- 消息列表 -->
    <div class="container">
      <!-- date -->
      <div class="date">
        <!-- <span class="float-left">{{reservation_datails.time}}</span>
        <span class="float-left week">{{reservation_datails.week}}</span> -->
      </div>
      <!-- list -->
      <div class="list">
        <div class="list-item">
          <span class="float-left">申请人员：</span>
          <span class="float-left">{{reservation_datails.proposer}}</span>
        </div>
        <div class="list-item">
          <span class="float-left">申请教室：</span>
          <span class="float-left">{{reservation_datails.jiaoshi}}</span>
        </div>
        <div class="list-item">
          <span class="float-left">申请时间：</span>
          <span class="float-left">{{reservation_datails.application_time}}({{reservation_datails.week}})</span>
        </div>
        <div class="list-item reservation-container">
          <span class="float-left">使用时间：</span>
          <div class="reservation float-right" v-if="reservation_datails.start_time">
            <p>{{reservation_datails.start_time}}</p>
            <i class="iconfont icon-zhi"></i>
            <p>{{reservation_datails.end_time}}</p>
          </div>
        </div>
        <div class="list-item">
          <span class="float-left">使用人数：</span>
          <span class="float-left">{{reservation_datails.people}}</span>
        </div>
        <div class="list-item">
          <span class="float-left">教室用途：</span>
          <span class="float-left">{{reservation_datails.purpose}}</span>
        </div>
        <div class="list-item item-excuse">
          <span class="float-left">备注：</span>
          <div v-html="reservation_datails.reason" class="remarks"></div>
        </div>
      </div>
      <!-- type -->
      <i class="iconfont type" :class="reservation_datails.statusClass"></i>
    </div>
    <!-- 底部菜单 -->
    <Menu :linkActive="linkActive"></Menu>
  </div>
</template>
<script>
/* 引入组件 */
import { Toast } from "mint-ui";
import Menu from "@/components/Menu";
import qs from "qs"; //序列化
export default {
  name: "reservationDetails",
  data() {
    return {
      linkActive: 3, //菜单定位
      reservation_datails: {}
    };
  },
  components: {
    Menu
  },
  mounted: function() {
    //修改页面title
    document.title = "预约详情";
    let that = this;
    that
      .$http({
        method: "get",
        url: "/Home/Verify/index?token=" + localStorage.getItem("tec_token")
      })
      .then(response => {
        //登录成功之后获取用户数据
        if (response.data.verify) {
          that
            .$http({
              method: "post",
              url: "/Home/Teacher/classroom_particulars",
              data: qs.stringify({
                job_num: localStorage.getItem("job_num"),
                id: sessionStorage.getItem("tec_reservation_id")
              })
            })
            .then(response => {
              if (response.data) {
                this.reservation_datails = response.data;
                //换算星期
                this.reservation_datails.week = new Date(
                  this.reservation_datails.application_time
                ).getDay();
                if (this.reservation_datails.week == 0) {
                  this.reservation_datails.week = "周日";
                } else if (this.reservation_datails.week == 1) {
                  this.reservation_datails.week = "周一";
                } else if (this.reservation_datails.week == 2) {
                  this.reservation_datails.week = "周二";
                } else if (this.reservation_datails.week == 3) {
                  this.reservation_datails.week = "周三";
                } else if (this.reservation_datails.week == 4) {
                  this.reservation_datails.week = "周四";
                } else if (this.reservation_datails.week == 5) {
                  this.reservation_datails.week = "周五";
                } else if (this.reservation_datails.week == 6) {
                  this.reservation_datails.week = "周六";
                }
                //状态
                if (this.reservation_datails.status == 1) {
                  this.reservation_datails.statusClass = "icon-shenhezhong";
                } else if (this.reservation_datails.status == 2) {
                  this.reservation_datails.statusClass = "icon-shenhetongguo";
                } else if (this.reservation_datails.status == 3) {
                  this.reservation_datails.statusClass = "icon-yibohui";
                }
              } else {
                let instance = Toast("网络错误！");
                setTimeout(() => {
                  instance.close();
                }, 1000);
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
.reservationDetails {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  .container {
    width: 100%;
    padding: 0 1.25rem;
    overflow: hidden;
    position: relative;
    .date {
      margin-top: 1.75rem;
      margin-bottom: 0.7rem;
      font-size: 0.7rem;
      color: #999;
      &::after {
        content: "";
        display: block;
        visibility: hidden;
        clear: both;
      }
      .week {
        margin-left: 0.5rem;
        font-size: 0.65rem;
      }
    }
    .list {
      width: 100%;
      padding: 0 0.55rem;
      margin-bottom: 1.25rem;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.3);
      .list-item {
        width: 100%;
        height: 1.9rem;
        overflow: hidden;
        font-size: 0.6rem;
        color: #666;
        padding-top: 0.51rem;
        padding-bottom: 0.51rem;
        // line-height: 1.9rem;
        border-bottom: 1px solid #e5e5e5;
        &:last-child {
          border-bottom: none;
        }
        .remarks {
          line-height: 1rem;
          margin-top: -0.05rem;
        }
        .reservation {
          width: 9rem;
          margin-top: -0.3rem;
          position: relative;
          > p {
            border-bottom: 1px dashed #ddd;
            padding: 0.3rem 0;
            &:last-child {
              border-bottom: none;
              padding-bottom: 0;
            }
          }
          .icon-zhi {
            position: absolute;
            top: 0.92rem;
            left: -0.8rem;
            font-size: 1rem;
          }
        }
      }
      .reservation-container {
        height: auto;
      }
      .item-excuse {
        height: auto;
      }
    }
    .type {
      position: absolute;
      top: 0.2rem;
      right: 0.5rem;
      font-size: 5rem;
      color: #808080;
    }
    .icon-shenhezhong {
      color: #808080;
    }
    .icon-shenhetongguo {
      color: #86c03f;
    }
    .icon-yibohui {
      color: #cb121b;
      right: -1.2rem;
    }
  }
}
</style>
