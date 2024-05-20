import { ref } from 'vue'
import { defineStore } from 'pinia'
import { layoutGetBannerAPI } from '@/api/home'

export const useHometStore = defineStore('homeStore', () => {
  // =============================
  // 轮播图数据
  // =============================

  const bannerList = ref([])
  const getBannerList = async () => {
    const {
      data: { result }
    } = await layoutGetBannerAPI()
    bannerList.value = result
  }

  // =============================

  return {
    // 轮播图数据
    bannerList,
    getBannerList
  }
})
