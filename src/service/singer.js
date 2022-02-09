import request from './fetch'
// 获取前一百歌手
export const getSingers = () => {
  return request({
    url: 'top/artists?limit=100'
  })
}
// 歌手详情
export const getSingerDetail = id => {
  return request({
    url: 'artists',
    params: {
      id
    }
  })
}
