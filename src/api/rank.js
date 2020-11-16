import ajax from './ajax'
// 获取排行榜
export const getTop = idx => ajax('api/top/list', { idx })
