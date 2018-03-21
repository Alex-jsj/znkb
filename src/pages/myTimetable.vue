/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-05 16:43:42 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-20 18:33:06
 */

<template>
  <div class="myTimetable">
    <!-- 筛选 -->
    <div class="filter">
      <!-- 年度学期 -->
      <div class="float-left width-1">
        <span>{{filterList.semester}}</span>
      </div>
      <div class="float-left width-2">
        <select class="week-picker" v-model="week" @change="weekChange()">
          <option v-for="item in filterList.weekList" :key="item.id" :value="item">{{item.title}}</option>
        </select>
        <span class="float-left week-simulation">{{week.title}}</span>
        <i class="float-left iconfont icon-down"></i>
      </div>
      <div class="float-left width-3">
        <select class="class-picker" v-model="class_filter" @change="classChange()">
          <option v-for="item in filterList.classList" :key="item.id" :value="item">{{item.title}}</option>
        </select>
        <span class="float-left class-simulation">{{class_filter.title}}</span>
        <i class="float-left iconfont icon-down"></i>
      </div>
    </div>
    <!-- 课表 -->
    <div class="timetable">
      <div class="header"></div>
      <div class="container">
        <div class="overflow-container">
          <ul class="list-item float-left" v-for="(list,index) in myTimeTableList" :key="list.id">
            <li class="item item-header">
              <p class="week">{{list.date[0]}}</p>
              <p class="week-date">{{list.date[1]}}</p>
            </li>
            <li class="item" :class="{'bg':list.first[0]}">
              <p class="first">{{list.first[0]}}</p>
              <p class="second">{{list.first[1]}}</p>
              <p>{{list.first[2]}}</p>
            </li>
            <li class="item" :class="{'bg':list.second[0]}">
              <p class="first">{{list.second[0]}}</p>
              <p class="second">{{list.second[1]}}</p>
              <p>{{list.second[2]}}</p>
            </li>
            <li class="item" :class="{'bg':list.thirdly[0]}">
              <p class="first">{{list.thirdly[0]}}</p>
              <p class="second">{{list.thirdly[1]}}</p>
              <p>{{list.thirdly[2]}}</p>
            </li>
            <li class="item" :class="{'bg':list.fourthly[0]}">
              <p class="first">{{list.fourthly[0]}}</p>
              <p class="second">{{list.fourthly[1]}}</p>
              <p>{{list.fourthly[2]}}</p>
            </li>
            <li class="item" :class="{'bg':list.fifth[0]}">
              <p class="first">{{list.fifth[0]}}</p>
              <p class="second">{{list.fifth[1]}}</p>
              <p>{{list.fifth[2]}}</p>
            </li>
            <li class="item" :class="{'bg':list.sixth[0]}">
              <p class="first">{{list.sixth[0]}}</p>
              <p class="second">{{list.sixth[1]}}</p>
              <p>{{list.sixth[2]}}</p>
            </li>
            <li class="item" :class="{'bg':list.seventh[0]}">
              <p class="first">{{list.seventh[0]}}</p>
              <p class="second">{{list.seventh[1]}}</p>
              <p>{{list.seventh[2]}}</p>
            </li>
            <li class="item" :class="{'bg':list.eighth[0]}">
              <p class="first">{{list.eighth[0]}}</p>
              <p class="second">{{list.eighth[1]}}</p>
              <p>{{list.eighth[2]}}</p>
            </li>
            <li class="item" :class="{'bg':list.ninth[0]}">
              <p class="first">{{list.ninth[0]}}</p>
              <p class="second">{{list.ninth[1]}}</p>
              <p>{{list.ninth[2]}}</p>
            </li>
            <li class="item" :class="{'bg':list.tenth[0]}">
              <p class="first">{{list.tenth[0]}}</p>
              <p class="second">{{list.tenth[1]}}</p>
              <p>{{list.tenth[2]}}</p>
            </li>
          </ul>
        </div>
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
  name: "myTimetable",
  data() {
    return {
      linkActive: 1,
      myTimeTableList: [],
      filterList: [],
      //time_table: [[], [], [], [], [], [], []],
      //周次
      week: "",
      //课程
      class_filter: ""
    };
  },
  components: {
    Menu
  },
  mounted: function() {
    //修改页面title
    document.title = "我的课表";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
      let that = this;
      //获取课表信息
      function myTimeTableList() {
        return that.$http.get("./static/mock/myTimetable.json");
      }
      //获取筛选数据
      function filterList() {
        return that.$http.get("./static/mock/filterList.json");
      }

      that.$http.all([myTimeTableList(), filterList()]).then(
        that.$http.spread(function(my_timeTable, filter_list) {
          // 两个请求现在都执行完成
          that.myTimeTableList = my_timeTable.data;
          that.filterList = filter_list.data;
          that.week = that.filterList.week;
          that.class_filter = that.filterList.class;
          /* for (let i = 0; i < my_timeTable.data.length; i++) {
            if (i > 0) {
              that.myTimeTableList[i].first.push(my_timeTable.data[0].first[1]);
              that.myTimeTableList[i].second.push(
                my_timeTable.data[0].second[1]
              );
              that.myTimeTableList[i].thirdly.push(
                my_timeTable.data[0].thirdly[1]
              );
              that.myTimeTableList[i].fourthly.push(
                my_timeTable.data[0].fourthly[1]
              );
              that.myTimeTableList[i].fifth.push(my_timeTable.data[0].fifth[1]);
              that.myTimeTableList[i].sixth.push(my_timeTable.data[0].sixth[1]);
              that.myTimeTableList[i].seventh.push(
                my_timeTable.data[0].seventh[1]
              );
              that.myTimeTableList[i].eighth.push(
                my_timeTable.data[0].eighth[1]
              );
              that.myTimeTableList[i].ninth.push(my_timeTable.data[0].ninth[1]);
              that.myTimeTableList[i].tenth.push(my_timeTable.data[0].tenth[1]);
            }
          }
          //周一
          that.time_table[0].push(that.myTimeTableList[1].first);
          that.time_table[0].push(that.myTimeTableList[1].second);
          that.time_table[0].push(that.myTimeTableList[1].thirdly);
          that.time_table[0].push(that.myTimeTableList[1].fourthly);
          that.time_table[0].push(that.myTimeTableList[1].fifth);
          that.time_table[0].push(that.myTimeTableList[1].sixth);
          that.time_table[0].push(that.myTimeTableList[1].seventh);
          that.time_table[0].push(that.myTimeTableList[1].eighth);
          that.time_table[0].push(that.myTimeTableList[1].ninth);
          that.time_table[0].push(that.myTimeTableList[1].tenth);
          //周二
          that.time_table[1].push(that.myTimeTableList[2].first);
          that.time_table[1].push(that.myTimeTableList[2].second);
          that.time_table[1].push(that.myTimeTableList[2].thirdly);
          that.time_table[1].push(that.myTimeTableList[2].fourthly);
          that.time_table[1].push(that.myTimeTableList[2].fifth);
          that.time_table[1].push(that.myTimeTableList[2].sixth);
          that.time_table[1].push(that.myTimeTableList[2].seventh);
          that.time_table[1].push(that.myTimeTableList[2].eighth);
          that.time_table[1].push(that.myTimeTableList[2].ninth);
          that.time_table[1].push(that.myTimeTableList[2].tenth);
          //周二
          that.time_table[2].push(that.myTimeTableList[3].first);
          that.time_table[2].push(that.myTimeTableList[3].second);
          that.time_table[2].push(that.myTimeTableList[3].thirdly);
          that.time_table[2].push(that.myTimeTableList[3].fourthly);
          that.time_table[2].push(that.myTimeTableList[3].fifth);
          that.time_table[2].push(that.myTimeTableList[3].sixth);
          that.time_table[2].push(that.myTimeTableList[3].seventh);
          that.time_table[2].push(that.myTimeTableList[3].eighth);
          that.time_table[2].push(that.myTimeTableList[3].ninth);
          that.time_table[2].push(that.myTimeTableList[3].tenth);
          //周二
          that.time_table[3].push(that.myTimeTableList[4].first);
          that.time_table[3].push(that.myTimeTableList[4].second);
          that.time_table[3].push(that.myTimeTableList[4].thirdly);
          that.time_table[3].push(that.myTimeTableList[4].fourthly);
          that.time_table[3].push(that.myTimeTableList[4].fifth);
          that.time_table[3].push(that.myTimeTableList[4].sixth);
          that.time_table[3].push(that.myTimeTableList[4].seventh);
          that.time_table[3].push(that.myTimeTableList[4].eighth);
          that.time_table[3].push(that.myTimeTableList[4].ninth);
          that.time_table[3].push(that.myTimeTableList[4].tenth);
          //周二
          that.time_table[4].push(that.myTimeTableList[5].first);
          that.time_table[4].push(that.myTimeTableList[5].second);
          that.time_table[4].push(that.myTimeTableList[5].thirdly);
          that.time_table[4].push(that.myTimeTableList[5].fourthly);
          that.time_table[4].push(that.myTimeTableList[5].fifth);
          that.time_table[4].push(that.myTimeTableList[5].sixth);
          that.time_table[4].push(that.myTimeTableList[5].seventh);
          that.time_table[4].push(that.myTimeTableList[5].eighth);
          that.time_table[4].push(that.myTimeTableList[5].ninth);
          that.time_table[4].push(that.myTimeTableList[5].tenth);
          //周二
          that.time_table[5].push(that.myTimeTableList[6].first);
          that.time_table[5].push(that.myTimeTableList[6].second);
          that.time_table[5].push(that.myTimeTableList[6].thirdly);
          that.time_table[5].push(that.myTimeTableList[6].fourthly);
          that.time_table[5].push(that.myTimeTableList[6].fifth);
          that.time_table[5].push(that.myTimeTableList[6].sixth);
          that.time_table[5].push(that.myTimeTableList[6].seventh);
          that.time_table[5].push(that.myTimeTableList[6].eighth);
          that.time_table[5].push(that.myTimeTableList[6].ninth);
          that.time_table[5].push(that.myTimeTableList[6].tenth);
          //周日
          that.time_table[6].push(that.myTimeTableList[7].first);
          that.time_table[6].push(that.myTimeTableList[7].second);
          that.time_table[6].push(that.myTimeTableList[7].thirdly);
          that.time_table[6].push(that.myTimeTableList[7].fourthly);
          that.time_table[6].push(that.myTimeTableList[7].fifth);
          that.time_table[6].push(that.myTimeTableList[7].sixth);
          that.time_table[6].push(that.myTimeTableList[7].seventh);
          that.time_table[6].push(that.myTimeTableList[7].eighth);
          that.time_table[6].push(that.myTimeTableList[7].ninth);
          that.time_table[6].push(that.myTimeTableList[7].tenth);
          for (let k = 0; k < that.time_table[0].length; k++) {
            console.log(
              that.time_table[0][k][1] == that.time_table[0][k++][1] &&
                that.time_table[0][k][1]
            ); 
             if (
              that.time_table[0][k][1] == that.time_table[0][k++][1] &&
              that.time_table[0][k][1]
            ) {
              console.log(that.time_table[0][k]);
            } 
          }*/
        })
      );
    }
  },
  methods: {
    weekChange() {},
    classChange() {},
    //筛选课表ajax
    timetable_filter() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.myTimetable {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  .filter {
    width: 100%;
    height: 1.75rem;
    background: #808080;
    overflow: hidden;
    position: relative;
    z-index: 999;
    .width-1 {
      width: 7.25rem;
      height: 100%;
      text-align: center;
      span {
        color: #fff;
        font-size: 0.6rem;
        line-height: 1.75rem;
      }
    }
    .width-2 {
      width: 3.75rem;
      height: 100%;
      position: relative;
      .week-picker {
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      .week-simulation {
        color: #fff;
        font-size: 0.6rem;
        white-space: nowrap;
        line-height: 1.75rem;
        margin-left: 0.5rem;
      }
      .icon-down {
        color: #fff;
        line-height: 1.75rem;
        margin-left: 0.2rem;
      }
    }
    .width-3 {
      width: 5rem;
      height: 100%;
      position: relative;
      .class-picker {
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
      .class-simulation {
        max-width: 3.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
        font-size: 0.6rem;
        white-space: nowrap;
        line-height: 1.75rem;
        margin-left: 0.5rem;
      }
      .icon-down {
        line-height: 1.75rem;
        margin-left: 0.2rem;
        color: #fff;
      }
    }
  }
  .timetable {
    width: 100%;
    background: #fff;
    .header {
      width: 100%;
      height: 2.25rem;
      box-shadow: 0 0.05rem 0.3rem rgba(0, 0, 0, 0.2);
      position: relative;
      z-index: 998;
    }
    .container {
      width: 100%;
      background: #fff;
      margin-top: -2.25rem;
      overflow: hidden;
      .overflow-container {
        width: 21.6rem;
        overflow-x: scroll;
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          clear: both;
        }
        .list-item {
          width: 2.8rem;
          &:first-child {
            width: 2rem;
            background: #f2f2f2;
            .item {
              text-align: center;
              padding: 0;
              font-size: 0.6rem;
              .first {
                color: #b3b3b3;
                font-size: 0.55rem;
                margin-top: 1.1rem;
              }
              .second {
                margin-top: 0.2rem;
              }
            }
            .bg {
              color: #808080;
              background: #f2f2f2;
            }
          }
          &:nth-child(3) {
            .bg {
              background: #ffb8c4;
            }
          }
          &:nth-child(4) {
            .bg {
              background: #808080;
            }
          }
          &:nth-child(6) {
            .bg {
              background: #ffb8c4;
            }
          }
          .item {
            width: 100%;
            height: 3.75rem;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            font-size: 0.5rem;
            padding: 0.2rem;
            overflow: hidden;
            color: #808080;
            &:first-child {
              height: 2.25rem;
              border-bottom: 0 solid #ddd;
              border-right: 0 solid #ddd;
              background: #fff;
              padding: 0;
              font-size: 0.6rem;
            }
            &:last-child {
              border-bottom: 0 solid #ddd;
            }
            .week {
              margin-top: 0.4rem;
            }
            .week-date {
              font-size: 0.45rem;
              margin-top: 0.1rem;
              color: #bebebe;
            }
          }
          .item-header {
            text-align: center;
          }
          .bg {
            color: #fff;
            background: #b3b3b3;
          }
        }
      }
    }
  }
}
</style>
