// import axios from '../../axios/request'
import axios from 'axios'
import store from '../index'

export default {
  namespaced: true,
  state() {
    return {
      requests: []
    }
  },
  mutations: {
    setRequests(state, requests) {
      state.requests = requests
    },
    addRequest(state, request) {
      state.requests.push(request)
    }
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const token = store.getters['auth/token']

        const {data} = await axios.post(`${process.env.VUE_APP_RE_URL}/api/new`, payload, {
          headers: { 'x-access-token': token }
        })

        commit('addRequest', {...data})
        dispatch('setMessage', {
          value: 'Запись успешно создана',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.response.data.message,
          type: 'danger'
        }, {root: true})

        if(e.response.status === 401 || e.response.status === 403) {
          store.commit('auth/logout')
          document.title = `Войти | Блог`
          location.href = '/auth?message=tokenexpire'
        }
      }
    },

    async load({ commit, dispatch }, payload) {
      try {
        const token = store.getters['auth/token']

        let config = {
          headers: {'x-access-token': token}
        }

        const {data} = await axios.get(`${process.env.VUE_APP_RE_URL}/api/list`, config)
        commit('setRequests', data)
      } catch (e) {
        dispatch('setMessage', {
          value: e.response.data.message,
          type: 'danger'
        }, {root: true})

        if(e.response.status === 401 || e.response.status === 403) {
          store.commit('auth/logout')
          document.title = `Войти | Блог`
          location.href = '/auth?message=tokenexpire'
        }
        // throw new Error()
      }
    },

    async loadOne({ commit, dispatch }, id) {
      try {
        const token = store.getters['auth/token']

        let config = {
          headers: {'x-access-token': token}
        }

        const {data} = await axios.get(`${process.env.VUE_APP_RE_URL}/api/view/${id}`, config)
        return data
      } catch (e) {
        dispatch('setMessage', {
          value: e.response.data.message,
          type: 'danger'
        }, {root: true})

        if(e.response.status === 401 || e.response.status === 403) {
          store.commit('auth/logout')
          document.title = `Войти | Блог`
          location.href = '/auth?message=tokenexpire'
        }
      }
    },

    async remove({ dispatch }, id) {
      try {
        const token = store.getters['auth/token']

        await axios.delete(`${process.env.VUE_APP_RE_URL}/api/delete/${id}`, {
          headers: { 'x-access-token': token }
        })

        dispatch('setMessage', {
          value: 'Запись удалена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.response.data.message,
          type: 'danger'
        }, {root: true})

        if(e.response.status === 401 || e.response.status === 403) {
          store.commit('auth/logout')
          document.title = `Войти | Блог`
          location.href = '/auth?message=tokenexpire'
        }
      }
    },



    async update({ dispatch }, request) {
      try {
        const token = store.getters['auth/token']

        console.log(request)

        await axios.put(`${process.env.VUE_APP_RE_URL}/api/update/${request.id}`, request, {
          headers: { 'x-access-token': token }
        })

        dispatch('setMessage', {
          value: 'Запись обновлена',
          type: 'primary'
        }, {root: true})
      } catch (e) {
        dispatch('setMessage', {
          value: e.response.data.message,
          type: 'danger'
        }, {root: true})

        if(e.response.status === 401 || e.response.status === 403) {
          store.commit('auth/logout')
          document.title = `Войти | Блог`
          location.href = '/auth?message=tokenexpire'
        }
      }
    }
  },
  getters: {
    requests(state) {
      return state.requests
    }
  }
}
