import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存在token，则返回token
    // Authorization: sessionStorage.getItem('Authorization') ? sessionStorage.getItem('Authorization') : ''
  },
  mutations: {
    // logStatus(state, user){
    //   state.Authorization = user.Authorization;
    //   sessionStorage.setItem('Authorization', user.Authorization);
    // }
  },
  actions: {

  }
});

