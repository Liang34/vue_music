import ajax from './ajax'
// 获取banner,type为获取的手机类型0为
// eslint-disable-next-line import/prefer-default-export
export const reqBanner = type => ajax('api/banner', { type })
// 获取歌单（网友精选碟）
export const reqRecommendList = limit => ajax('api/personalized', { limit })

// 获取新歌
export const getRecommendMusic = () => ajax('api/personalized/newsong')
