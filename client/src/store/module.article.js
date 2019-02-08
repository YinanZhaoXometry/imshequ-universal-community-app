import $axios from '../utils/axios'

const initialState = {
  article: {
    title: '',
    description: '',
    content: '',
    author: {},
    tagList: [],
  },
  comments: []
}

const state = {...initialState}

const mutations = {
  SET_ARTICLE (state, article) {
    state.article = article
  },
  RESET_ARTICLE_STATE (state) {
    state.article = initialState.article
  },
  SET_COMMENTS (state, comments) {
    state.comments = comments
  }
}

const actions = {
  ARTICLE_FETCH ({commit}, id) {
    return $axios.get(`/articles/${id}`)
    .then(({data}) => {
      commit('SET_ARTICLE', data.article)
      return data.article
    })
  },
  ARTICLE_PUBLISH (context, article) {
    return $axios.post('/articles', article)
  },
  ARTICLE_DELETE (context, id) {
    return $axios.delete(`/articles/${id}`)
  },
  ARTICLE_EDIT (context, article) {
    return $axios.patch(`/articles/${article.id}`, article)
  },
  COMMENTS_FETCH ({commit}, articleId) {
    $axios.get('/comments', { params: {id: articleId} })
    .then(({data}) => {
      commit('SET_COMMENTS', data.comments)
    })
  },
  COMMENT_PUBLISH ({dispatch}, { articleId, content }) {
    $axios.post('/comments', { articleId, content })
      .then(() => { dispatch('COMMENTS_FETCH', articleId) })
  },
  COMMENT_DELETE ({dispatch}, {articleId, commentId}) {
    $axios.delete(`/comments/${commentId}`, {params: {articleId}})
      .then(() => {
        dispatch('COMMENTS_FETCH', articleId)
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