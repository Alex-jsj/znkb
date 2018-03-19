/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-05 16:43:42 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-09 15:39:28
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
      myTimeTable: [],
      filterList: [],
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
          that.myTimeTable = my_timeTable.data;
          that.filterList = filter_list.data;
          that.week = that.filterList.week;
          that.class_filter = that.filterList.class;
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
}
</style>
