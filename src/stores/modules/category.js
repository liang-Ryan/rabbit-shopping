import { ref } from 'vue'
import { defineStore } from 'pinia'

// API
import { categoryGetListAPI } from '@/api/category'
import { homeGetBannerAPI } from '@/api/home'

export const useCategoryStore = defineStore('categoryStore', () => {
  // =============================
  // 二级分类数据
  // =============================

  const categoryList = ref({})
  const getCategoryList = async (id) => {
    const {
      data: { result }
    } = await categoryGetListAPI(id)
    categoryList.value = result
  }

  // =============================
  // 轮播图数据
  // =============================

  const categoryBannerList = ref([])
  const getCategoryBannerList = async () => {
    const {
      data: { result }
    } = await homeGetBannerAPI({
      distributionSite: 2
    })
    categoryBannerList.value = result
  }

  // =============================

  return {
    // 二级分类数据
    categoryList,
    getCategoryList,
    // 轮播图数据
    categoryBannerList,
    getCategoryBannerList
  }
})
