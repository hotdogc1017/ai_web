import Vue from 'vue'
import App from './App.vue'
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';
Vue.config.productionTip = false
Vue.use(ElementUI);

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  // document.title = `${to.meta.title} | admin`;
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
