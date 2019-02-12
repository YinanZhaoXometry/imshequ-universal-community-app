import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '',
          name: 'all',
          component: () => import('@/views/HomeAll.vue')
        },
        {
          path: 'myfeed',
          name: 'feed',
          component: () => import('@/views/HomeMyFeed.vue')
        },
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup.vue')
    },
    {
      path: '/write',
      name: 'article-write',
      component: () => import('@/views/ArticleWrite.vue')
    },
    {
      path: '/write/:id',
      name: 'article-edit',
      component: () => import('@/views/ArticleWrite.vue')
    },
    {
      path: '/a/:id',
      name: 'article',
      component: () => import('@/views/Article.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue')
    },
    {
      path: '/u/:id',
      component: () => import('@/views/Profile.vue'),
      children: [
        {
          path: '',
          name: 'user-articles',
          component: () => import('@/views/ProfileTabs.vue')
        },
        {
          path: 'favorites',
          name: 'user-favorites',
          component: () => import('@/views/ProfileTabs.vue')
        },
        {
          path: 'notifications',
          name: 'user-notifications',
          component: () => import('@/views/ProfileNotifications.vue')
        }
      ]
    }
  ]
})
