import { ref } from 'vue'
import { defineStore } from 'pinia'
import { orderGetOrderInfoAPI } from '@/api/order'

export const useOrderStore = defineStore('orderStore', () => {
  // =============================
  // 订单信息
  // =============================

  const orderInfo = ref({})

  const getOrderInfo = async () => {
    const {
      data: { result }
    } = await orderGetOrderInfoAPI()
    orderInfo.value = result
  }

  // =============================

  return {
    // 订单信息
    orderInfo,
    getOrderInfo
  }
})
