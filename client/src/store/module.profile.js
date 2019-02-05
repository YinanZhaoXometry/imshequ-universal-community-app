import $axios from '../utils/axios'
const state = {
  profile: {}
}


const mutations = {
  SET_PROFILE (state, profile) {
    state.profile = profile
  },
}

const actions = {
  FETCH_PROFILE ({commit}, {username}) {
    $axios.get(`/profiles/${username}`)
      .then(({data}) => {
        commit('SET_PROFILE', data.profile)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  FETCH_PROFILE_FOLLOW ({commit}, payload) {
    const { username } = payload
    return $axios.post(`/profiles/${username}/follow`)
      .then(({data}) => {
        commit('SET_PROFILE', data.profile)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  FETCH_PROFILE_UNFOLLOW ({commit}, payload) {
    console.log('unfollow')
    const { username } = payload
    return $axios.delete(`/profiles/${username}/follow`)
      .then(({data}) => {
        commit('SET_PROFILE', data.profile)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export default {
  state,
  mutations,
  actions
}