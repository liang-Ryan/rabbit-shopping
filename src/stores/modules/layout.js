import { ref } from 'vue'
import { defineStore } from 'pinia'

// API
import { layoutGetCategoryAPI } from '@/api/layout'

export const useLayoutStore = defineStore('layoutStore', () => {
  // =============================
  // 商品分类
  // =============================

  const categoryList = ref([])
  const getCategoryList = async () => {
    const {
      data: { result }
    } = await layoutGetCategoryAPI()
    categoryList.value = result
  }

  // =============================

  return {
    // 商品分类
    categoryList,
    getCategoryList
  }
})
