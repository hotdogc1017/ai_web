// src/router/index.js
import Vue from 'vue'
import VueRouter  from 'vue-router'
Vue.use(VueRouter)

//添加以下代码
// 缓存原型上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onComplete, onAbort) {
    // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
    if (onComplete===undefined && onAbort===undefined) {
        return originPush.call(this, location, onComplete, onAbort).catch(() => {})
    } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
        originPush.call(this, location, onComplete, onAbort)
    }
}
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
    if (onComplete===undefined && onAbort===undefined) {
        return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
    } else {
        originReplace.call(this, location, onComplete, onAbort)
    }
}

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import('@/pages/index.vue'),
            meta: { title: '首页' }
        },
        {
            path: '/user',
            component: () => import('@/pages/user.vue'),
            meta: { title: '我的' }
        },
        {
            path: '/chatIndex',
            component: () => import('@/pages/chatIndex.vue'),
            meta: { title: 'AI对话' }
        },
        {
            path: '/gptIndex',
            component: () => import('@/pages/chatIndex.vue'),
            meta: { title: '原生GPT4.0' }
        },
        {
            path: '/paintIndex',
            component: () => import('@/pages/painting.vue'),
            meta: { title: '智能做图' }
        },
        {
            path: '/xhsIndex',
            component: () => import('@/pages/painting.vue'),
            meta: { title: '小红书文案' }
        },
        {
            path: '/dyIndex',
            component: () => import('@/pages/painting.vue'),
            meta: { title: '抖音文案' }
        },
        {
            path: '/waIndex',
            component: () => import('@/pages/painting.vue'),
            meta: { title: '独立文案站' }
        },
        {
            path: '/sjIndex',
            component: () => import('@/pages/painting.vue'),
            meta: { title: '社交文案' }
        },
        {
            path: '/kjdsIndex',
            component: () => import('@/pages/painting.vue'),
            meta: { title: '跨境电商文案' }
        },
        {
            path: '/bgIndex',
            component: () => import('@/pages/painting.vue'),
            meta: { title: '办公写作' }
        },
        {
            path: '/login',
            component: () => import('@/pages/login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
