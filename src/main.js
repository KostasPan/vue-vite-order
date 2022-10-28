import { createApp } from 'vue'
import cart from './stores/cart';
import App from './App.vue'
import router from './router'
import filters from './utils/filters'

import './assets/main.css'

const app = createApp(App)

app.config.globalProperties.$filters = filters

app.use(router)
app.use(cart)
app.mount('#app')