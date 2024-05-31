import { ref } from 'vue'
import { defineStore } from 'pinia'
import { homeGetBannerAPI } from '@/api/home'

export const useHometStore = defineStore('homeStore', () => {
  // =============================
  // 轮播图数据
  // =============================

  const bannerList = ref([])
  const getBannerList = async () => {
    const {
      data: { result }
    } = await homeGetBannerAPI()
    bannerList.value = result
  }

  // =============================

  return {
    // 轮播图数据
    bannerList,
    getBannerList
  }
})
