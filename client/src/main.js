import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './plugins/element.js'

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  await store.dispatch('CHECK_AUTH')
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
