import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'

const state = {
  musicList: {},
  singer: {},
  playing: false, // 是否在播放
  fullScreen: false, // 目前是否全屏
  playlist: [],
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放索引
  disc: {},
  topList: {}, // 当前点击的排行列表
  searchHistory: loadSearch(), // 搜索歌曲历史
  playHistory: loadPlay(), // 播放歌曲历史
  favoriteList: loadFavorite() // 喜欢的歌曲
}
export default state
