<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted: function() {
    //动态设置font-size
    window.onresize = function() {
      var screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      document.getElementsByTagName("html")[0].style.fontSize =
        20 * (screenWidth / 320) + "px";
    };
  }
};
</script>

