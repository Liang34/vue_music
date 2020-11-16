import ajax from './ajax'
// 获取前一百歌手
export const getSingers = () => ajax('api/top/artists?limit=100')
// 歌手详情
export const getSingerDetail = id => ajax('api/artists', { id })
