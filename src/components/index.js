import goodsItem from './goodsItem.vue'

// =============================
// 组件全局注册
// =============================

export const componentPlugin = {
  install(app) {
    // app.component('组件的全局注册名', '被注册组件名（导入组件的对象名）')
    app.component('goodsItem', goodsItem)
  }
}
