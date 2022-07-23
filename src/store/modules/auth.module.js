import axios from 'axios'
// import {error} from '../../utils/error'
const TOKEN_KEY = 'jwt-token'
const CUSER = 'cuser'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      cuser: localStorage.getItem(CUSER)
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
      state.cuser = null
      localStorage.removeItem(CUSER)
    },
    setCuser(state, cuser) {
      state.cuser = cuser
      localStorage.setItem(CUSER, cuser)
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      commit('setCuser', payload.login)

      try {
        const payload1 = {
          userId: payload.login,
          password: payload.password
        }

        const url = `${process.env.VUE_APP_RE_URL}/api/signin`
        const {data} = await axios.post(url, {...payload1})

        commit('setToken', data.jwt)
        commit('clearMessage', null, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.response.data.message,
          type: 'danger'
        }, {root: true})
        throw new Error()
      }
    },
    async register({ commit, dispatch }, payload) {
      try {
        const payload1 = {
          userId: payload.login,
          password: payload.password
        }

        const url = `${process.env.VUE_APP_RE_URL}/api/signup`
        const {data} = await axios.post(url, {...payload1})

        dispatch('setMessage', {
          value: data.message,
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.response.data.message,
          type: 'danger'
        }, {root: true})
        throw new Error()
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      // src/router/index.js
      // boolean store.getters['auth/isAuthenticated']
      // !! - приведение к boolean
      return !!getters.token
    },
    cuser(state) {
      return state.cuser
    }
  },
}
