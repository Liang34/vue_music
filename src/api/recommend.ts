import request from './fetch'

// getBanner
export function reqBanner(type: number): Promise<any> {
  return request({
    url: 'api/banner',
    params: type
  })
}
