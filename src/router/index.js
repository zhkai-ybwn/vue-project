import { createRouter, createWebHashHistory } from "vue-router";
import virtualScrollTreeView from "../views/virtual-scroll-tree/index.vue";
import virtualScrollListView from "../views/virtual-scroll-list/index.vue";
import lineChart from "../views/charts/line.vue";

const routes = [
  { path: "/", redirect: "/tree" },
  { path: "/tree", name: "tree", component: virtualScrollTreeView },
  { path: "/list", name: "list", component: virtualScrollListView },
  { path: "/tip", name: "tip", component: virtualScrollTreeView },
  { path: "/echarts", name: "echarts", component: lineChart },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
export default router;
