import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'common/style/index.less'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'

fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: require('assets/default.jpg')
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
