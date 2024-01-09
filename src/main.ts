import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
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

app.use(ElementPlus);
app.use(router);

app.mount("#app");
