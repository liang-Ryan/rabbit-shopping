import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

// store
import { useCartStore } from './cart'

// API
import { orderGetOrderInfoAPI, orderPostOrderAPI } from '@/api/order'

export const useOrderStore = defineStore('orderStore', () => {
  const cartStore = useCartStore()
  const router = useRouter()

  // =============================
  // 订单信息
  // =============================

  const orderInfo = ref({})
  const address = ref({})

  const getOrderInfo = async () => {
    const {
      data: { result }
    } = await orderGetOrderInfoAPI()
    orderInfo.value = result
    address.value = orderInfo.value.userAddresses.find((item) => {
      return item.isDefault === 0
    })
  }

  // =============================
  // 提交订单
  // =============================

  const submitOrder = async () => {
    const {
      data: { result }
    } = await orderPostOrderAPI(
      orderInfo.value.goods.map((item) => {
        return {
          skuId: item.skuId,
          count: item.count
        }
      }),
      address.value.id
    )

    cartStore.getCartList()

    router.push({
      path: '/pay',
      query: {
        id: result.id
      }
    })
  }

  // =============================

  return {
    // 订单信息
    orderInfo,
    address,
    getOrderInfo,
    // 提交订单
    submitOrder
  }
})
