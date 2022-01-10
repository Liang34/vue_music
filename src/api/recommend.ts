import request from './fetch'

// getBanner
export function reqBanner(type: number): Promise<any> {
  return request({
    url: 'api/banner',
    params: {
      type
    }
  })
}
// getDiscList
export function reqDiscList(limite: number): Promise<any> {
  return request({
    url: 'api/personalized',
    params: {
      limite
    }
  })
}
