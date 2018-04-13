/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-12 10:06:43 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-13 14:27:49
 */

<template>
  <div class="classroomReservation">
    <mt-spinner type="triple-bounce" class="loading" :class="{'loading-show':!page_loading}"></mt-spinner>
    <!-- 教室列表 -->
    <ul class="classroom-list">
      <li v-for="(item,index) in classroom_list" :key="item.id" class="float-left" @click="clooseF(index)" :class="{'cloose-item':item.cloose}">
        <span class="list-item">{{item.name}}</span>
      </li>
    </ul>
    <!-- 提交按钮 -->
    <div class="submit" v-if="show_btn">
      <p class="submit-btn" @click="clooseClassroom()">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</p>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import qs from "qs"; //序列化
export default {
  name: "classroomReservation",
  data() {
    return {
      classroom_list: [],
      page_loading: true,
      show_btn: false, //数据加载出来前隐藏提交按钮
      this_cloose: 0 //当前选中教室
    };
  },
  mounted: function() {
    let that = this;
    //修改页面title
    document.title = "教室预约";
    //判断登录状态
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
              method: "get",
              url: "/Home/Teacher/classroom_submit"
            })
            .then(response => {
              if (response.data) {
                that.show_btn = true;
                that.page_loading = false;
                let res = response.data;
                for (let i = 0; i < res.classroom.length; i++) {
                  res.classroom[i].cloose = false;
                }
                that.classroom_list = res.classroom;
                let sec = res.section;
                //给课时列表加上value用来判断课时大小
                for (let k = 0; k < sec.length; k++) {
                  sec[k].value = k;
                }
                that.$store.commit("change_class_list", sec);
              } else {
                let instance = Toast("暂无数据");
                that.page_loading = false;
                that.show_btn = true;
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
    clooseF: function(idx) {
      for (let i = 0; i < this.classroom_list.length; i++) {
        this.classroom_list[i].cloose = false;
      }
      this.classroom_list[idx].cloose = true;
      this.this_cloose = this.classroom_list[idx].id;
    },
    clooseClassroom: function() {
      for (let i = 0; i < this.classroom_list.length; i++) {
        if (this.classroom_list[i].cloose) {
          //把得到的教师id存入vuex
          this.$store.commit("change_class_id", this.this_cloose);
          //如果有选中的教室，则跳转到下个页面继续预约
          this.$router.push({
            path: "/pages/classroom/classroom/reservationInfo"
          });
          break;
        } else {
          if (i == this.classroom_list.length - 1) {
            MessageBox("提示", "请先选择教室");
          }
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.classroomReservation {
  width: 100%;
  min-height: 50vh;
  padding-bottom: 2rem;
  .loading {
    position: absolute;
    top: 9%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
  .loading-show {
    display: none;
  }
  .classroom-list {
    width: 100%;
    margin-top: 1.75rem;
    padding: 0 1.25rem;
    margin-bottom: 2rem;
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
    }
    > li {
      width: 4.13rem;
      height: 1.25rem;
      overflow: hidden;
      border: 1px solid #9b9b9b;
      border-radius: 0.15rem;
      margin-bottom: 0.55rem;
      margin-right: 0.55rem;
      background: #fff;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .list-item {
        color: #808080;
        display: block;
        line-height: 1.25rem;
        text-align: center;
        font-size: 0.6rem;
      }
    }
    .cloose-item {
      background: #cb121b;
      border-color: #cb121b;
      .list-item {
        color: #fff;
      }
    }
  }
  .submit {
    width: 11.25rem;
    height: 1.5rem;
    margin: 0 auto;
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
