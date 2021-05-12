import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import axios from 'axios'
import Vuex from 'vuex'
import cookies from './cookies'

//设置为全局变量
Vue.prototype.cookie = cookies;

Vue.use(Vuex);
Vue.prototype.$axios =axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
axios.defaults.withCredentials=true

/* eslint-disable */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// axios.interceptors.request.use(
//   config => {
//     if(config.url==='/logIn'||config.url==='/Register'){  //如果是登录和注册操作，则不需要携带header里面的token
//     }else{
//       if (sessionStorage.getItem('Authorization')) {
//         config.headers.Authorizatior = sessionStorage.getItem('Authorization');
//       }
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });

