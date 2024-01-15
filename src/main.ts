import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "./assets/css/global.css";
import "./style.css";

// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem("token");
//   next();
// });
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount("#app");
