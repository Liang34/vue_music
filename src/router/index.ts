import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
// ]
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () =>
      import(
        /**webpackChunkName: "recommend" */ 'views/Recommend/Recommend.vue'
      )
    // children: [
    //   {
    //     path: ":id",
    //     component: (resolve) => require(["views/MusicList/MusicList"], resolve),
    //   },
    // ],
  }
  // {
  //   path: "/my",
  //   component: (resolve) => require(["views/My/My"], resolve),
  // },
  // {
  //   path: "/singer",
  //   component: (resolve) => require(["views/Singer/Singer"], resolve),
  //   children: [
  //     {
  //       path: ":id",
  //       component: (resolve) => require(["views/Singer/SingerDetail"], resolve),
  //     },
  //   ],
  // },
  // {
  //   path: "/rank",
  //   component: (resolve) => require(["views/Rank/Rank"], resolve),
  //   children: [
  //     {
  //       path: ":id",
  //       component: (resolve) => require(["views/Rank/RankDetail"], resolve),
  //     },
  //   ],
  // },
  // {
  //   path: "/search",
  //   component: (resolve) => require(["views/Search/Search"], resolve),
  //   children: [
  //     {
  //       path: "singer/:id",
  //       component: (resolve) => require(["views/Singer/SingerDetail"], resolve),
  //     },
  //     {
  //       path: "list/:id",
  //       component: (resolve) => require(["views/MusicList/MusicList"], resolve),
  //     },
  //   ],
  // },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
