import $axios from '../utils/axios'
const state = {
  article: {
    author: {},
    title: '',
    description: '',
    body: '',
    tagList: []
  },
  comments: []
}

const mutations = {
  SET_ARTICLE (state, article) {
    state.article = article
  },
  SET_COMMENTS (state, comments) {
    state.comments = comments
  }
}

const actions = {
  ARTICLE_FETCH ({commit}, {articleSlug, prevArticle}) {
    if (prevArticle !== undefined) {
      return commit('SET_ARTICLE', prevArticle)
    }
    $axios.get(`/articles/${articleSlug}`)
    .then(({data}) => {
      commit('SET_ARTICLE', data.article)
    })
  },
  ARTICLE_PUBLISH (context, article) {
    return $axios.post('/articles', {article})
  },
  COMMENTS_FETCH ({commit}, articleSlug) {
    $axios.get(`/articles/${articleSlug}/comments`)
    .then(({data}) => {
      commit('SET_COMMENTS', data.comments)
    })
  }
}

export default {
  state,
  mutations,
  actions
}