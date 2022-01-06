// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path') //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('views', resolve('./src/views'))
      .set('assets', resolve('./src/assets'))
      .set('common', resolve('./src/common'))
      .set('api', resolve('./src/api'))
  },
  devServer: {
    proxy: {
      // 代理的
      '/api': {
        target: 'http://120.25.239.32:3000', // 代理的基础路径
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
