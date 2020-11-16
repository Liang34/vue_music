import Vue from 'vue'
import VueRouter from 'vue-router'
// import Recommand from 'views/Recommend/Recommend'
// import My from 'views/My/My'
// import MusicList from 'views/MusicList/MusicList'
// import Singer from 'views/Singer/Singer'
// import SingerDetail from 'views/Singer/SingerDetail'
// import Rank from 'views/Rank/Rank'
// import RankDetail from 'components/RankDetail'
// import Search from 'views/Search/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: resolve => (require(['views/Recommend/Recommend'], resolve)),
    children: [
      {
        path: ':id',
        component: resolve => (require(['views/MusicList/MusicList'], resolve))
      }
    ]
  },
  {
    path: '/my',
    component: resolve => (require(['views/My/My'], resolve))
  },
  {
    path: '/singer',
    component: resolve => (require(['views/Singer/Singer'], resolve)),
    children: [
      {
        path: ':id',
        component: resolve => (require(['views/Singer/SingerDetail'], resolve))
      }
    ]
  },
  {
    path: '/rank',
    component: resolve => (require(['views/Rank/Rank'], resolve)),
    children: [
      {
        path: ':id',
        component: resolve => (require(['views/Rank/RankDetail'], resolve))
      }
    ]
  },
  {
    path: '/search',
    component: resolve => (require(['views/Search/Search'], resolve)),
    children: [
      {
        path: 'singer/:id',
        component: resolve => (require(['views/Singer/SingerDetail'], resolve))
      },
      {
        path: 'list/:id',
        component: resolve => (require(['views/MusicList/MusicList'], resolve))
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
