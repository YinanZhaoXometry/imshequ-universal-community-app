import $axios from '../utils/axios'

const TOKEN_ID = 'token_id'

const state = {
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
  SET_AUTH (state, user) {
    state.user = user
    state.isAuthenticated = true
    window.localStorage.setItem(TOKEN_ID, user.token)
  },
  CLEAR_AUTH (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    window.localStorage.removeItem(TOKEN_ID)
  },
  SET_ERROR (state, errors) {
    state.errors = errors
  },

}
const actions = {
  LOGIN ({commit}, credentials) {
    return new Promise((resolve) => {
      $axios.post('/users/login', {user: credentials})
      .then(({data}) => {
        commit('SET_AUTH', data.user)
        resolve(data)
      })
      .catch(({response}) => {
        console.log(response)
      })
    })
  },
  REGISTER ({commit}, credentials) {
    return new Promise((resolve) => {
      $axios.post('/users', {user: credentials})
        .then(({data}) => {
          commit('SET_AUTH', data.user)
          resolve(data)
        })
        .catch(({response}) => {
          commit('SET_ERROR', response.data.errors)
          console.log(response)
        })
    })
  },
  CHECK_AUTH ({commit}) {
    if (window.localStorage.getItem(TOKEN_ID)) {
      $axios.defaults.headers.common[
        'Authorization'
      ] = `Token ${window.localStorage.getItem(TOKEN_ID)}`
      $axios.get('/user',)
        .then(({data}) => {
          commit('SET_AUTH', data.user)
        })
        .catch(({response}) => {
          console.log(response.data.errors)
        })
    } else {
      commit('CLEAR_AUTH')
    }
  },
  UPDATE_USER ({commit}, updatedUser) {
    const {email, username, password, image, bio} = updatedUser
    let user = {
      email,
      username,
      image,
      bio
    }
    if (password) user.password = password
    return $axios.put('/user', user).then(({data}) => {
      commit('SET_AUTH', data.user)
    })
  }
}



export default {
  state,
  getters,
  mutations,
  actions
}