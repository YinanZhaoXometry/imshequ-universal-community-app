import $axios from '../utils/axios'

const TOKEN_ID = 'token_id'

const state = {
  authInfo: {},
  user: {},
  errors: null,
  isAuthenticated: !!window.localStorage.getItem(TOKEN_ID)
}
const getters = {
  isAuthenticated (state) {
    return state.isAuthenticated
  },
}
const mutations = {
  SET_AUTH (state, authInfo) {
    state.authInfo = authInfo
    state.isAuthenticated = true
    if(authInfo.token) 
      window.localStorage.setItem(TOKEN_ID, authInfo.token)
  },
  CLEAR_AUTH (state) {
    state.isAuthenticated = false
    state.authInfo = {}
    state.errors = {}
    console.log(state)
    window.localStorage.removeItem(TOKEN_ID)
  },

  SET_ERROR (state, errors) {
    state.errors = errors
  },

}
const actions = {
  SIGNIN ({commit}, credentials) {
    return new Promise((resolve) => {
      $axios.post('/auth/signin', credentials)
      .then(({data}) => {
        commit('SET_AUTH', data.user)
        resolve(data)
      })
      .catch(({response}) => {
        commit('SET_ERROR', response.data.errors)
      })
    })
  },
  SIGNUP ({commit}, credentials) {
    return new Promise((resolve) => {
      $axios.post('/auth/signup', credentials)
        .then(({data}) => {
          commit('SET_AUTH', data.user)
          resolve(data)
        })
        .catch(({response}) => {
          commit('SET_ERROR', response.data.errors)
        })
    })
  },
  CHECK_AUTH ({commit}) {
    if (window.localStorage.getItem(TOKEN_ID)) {
      $axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${window.localStorage.getItem(TOKEN_ID)}`
      return $axios.get('/auth')
        .then(({data}) => {
          commit('SET_AUTH', data.user)
        })
        .catch(({response}) => {
          console.log(response.data.errors)
        })
    } else {
      commit('CLEAR_AUTH')
    }
  }
}



export default {
  state,
  getters,
  mutations,
  actions
}