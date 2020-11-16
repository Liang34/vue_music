import ajax from './ajax'

// 获取歌曲详细信息
export const getSong = id => ajax('api/song/url', { id })

// 根据歌曲id获取歌词
export const getLyric = id => ajax('api/lyric', { id })
