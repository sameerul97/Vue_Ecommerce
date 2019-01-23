import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    isLogged: false
  },
  mutations: {
    change(state, value) {
      state.isLogged = value
    }
  },
  getters: {
    isLogged: state => state.isLogged
  }
})

export default store