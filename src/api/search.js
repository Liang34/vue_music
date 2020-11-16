import ajax from './ajax'
export const getSearchHot = () => ajax('api/search/hot')
export const getSearchSongs = (keywords, offset) => ajax('api/search', { keywords, offset })
export const getSearchSuggest = keywords => ajax('api/search/suggest', { keywords })
export const getSongDetail = ids => ajax('api/song/detail', { ids })
