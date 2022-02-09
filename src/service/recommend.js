import request from './fetch'

// 获取轮播图
export function reqBanner (type) {
  return request({
    url: 'banner',
    params: {
      type
    }
  })
}
// 获取歌单（网友精选碟）
export function reqRecommendList (limit) {
  return request({
    url: 'personalized',
    params: {
      limit
    }
  })
}
// 获取新歌
export function reqNewMusic () {
  return request({
    url: 'personalized/newsong'
  })
}

// // 根据歌单id获取歌单详情
export function getRecommendListDetail (id) {
  return request({
    url: 'playlist/detail',
    // url: '/playlist/track/all',
    params: {
      id
    }
  })
}
