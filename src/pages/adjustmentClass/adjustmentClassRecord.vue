/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-19 08:34:45
 */

<template>
  <div class="adjustmentClassRecord">
    <!-- table -->
    <div class="title">
      <span class="float-left width-1">发起方</span>
      <span class="float-left width-2">时间</span>
      <span class="float-left width-3">状态</span>
      <span class="float-left width-5">操作</span>
    </div>
    <div>
      <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
        <li v-for="(item,index) in andClass_record" :key="index">
          <div class="width-1 float-left list-item">{{item.Initiator}}</div>
          <div class="width-2 float-left list-item">
            <p class="record-date">{{item.date}}</p>
          </div>
          <div class="width-3 float-left list-item" :class="item.statusClass">{{item.status}}</div>
          <div class="width-5 float-left list-item" @click="intoInfo()">
            <span class="info">查看</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//引入loading组件
import { Indicator } from "mint-ui";
export default {
  name: "adjustmentClassRecord",
  data() {
    return {
      andClass_record: [],
      loading: false
    };
  },
  components: {},
  mounted: function() {
    //修改页面title
    document.title = "调课记录";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      this.$http
        .get("./static/mock/andClassRecord.json")
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
          this.andClass_record = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  methods: {
    //进入详情页
    intoInfo() {
      this.$router.push({ path: "/pages/adjustmentClass/adjustmentClassInfo" });
    },
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
        .get("./static/mock/andClassRecord.json")
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].statusId == 1) {
              response.data[i].statusClass = "shenghe";
            } else if (response.data[i].statusId == 2) {
              response.data[i].statusClass = "tongguo";
            } else if (response.data[i].statusId == 3) {
              response.data[i].statusClass = "bohui";
            }
            this.andClass_record.push(response.data[i]);
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
.adjustmentClassRecord {
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
  .width-5 {
    width: 2.95rem;
  }
}
</style>
