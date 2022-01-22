import request from './fetch'
// 获取前一百歌手
export const getSingers = () => {
  return request({
    url: 'api/top/artists?limit=100'
  })
}
// 歌手详情
// export const getSingerDetail = id => ajax('api/artists', { id })
