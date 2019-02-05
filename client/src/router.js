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
          component: () => import('@/views/HomeAll')
        },
        {
          path: 'myfeed',
          name: 'feed',
          component: () => import('@/views/HomeMyFeed')
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
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register')
    },
    {
      path: '/write',
      name: 'article-write',
      component: () => import('@/views/ArticleWrite')
    },
    {
      path: '/article/:slug',
      name: 'article',
      component: () => import('@/views/Article')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings')
    },
    {
      path: '/u/:username',
      component: () => import('@/views/User'),
      children: [
        {
          path: '',
          name: 'user-articles',
          component: () => import('@/views/UserTabs')
        },
        {
          path: 'favorites',
          name: 'user-favorites',
          component: () => import('@/views/UserTabs')
        }
      ]
    }
  ]
})
