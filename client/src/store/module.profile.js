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
  FETCH_PROFILE ({commit}, {id}) {
    return $axios.get(`/users/${id}`)
      .then(({data}) => {
        commit('SET_PROFILE', data.profile)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  UPDATE_PROFILE ({commit}, {updatedUser, userId}) {
    const {email, username, password, avatar, signature} = updatedUser
    let user = {email, username, password, avatar, signature}
    for (let key in user) {
      if (!user[key]) { delete user[key] }
    }
    return $axios.patch(`/users/${userId}`, user).then(({data}) => {
      commit('SET_AUTH', data)
    })
  },
  FETCH_PROFILE_FOLLOW ({commit}, payload) {
    const { username } = payload
    return $axios.post(`/profiles/${username}/follow`)
      .then(({data}) => {
        commit('SET_PROFILE', data)
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