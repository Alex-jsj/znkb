/*
 * @Author: Alex chenzeyongjsj@163.com 
 * @Date: 2018-03-13 17:52:49 
 * @Last Modified by: Alex chenzeyongjsj@163.com
 * @Last Modified time: 2018-03-13 18:06:01
 */


<template>
  <ul class="title-switch">
    <li v-for="(item,index) in switchList" :key="item.id" class="float-left" @click="showItem(index)">
      <router-link :to="item.url">
        <p class="float-left switch-text">{{item.title}}</p>
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: "Menu",
  props: {
    switchList: Array
  },
  data() {
    return {};
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
  .router-link-exact-active.router-link-active {
    .switch-text {
      color: #cb121b;
      &::after {
        display: block;
      }
    }
  }
}
</style>
