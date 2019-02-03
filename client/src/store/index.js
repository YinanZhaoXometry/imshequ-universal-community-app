import Vue from 'vue'
import Vuex from 'vuex'
import home from './module.home'
import auth from './module.auth'
import article from './module.article'
import profile from './module.profile'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    auth,
    article,
    profile
  }
})
