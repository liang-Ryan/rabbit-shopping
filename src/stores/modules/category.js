import { ref } from 'vue'
import { defineStore } from 'pinia'

// API
import { homeGetBannerAPI } from '@/api/home'
import {
  categoryGetFilterAPI,
  categoryGetListAPI,
  categoryPostGoodsTemporaryAPI
} from '@/api/category'

export const useCategoryStore = defineStore('categoryStore', () => {
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
  // 二级分类列表数据
  // =============================

  const categoryList = ref({})
  const getCategoryList = async (id) => {
    const {
      data: { result }
    } = await categoryGetListAPI(id)
    categoryList.value = result
  }

  // =============================
  // 二级分类地址
  // =============================

  const subCategoryList = ref({})
  const getSubCategoryList = async (id) => {
    const {
      data: { result }
    } = await categoryGetFilterAPI(id)
    subCategoryList.value = result
  }

  // =============================
  // 二级分类商品数据
  // =============================

  const goodsList = ref([])
  const getGoodsTemporary = async (reqData) => {
    const {
      data: {
        result: { items }
      }
    } = await categoryPostGoodsTemporaryAPI(reqData)
    goodsList.value = items
  }

  // =============================
  // 加载更多
  // =============================

  const loadMore = async (reqData) => {
    const {
      data: {
        result: { items }
      }
    } = await categoryPostGoodsTemporaryAPI(reqData)
    if (items) {
      goodsList.value = [...goodsList.value, ...items]
      return false
    } else {
      // 已加载完所有数据
      return true
    }
  }

  // =============================

  return {
    // 轮播图数据
    categoryBannerList,
    getCategoryBannerList,
    // 二级分类列表数据
    categoryList,
    getCategoryList,
    // 二级分类地址
    subCategoryList,
    getSubCategoryList,
    // 二级分类商品数据
    goodsList,
    getGoodsTemporary,
    loadMore
  }
})
