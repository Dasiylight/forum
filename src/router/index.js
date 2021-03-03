import Vue from 'vue'
import VueRouter from 'vue-router'

import logIn from '../components/logIn'
import Register from '../components/Register'
import forum from '../components/forum'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect:'/logIn'
  },
  {
    path: '/logIn',
    component : logIn
  },
  {
    path: '/Register',
    component : Register
  },
  {
    path: '/forum',
    component:  forum
  }
]
  //创建路由对象


const router = new VueRouter({
  //配置路由和组件之间的关系
  routes,
  model: 'history',
  linkActiveClass: 'active'
})

export default router
