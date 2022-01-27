import request from './fetch'
// 热门推荐
export const getSearchHot = () => request({
  url: 'api/search/hot'
})
// 查询结果
export const getSearchSongs = (keywords, offset) => request({
  url: 'api/search',
  params: { keywords, offset }
})
export const getSearchSuggest = keywords => request({
  url: 'api/search/suggest',
  params: { keywords }
})
export const getSongDetail = ids => request({
  url: 'api/song/detail',
  params: { ids }
})
