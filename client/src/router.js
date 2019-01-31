import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
      children: [
        {
          path: '',
          name: 'all',
          component: () => import('@/views/HomeArticleList')
        },
        {
          path: 'myfeed',
          name: 'feed',
          component: () => import('@/views/HomeArticleList')
        },
        // {
        //   path: 'nodejs',
        //   name: 'home-nodejs',
        //   component: () => import('@/views/HomeArticleList')
        // },
        // {
        //   path: 'react',
        //   name: 'home-react',
        //   component: () => import('@/views/HomeArticleList')
        // },
        // {
        //   path: 'vue',
        //   name: 'home-vue',
        //   component: () => import('@/views/HomeArticleList')
        // },
        // {
        //   path: 'questions',
        //   name: 'home-questions'
        // },
        // {
        //   path: 'jobs',
        //   name: 'home-jobs'
        // }
      ]
    }
  ]
})
