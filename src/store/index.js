import {createStore, createLogger} from 'vuex'
import auth from './modules/auth.module'
import request from './modules/request.module'

const plugins = []

if(process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state() {
    return {
      message: null
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    }
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      window.scrollTo({ top: 0, behavior: "smooth" })
      setTimeout(() => {
        commit('clearMessage')
      }, 10000)
    }
  },
  modules: {
    auth, request
  }
})
