import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// 定义路由
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // 路由级别的代码分割
    // 当访问该路由时，会生成一个单独的块（about.[hash].js）
    // 该块在需要时进行懒加载。
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

// 创建路由实例
const router = new VueRouter({
  routes,
});

export default router;
