import $axios from '../utils/axios'

const state = {
  tags: [],
  articles: [],
  isLoading: true,
  articlesCount: 0
}

const mutations = {
  SET_LOADING_STATUS (state, isLoading) {
    state.isLoading = isLoading
  },
  SET_ARTICLES (state, { articles, articlesCount }) {
    state.articles = articles
    state.articlesCount = articlesCount
  }
}

const actions = {
  async FETCH_ARTICLES ({ commit }, params) {
    try {
      commit('SET_LOADING_STATUS', true)
      let {data} = await $axios.get('/articles'+ (params.type==="feed"?"/feed":""), { params: params.filters })
      commit('SET_ARTICLES', data)
      commit('SET_LOADING_STATUS', false)
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  state,
  mutations,
  actions
}