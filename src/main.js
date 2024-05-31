import './assets/common.scss'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// store
import { createPinia } from 'pinia'
app.use(createPinia())

// 路由
import router from './router'
app.use(router)

// 图片懒加载
import { imgLazyPlugin } from './directives'
app.use(imgLazyPlugin)

app.mount('#app')
