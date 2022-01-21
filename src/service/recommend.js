import request from './fetch'

// 获取轮播图
export function reqBanner (type) {
  return request({
    url: 'api/banner',
    params: {
      type
    }
  })
}
// 获取歌单（网友精选碟）
export function reqRecommendList (limit) {
  return request({
    url: 'api/personalized',
    params: {
      limit
    }
  })
}
// 获取新歌
export function reqNewMusic () {
  return request({
    url: 'api/personalized/newsong'
  })
}

// // 根据歌单id获取歌单详情
export function getRecommendListDetail (id) {
  return request({
    url: 'api/playlist/detail',
    params: {
      id
    }
  })
}
