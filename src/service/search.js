import request from './fetch'
// 热门推荐
export const getSearchHot = () => request({
  url: 'search/hot'
})
// 查询结果，传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开
export const getSearchSongs = (keywords, offset) => request({
  url: 'search',
  params: { keywords, offset }
})
// 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
export const getSearchSuggest = keywords => request({
  url: 'search/suggest',
  params: { keywords }
})
// 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情
export const getSongDetail = ids => request({
  url: 'song/detail',
  params: { ids }
})
