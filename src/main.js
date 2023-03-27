/*
 * @Author: WuDaoTingFeng.yzh 2683849644@qq.com
 * @Date: 2023-03-24 22:50:19
 * @LastEditors: WuDaoTingFeng.yzh 2683849644@qq.com
 * @LastEditTime: 2023-03-27 21:39:11
 * @FilePath: \ol_vue2\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/icons";
// 添加IE兼容
import "core-js/stable";
import "regenerator-runtime/runtime";
import _ from "lodash";
import { variableJudge } from "./untils/PublicMethod";
// 引入elemntui
import "./untils/element";

Vue.config.productionTip = false;
Vue.prototype.$vj = variableJudge; // 解决template不能使用链式调用的问题
Vue.prototype.$_ = _; // 全局挂载loadsh
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
