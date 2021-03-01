import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import axios from 'axios'

Vue.prototype.$axios =axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')

