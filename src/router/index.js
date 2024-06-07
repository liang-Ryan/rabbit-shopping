import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'

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
        },
        {
          path: '/order',
          component: () => import('@/views/order/index.vue')
        },
        {
          path: '/pay',
          component: () => import('@/views/pay/index.vue')
        },
        {
          path: '/paycallback',
          component: () => import('@/views/pay/payResult.vue')
        },
        {
          path: '/user',
          component: () => import('@/views/user/index.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/user/components/userInfo.vue')
            },
            {
              path: 'userorder',
              component: () => import('@/views/user/components/userOrder.vue')
            }
          ]
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

// 全局前置守卫
const urlArr = ['/pay', '/paycallback', '/order'] // 需要登录验证的网址

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (urlArr.includes(to.path)) {
    if (userStore.userInfo.token) {
      next()
    } else {
      next('/login')
    }
  } else if (to.path === '/login') {
    if (userStore.userInfo.token) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
