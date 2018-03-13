/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-13 17:47:54
 */

<template>
  <div class="classroom">
    <!-- title switch -->
    <ul class="title-switch">
      <li v-for="(item,index) in switchList" :key="item.id" class="float-left" @click="showItem(index)" :class="{'show':item.show}">
        <router-link :to="'/pages/classroom/classroom/'+item.url">
          <p class="float-left switch-text">{{item.title}}</p>
        </router-link>
      </li>
    </ul>
    <!-- view -->
    <router-view></router-view>
    <!-- 底部菜单 -->
    <Menu></Menu>
  </div>
</template>
<script>
/* 引入组件 */
import Menu from "@/components/Menu";
export default {
  name: "classroom",
  data() {
    return {
      switchList: [
        {
          title: "教室预约",
          url: "classroomReservation",
          show: true
        },
        {
          title: "预约记录",
          url: "reservationRecord",
          show: false
        }
      ]
    };
  },
  components: {
    Menu
  },
  mounted: function() {
    //修改页面title
    document.title = "教室预约";
    //判断登录状态
    if (!localStorage.getItem("userToken")) {
      //跳转到登录页
      this.$router.push({ path: "/pages/Login" });
    } else {
    }
  },
  methods: {
    showItem: function(idx) {
      for (let i = 0; i < this.switchList.length; i++) {
        this.switchList[i].show = false;
      }
      this.switchList[idx].show = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.classroom {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 2rem;
  background: #f2f2f2;
  .title-switch {
    width: 100%;
    height: 1.75rem;
    background: #fff;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    > li {
      width: 50%;
      height: 100%;
    }
    .switch-text {
      display: block;
      width: 8rem;
      line-height: 1.75rem;
      text-align: center;
      font-size: 0.65rem;
      color: #808080;
      letter-spacing: 0.05rem;
      position: relative;
      &::after {
        content: "";
        display: none;
        width: 100%;
        height: 0.08rem;
        background: #cb121b;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    .show {
      .switch-text {
        color: #cb121b;
        &::after {
          display: block;
        }
      }
    }
  }
}
</style>
