import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/index.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/category/:id',
          component: () => import('@/views/category/index.vue')
        },
        {
          path: '/category/sub/:id',
          component: () => import('@/views/subCategory/index.vue')
        },
        {
          path: '/detail/:id',
          component: () => import('@/views/detail/index.vue')
        },
        {
          path: '/cart',
          component: () => import('@/views/cart/index.vue')
        }
      ]
    }
  ],
  scrollBehavior() {
    // 切换路由时，滚动条移至顶部
    return {
      top: 0
    }
  }
})

export default router
