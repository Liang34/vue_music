import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommand from 'views/Recommend/Recommend'
import My from 'views/My/My'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommand
  },
  {
    path: '/my',
    component: My
  }
]

const router = new VueRouter({
  routes
})

export default router
