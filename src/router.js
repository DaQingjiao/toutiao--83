import Vue from 'vue'
import Router from 'vue-router'
// 引入home/路由级组件
import Home from './views/home'
// 引入login/路由级组件
import Login from './views/login'
import Main from './views/home/main'

// 全局注册 vue-router
Vue.use(Router)

export default new Router({
  routes: [
    // 一级路由
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [{
        path: '',
        component: Main
      },
      {
        path: 'comment',
        component: () => import('./views/comment')
      }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
