import { join } from 'path'
function resolve(dir) {
  return join(__dirname, dir) //path.join(__dirname)设置绝对路径
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
  }
}
