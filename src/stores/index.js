// pinia配置
import { createPinia } from 'pinia'
const pinia = createPinia()
export default pinia

// pinia-plugin-persistedstate插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
pinia.use(piniaPluginPersistedstate)

export * from './modules/layout.js'
export * from './modules/home.js'
export * from './modules/category.js'
export * from './modules/detail.js'
export * from './modules/user.js'
export * from './modules/cart.js'
export * from './modules/order.js'
