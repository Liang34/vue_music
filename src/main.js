import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/style/index.scss'
// import 'default-passive-events'
createApp(App).use(store).use(router).mount('#app')
