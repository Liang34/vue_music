import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommand from 'views/Recommend/Recommend'
import My from 'views/My/My'
import MusicList from 'views/MusicList/MusicList'
// import Singer from 'views/Singer/Singer'
import SingerDetail from 'views/Singer/SingerDetail'
import Rank from 'views/Rank/Rank'
import RankDetail from 'components/RankDetail'
import Search from 'views/Search/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommand,
    children: [
      {
        path: ':id',
        component: MusicList
      }
    ]
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/singer',
    component: resolve => (require(['views/Singer/Singer'], resolve)),
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: ':id',
        component: RankDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: 'singer/:id',
        component: SingerDetail
      },
      {
        path: 'list/:id',
        component: MusicList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
