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
    return $axios.get(`/articles/${articleSlug}`)
    .then(({data}) => {
      commit('SET_ARTICLE', data.article)
      return data.article
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
  },
  COMMENT_CREATE ({dispatch}, { slug, comment }) {
    $axios.post(`/articles/${slug}/comments`, {
      comment: { body: comment }
    }).then(() => {
      dispatch('COMMENTS_FETCH', slug)
    })
  },
  COMMENT_DELETE ({dispatch}, {slug, commentId}) {
    $axios.delete(`/articles/${slug}/comments/${commentId}`)
      .then(() => {
        dispatch('COMMENTS_FETCH', slug)
      })
  },
  FAVORITE_ADD ({commit}, articleId) {
    $axios.post(`/articles/${articleId}/favorite`)
      .then(({data}) => {
        commit('SET_ARTICLE', data.article)
      })
  },
  FAVORITE_REMOVE ({commit}, articleId) {
    $axios.delete(`/articles/${articleId}/favorite`)
      .then(({data}) => {
        commit('SET_ARTICLE', data.article)
      })
  }

}

export default {
  state,
  mutations,
  actions
}