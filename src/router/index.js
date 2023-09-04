import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/pages/index.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/user',
            component: () => import('@/pages/user.vue'),
            meta: { title: '我的' }
        },
        {
            path: '/chatIndex',
            component: () => import('@/pages/chatIndex.vue'),
            meta: { title: '聊天' }
        },
        {
            path: '/paintIndex',
            component: () => import('@/pages/painting.vue'),
            meta: { title: '绘画' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
