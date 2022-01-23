import request from './fetch'
// 获取排行榜
export const getTop = idx => request({
  url: 'api/top/list',
  params: {
    idx
  }
})
