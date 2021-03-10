import Vue from 'vue'
import VueRouter from 'vue-router'

import logIn from '../components/logIn'
import Register from '../components/Register'
import forum from '../components/forum'
import cookies from '../cookies'
import el from 'element-ui/src/locale/lang/el'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect:'/logIn'
  },
  {
    path: '/logIn',
    name: 'logIn',
    component : logIn
  },
  {
    path: '/Register',
    component : Register
  },
  {
    path: '/forum',
    component:  forum,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },

    //判断是否登录
  }
]
  //创建路由对象

const router = new VueRouter({
  //配置路由和组件之间的关系
  routes,
  mode: 'history',
  linkActiveClass: 'active'
})

//导航守卫，在进入留言板前判断登录状态
router.beforeEach((to, from, next) => {
  if(to.path === '/forum'){
    //判断登录状态
    // let token = sessionStorage.getItem('Authorization');
    // if (token === null || token === ''){
    //   next('/logIn')
    // }else {
    //   next();
    // }
    //如果需要登录权限
    if (to.meta.requireAuth){
      if (cookies.getCookie("username")){
        next();
      }
      else{
        alert("请先登录");
        next('/logIn');
      }
    }
  }
  else {
    next();
  }
});

export default router
