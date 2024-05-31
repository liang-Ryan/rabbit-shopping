import { ref } from 'vue'
import { defineStore } from 'pinia'

// API
import { homeGetBannerAPI } from '@/api/home'
import { homeGetHotAPI } from '@/api/home'
import { homeGetNewAPI } from '@/api/home'
import { homeGetGoodsAPI } from '@/api/home'

export const useHometStore = defineStore('homeStore', () => {
  // =============================
  // 轮播图数据
  // =============================

  const bannerList = ref([])
  const getBannerList = async (params = {}) => {
    const {
      data: { result }
    } = await homeGetBannerAPI(params)
    bannerList.value = result
  }

  // =============================
  // 人气商品数据
  // =============================

  const hotGoodsList = ref([])
  const getHotGoodsList = async () => {
    const {
      data: { result }
    } = await homeGetHotAPI()
    hotGoodsList.value = result
  }

  // =============================
  // 新鲜好物数据
  // =============================

  const newGoodsList = ref([])
  const getNewGoodsList = async () => {
    const {
      data: { result }
    } = await homeGetNewAPI()
    newGoodsList.value = result
  }

  // =============================
  // 商品列表
  // =============================

  const goodsList = ref([])
  const getGoodsList = async () => {
    const {
      data: { result }
    } = await homeGetGoodsAPI()
    goodsList.value = result
  }

  // =============================

  return {
    // 轮播图数据
    bannerList,
    getBannerList,
    // 人气商品
    hotGoodsList,
    getHotGoodsList,
    // 新鲜好物
    newGoodsList,
    getNewGoodsList,
    // 商品列表
    goodsList,
    getGoodsList
  }
})
