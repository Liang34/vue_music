
// import { getSong } from 'service/song'

export const musicList = state => state.musicList

export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const disc = state => state.disc

export const topList = state => state.topList

export const searchHistory = state => state.searchHistory
// 获取播放历史
export const playHistory = state => state.playHistory
// 获取喜欢的歌曲
export const favoriteList = state => state.favoriteList

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

// 获取当前播放的歌曲
// export const currentSongUrl = (state) => {
//   console.log(state.playlist[state.currentIndex])
//   getSong(state.playlist[state.currentIndex].id).then((res) => {
//     return res.data?.data.url || ''
//   })
// }
