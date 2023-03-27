<!--
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2023-03-24 20:36:05
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2023-03-27 22:12:50
 * @FilePath: \ol_vue2\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home">
    <!-- template中使用环境变量 -->
    API:
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="imhss">121212</div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      api: process.env.VUE_APP_API,
    };
  },
  mounted() {
    // js代码中使用环境变量
    console.log("BASE_URL: ", process.env.BASE_URL);
    console.log("VUE_APP_API: ", process.env.VUE_APP_API);
  },
  components: {
    HelloWorld,
  },
};
</script>
<style scoped lang="scss">
.imhss {
  color: $text-color;
}
</style>
