// 通用
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

// store
import { useCartStore } from './cart'

// 组件
import { ElMessage } from 'element-plus'

// API
import { userGerOrderAPI, userGetLikeAPI, userPostLoginAPI } from '@/api/user'

export const useUserStore = defineStore(
  'userStore',
  () => {
    // =============================
    // 用户信息
    // =============================

    const userInfo = ref({})

    const cartStore = useCartStore()

    // =============================
    // 登录请求
    // =============================

    const getUserInfo = async (form) => {
      const {
        data: { result }
      } = await userPostLoginAPI(form)
      userInfo.value = result
      cartStore.mergeCartList()
      ElMessage.success('登录成功')
      router.replace(route.query.backUrl || '/')
    }

    // =============================
    // 退出登录
    // =============================

    const route = useRoute()
    const router = useRouter()

    const logout = () => {
      userInfo.value = {}
      cartStore.cartList = []

      router.push({
        path: '/login',
        query: {
          backUrl: route.fullPath
        }
      })
      ElMessage.success('退出成功')
    }

    // =============================
    // 猜你喜欢
    // =============================

    const likeList = ref([])
    const getLikeList = async () => {
      const {
        data: { result }
      } = await userGetLikeAPI()
      likeList.value = result
    }

    // =============================
    // 个人订单
    // =============================

    const orderList = ref([])

    const params = ref({
      orderState: 0,
      page: 1,
      pageSize: 2
    })

    const getOrderList = async () => {
      const {
        data: { result }
      } = await userGerOrderAPI(params.value)
      orderList.value = result
    }

    // =============================

    return {
      // 登录数据
      userInfo,
      // 登录请求
      getUserInfo,
      // 退出登录
      logout,
      // 猜你喜欢
      likeList,
      getLikeList,
      // 个人订单
      orderList,
      params,
      getOrderList
    }
  },
  {
    persist: {
      key: 'rabbitShopping-userInfo',
      path: ['userInfo']
    }
  }
)
