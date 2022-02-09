import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: 'recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/recommend.vue'),
    children: [{
      path: ':id',
      component: () => import(/* webpackChunkName: "recommend-detail" */ '../views/recommend/recommend-detail.vue')
    }]
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName: "singer" */ '../views/singer/singer-rank.vue'),
    children: [{
      path: ':id',
      component: () => import(/* webpackChunkName: "singer-detail" */ '../views/singer/singer-detail.vue')
    }]
  },
  {
    path: '/my',
    component: () => import(/* webpackChunkName: "my" */ '../views/my/my.vue')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '../views/search/search.vue')
  },
  {
    path: '/rank',
    component: () => import(/* webpackChunkName: "rank" */ '../views/rank/rank.vue'),
    children: [{
      path: ':id',
      component: () => import(/* webpackChunkName: "rank-detail" */ '../views/rank/rank-detail.vue')
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
