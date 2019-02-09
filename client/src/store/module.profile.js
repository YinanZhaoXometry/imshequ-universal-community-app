import $axios from '../utils/axios'
const state = {
  profile: {},
}

const getters = {
  isFollowing (state, getters, rootState) {
    return state.profile.followers ? state.profile.followers.includes(rootState.auth.authInfo.id) : false
  }
}

const mutations = {
  SET_PROFILE (state, profile) {
    state.profile = profile
  }
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
  FOLLOW ({commit}, {userId, authUserId}) {
    return $axios.post(`/users/${userId}/follow`, {authUserId})
      .then(({data}) => {
        commit('SET_PROFILE', data.profile)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  UNFOLLOW ({commit}, {userId, authUserId}) {
    return $axios.delete(`/users/${userId}/follow`, {params: {authUserId}})
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
  getters,
  mutations,
  actions
}