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
