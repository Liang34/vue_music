import request from './fetch'

// 获取歌曲详细信息
export const getSong = id => request({
  url: 'song/url',
  params: {
    id
  }
})

// 根据歌曲id获取歌词
export const getLyric = id => request({
  url: 'lyric',
  params: {
    id
  }
})
