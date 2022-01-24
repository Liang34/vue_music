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
    component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend.vue')
  },
  {
    path: '/singer',
    component: () => import(/* webpackChunkName: "singer" */ '../views/singer/singer-rank.vue')
  },
  {
    path: '/my',
    component: () => import(/* webpackChunkName: "my" */ '../views/my/my.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
