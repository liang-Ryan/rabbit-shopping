import { ref } from 'vue'
import { defineStore } from 'pinia'
import { orderGetOrderInfoAPI } from '@/api/order'

export const useOrderStore = defineStore('orderStore', () => {
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

  return {
    // 订单信息
    orderInfo,
    address,
    getOrderInfo
  }
})
