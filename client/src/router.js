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
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/Signin')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup')
    },
    {
      path: '/write',
      name: 'article-write',
      component: () => import('@/views/ArticleWrite')
    },
    {
      path: '/write/:id',
      name: 'article-edit',
      component: () => import('@/views/ArticleWrite')
    },
    {
      path: '/a/:id',
      name: 'article',
      component: () => import('@/views/Article')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings')
    },
    {
      path: '/u/:id',
      component: () => import('@/views/Profile'),
      children: [
        {
          path: '',
          name: 'user-articles',
          component: () => import('@/views/ProfileTabs')
        },
        {
          path: 'favorites',
          name: 'user-favorites',
          component: () => import('@/views/ProfileTabs')
        }
      ]
    }
  ]
})
