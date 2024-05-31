import { ref } from 'vue'
import { defineStore } from 'pinia'

// API
import { detailGetGoodsAPI } from '@/api/detail'

export const useDetailStore = defineStore('detailStore', () => {
  // =============================
  // 获取商品详情
  // =============================

  const goodsDetail = ref({})
  const getGoodsDetail = async (id) => {
    const {
      data: { result }
    } = await detailGetGoodsAPI(id)
    goodsDetail.value = result
  }

  return {
    // 获取商品详情
    goodsDetail,
    getGoodsDetail
  }
})
