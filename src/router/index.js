import Vue from "vue";
import VueRouter from "vue-router";
// 一级目录
const loadView = (view) => () => import(`@/views/${view}/index.vue`);
// 二级目录 包含要进入的页面路径
const levelView = (view, level, name) => () => import(`@/views/${view}/${level}/${name}/index.vue`);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "我的主页",
    component: loadView('PageLu')
  },
  {
    path: "/pageLi",
    name: "她的主页",
    component: loadView('PageLi')
  },
  {
    path: "/jiuGePrize",
    name: "九宫格抽奖",
    component: loadView('JiuGePrize')
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
