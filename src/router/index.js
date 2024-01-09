import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/",
      component: () => import("@/pages/index.vue"),
      meta: { title: "自述文件" },
      children: [
        {
          path: "/home",
          component: () => import("@/pages/home.vue"),
          meta: { title: "首页" },
        },
        {
          path: "/typeChatIndex",
          component: () => import("@/pages/typePage/typeChatIndex.vue"),
          meta: { title: "功能对话" },
        },
        {
          path: "/chatIndex",
          component: () => import("@/pages/chat/chatIndex.vue"),
          meta: { title: "AI对话" },
        },
        {
          path: "/chat",
          component: () => import("@/pages/chat/index.vue"),
        },
        {
          path: "/gptIndex",
          component: () => import("@/pages/chat/chatGptIndex.vue"),
          meta: { title: "原生GPT4.0" },
        },
        {
          path: "/paintIndex",
          component: () => import("@/pages/draw/painting.vue"),
          meta: { title: "智能做图" },
        },
        {
          path: "/xhsIndex",
          component: () => import("@/pages/typePage/index.vue"),
          meta: { title: "小红书文案" },
        },
        {
          path: "/dyIndex",
          component: () => import("@/pages/typePage/index.vue"),
          meta: { title: "抖音文案" },
        },
        {
          path: "/waIndex",
          component: () => import("@/pages/typePage/index.vue"),
          meta: { title: "独立文案站" },
        },
        {
          path: "/sjIndex",
          component: () => import("@/pages/typePage/index.vue"),
          meta: { title: "社交文案" },
        },
        {
          path: "/kjdsIndex",
          component: () => import("@/pages/typePage/index.vue"),
          meta: { title: "跨境电商文案" },
        },
        {
          path: "/bgIndex",
          component: () => import("@/pages/typePage/index.vue"),
          meta: { title: "办公写作" },
        },
        {
          path: "/user",
          component: () => import("@/pages/user.vue"),
          meta: { title: "我的" },
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/pages/login.vue"),
      meta: { title: "登录" },
    },
    {
      path: "*",
      redirect: "/404",
    },
  ],
});

export default router;
