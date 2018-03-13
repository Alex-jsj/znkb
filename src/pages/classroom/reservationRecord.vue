/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-13 19:10:23
 */

<template>
  <div class="reservationRecord">
    <!-- table -->
    <div class="title">
      <span class="float-left width-1">申请时间</span>
      <span class="float-left width-2">使用时间</span>
      <span class="float-left width-3">教室</span>
      <span class="float-left width-4">状态</span>
      <!-- <span class="float-left width-5">操作</span> -->
    </div>
    <div class="list">
      <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
        <li v-for="(item,index) in reservation_record" :key="index">
          <div class="width-1 float-left list-item">{{item.applicationTime}}</div>
          <div class="width-2 float-left list-item item-2">
            <p class="record-date">{{item.useDateStart}} - {{item.useDateEnd}}</p>
            <p class="record-date">{{item.useClassStart}} - {{item.useClassEnd}}</p>
          </div>
          <div class="width-3 float-left list-item">{{item.classroom}}</div>
          <div class="width-4 float-left list-item" :class="item.statusClass">{{item.status}}</div>
          <!-- <div class="width-5 float-left list-item">
            <router-link to="/pages/message/messageInfo" class="info">查看</router-link>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//引入loading组件
import { Indicator } from "mint-ui";
export default {
  name: "reservationRecord",
  data() {
    return {
      reservation_record: [],
      loading: false
    };
  },
  components: {},
  mounted: function() {
    //修改页面title
    document.title = "预约记录";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      this.$http
        .get("./static/mock/reservationRecord.json")
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].statusId == 1) {
              response.data[i].statusClass = "shenghe";
            } else if (response.data[i].statusId == 2) {
              response.data[i].statusClass = "tongguo";
            } else if (response.data[i].statusId == 3) {
              response.data[i].statusClass = "bohui";
            }
          }
          this.reservation_record = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    loadMore() {
      // 防止多次加载
      if (this.loading) {
        return false;
      }
      this.loading = true;
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$http
        .get("./static/mock/reservationRecord.json")
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].statusId == 1) {
              response.data[i].statusClass = "shenghe";
            } else if (response.data[i].statusId == 2) {
              response.data[i].statusClass = "tongguo";
            } else if (response.data[i].statusId == 3) {
              response.data[i].statusClass = "bohui";
            }
            this.reservation_record.push(response.data[i]);
          }
          this.loading = false;
          Indicator.close();
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
.reservationRecord {
  width: 100%;
  padding-bottom: 2rem;
  .title {
    width: 100%;
    height: 1.75rem;
    background: #808080;
    > span {
      text-align: center;
      line-height: 1.75rem;
      font-size: 0.6rem;
      color: #fff;
      letter-spacing: 0.1rem;
      border-right: 1px solid #b4b4b4;
      &:last-of-type {
        border: none;
      }
    }
  }
  .list {
    border-bottom: 1px solid #b4b4b4;
    > li {
      height: 3.5rem;
      background: #f2f2f2;
      position: relative;
      color: #808080;
      &:nth-child(2n) {
        background: #fff;
      }
      .list-item {
        height: 100%;
        color: #808080;
        font-size: 0.6rem;
        line-height: 3.5rem;
        text-align: center;
        white-space: nowrap;
        border-right: 1px solid #b4b4b4;
        &:last-of-type {
          border: none;
        }
        .info {
          color: #808080;
        }
      }
      .item-2 {
        .record-date {
          white-space: nowrap;
          line-height: 1.75rem;
          font-size: 0.5rem;
        }
      }
      .shenghe {
        color: #808080;
      }
      .tongguo {
        color: #86c03f;
      }
      .bohui {
        color: #cb121b;
      }
    }
  }
  .width-1 {
    width: 4rem;
  }
  .width-2 {
    width: 5.5rem;
  }
  .width-3 {
    width: 3.5rem;
  }
  .width-4 {
    width: 2.95rem;
  }
  /* .width-5 {
    width: 2.22rem;
  } */
}
</style>
