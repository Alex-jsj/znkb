/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: alex (chenzeyongjsj@163.com)
 * @Last Modified time: 2018-03-19 06:29:17
 */

<template>
  <div class="reservationRecord">
    <mt-spinner type="triple-bounce" class="loading" :class="{'loading-show':!page_loading}"></mt-spinner>
    <!-- table -->
    <div class="title">
      <span class="float-left width-1">申请时间</span>
      <span class="float-left width-2">使用时间</span>
      <span class="float-left width-3">教室</span>
      <span class="float-left width-4">状态</span>
      <span class="float-left width-5">操作</span>
    </div>
    <div>
      <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="0">
        <li v-for="(item,index) in reservation_record" :key="index">
          <div class="width-1 float-left list-item">{{item.application_time}}</div>
          <div class="width-2 float-left list-item item-2">
            <p class="record-date">{{item.start_time}} - {{item.end_time}}</p>
            <p class="record-date">{{item.start}} - {{item.end}}</p>
          </div>
          <div class="width-3 float-left list-item">{{item.classroom}}</div>
          <div class="width-4 float-left list-item" :class="item.statusClass">{{item.status_text}}</div>
          <div class="width-5 float-left list-item">
            <span class="info" @click="lookInfo(item.application_num)">查看</span>
          </div>
        </li>
      </ul>
      <p class="to-bottom" :class="{'bottom-show':bottom}">已经到底啦</p>
    </div>
  </div>
</template>
<script>
//引入loading组件
import { Indicator, Toast } from "mint-ui";
import qs from "qs"; //序列化
export default {
  name: "reservationRecord",
  data() {
    return {
      reservation_record: [],
      loading: false,
      page_loading: true,
      bottom: false, //已加载所有数据
      currentPage: 1 //分页页码
    };
  },
  mounted: function() {
    let that = this;
    //修改页面title
    document.title = "预约记录";
    //判断登录状态
    that
      .$http({
        method: "get",
        url: "/Home/Verify/index?token=" + localStorage.getItem("tec_token")
      })
      .then(response => {
        if (response.data.verify) {
          that
            .$http({
              method: "post",
              url: "/Home/Teacher/classroom",
              data: qs.stringify({
                job_num: localStorage.getItem("job_num"),
                currentPage: this.currentPage,
                pageSize: 7
              })
            })
            .then(response => {
              if (response.data) {
                for (let i = 0; i < response.data.length; i++) {
                  if (response.data[i].status == 1) {
                    response.data[i].statusClass = "shenghe";
                    response.data[i].status_text = "审核中";
                  } else if (response.data[i].status == 2) {
                    response.data[i].statusClass = "tongguo";
                    response.data[i].status_text = "通过";
                  } else if (response.data[i].status == 3) {
                    response.data[i].statusClass = "bohui";
                    response.data[i].status_text = "驳回";
                  }
                }
                this.page_loading = false;
                //打开下拉加载
                that.loading = false;
                this.reservation_record = response.data;
              } else {
                let instance = Toast("暂无数据");
                this.page_loading = false;
              }
            })
            .catch(error => {
              alert("网络错误");
            });
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
    loadMore() {
      let that = this;
      // 防止多次加载
      if (this.loading) {
        return false;
      }
      this.loading = true;
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
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
                url: "/Home/Teacher/classroom",
                data: qs.stringify({
                  job_num: localStorage.getItem("job_num"),
                  currentPage: that.currentPage + 1,
                  pageSize: 7
                })
              })
              .then(response => {
                if (response.data) {
                  for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].status == 1) {
                      response.data[i].statusClass = "shenghe";
                      response.data[i].status_text = "审核中";
                    } else if (response.data[i].status == 2) {
                      response.data[i].statusClass = "tongguo";
                      response.data[i].status_text = "通过";
                    } else if (response.data[i].status == 3) {
                      response.data[i].statusClass = "bohui";
                      response.data[i].status_text = "驳回";
                    }
                    that.reservation_record.push(response.data[i]);
                  }
                  that.currentPage++;
                  that.loading = false;
                  Indicator.close();
                } else {
                  that.loading = true;
                  Indicator.close();
                  that.bottom = true;
                }
              })
              .catch(error => {
                alert("网络错误！");
                console.log(error);
              });
          } else {
            alert("登录已失效，请重新登录！");
            localStorage.removeItem("tec_token");
            localStorage.removeItem("job_num");
            this.$router.push({ path: "/pages/Login" });
          }
        })
        .catch(error => {
          alert("网络错误！");
          console.log(error);
        });
    },
    lookInfo(uid) {
      //存储内页id
      sessionStorage.setItem("tec_reservation_id", uid);
      this.$router.push({ path: "/pages/classroom/reservationDetails" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.reservationRecord {
  width: 100%;
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
  .loading-show {
    display: none;
  }
  .to-bottom {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    color: #bbb;
    font-size: 0.5rem;
    text-align: center;
    display: none;
  }
  .bottom-show {
    display: block;
  }
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
    width: 4.5rem;
  }
  .width-3 {
    width: 2.5rem;
  }
  .width-4 {
    width: 2.8rem;
  }
  .width-5 {
    width: 2.15rem;
  }
}
</style>
