import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import './common/style/index.scss'
createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/default.jpg')
}).mount('#app')
