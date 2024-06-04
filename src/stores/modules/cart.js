// 通用
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// store
import { useUserStore } from './user'

// 组件
import { ElMessage } from 'element-plus'

// API
import {
  cartDeleteCartAPI,
  cartGetCartListAPI,
  cartPostAddCartAPI,
  cartPostMergeAPI
} from '@/api/cart'

export const useCartStore = defineStore(
  'cartStore',
  () => {
    // =============================
    // 登录判断
    // =============================

    const userSotre = useUserStore()
    const isLogin = computed(() => userSotre.userInfo.token)

    // =============================
    // 购物车数据
    // =============================

    const cartList = ref([])
    const cartGoodsTotalCount = computed(() => {
      return cartList.value.reduce((total, item) => {
        return total + item.count
      }, 0)
    })
    const cartGoodsTotalPrice = computed(() => {
      return cartList.value.reduce((total, item) => {
        return total + item.price * item.count
      }, 0)
    })
    const cartSelectedList = computed(() => {
      return cartList.value.filter((item) => {
        return item.selected === true
      })
    })
    const cartGoodsSelectedCount = computed(() => {
      return cartSelectedList.value.reduce((total, item) => {
        return total + item.count
      }, 0)
    })
    const cartGoodsSelectedPrice = computed(() => {
      return cartSelectedList.value.reduce((total, item) => {
        return total + item.price * item.count
      }, 0)
    })

    // =============================
    // 单选
    // =============================

    const changeSelected = (skuId, value) => {
      const item = cartList.value.find((item) => {
        return item.skuId === skuId
      })
      item.selected = value
    }

    // =============================
    // 全选
    // =============================

    const isAllSelected = computed(() => {
      return cartList.value.every((item) => {
        return item.selected === true
      })
    })

    const changeAllSelected = (value) => {
      cartList.value.forEach((item) => {
        item.selected = value
      })
    }

    // =============================
    // 获取购物车列表
    // =============================

    const getCartList = async () => {
      const {
        data: { result }
      } = await cartGetCartListAPI()
      cartList.value = result
    }

    // =============================
    // 添加到购物车
    // =============================

    const addCart = async (goods) => {
      if (isLogin.value) {
        // 线上购物车
        await cartPostAddCartAPI(goods.skuId, goods.count)
        getCartList()
      } else {
        // 本地购物车
        const item = cartList.value.find((item) => {
          return item.skuId === goods.skuId
        })

        if (item) {
          item.count += goods.count
        } else {
          cartList.value.push(goods)
        }
      }
    }

    // =============================
    // 从购物车删除
    // =============================

    const delCart = async (skuId) => {
      if (isLogin.value) {
        await cartDeleteCartAPI([skuId])
        getCartList()
      } else {
        // 本地购物车
        const index = cartList.value.findIndex((item) => skuId === item.skuId)
        if (toString(index)) {
          cartList.value.splice(index, 1)
        }
      }
      ElMessage.success('删除成功')
    }

    // =============================
    // 合并购物车
    // =============================

    const mergeCartList = async () => {
      await cartPostMergeAPI(
        cartList.value.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )
      getCartList()
    }

    // =============================

    return {
      // 购物车数据
      cartList,
      cartGoodsTotalCount,
      cartGoodsTotalPrice,
      cartGoodsSelectedCount,
      cartGoodsSelectedPrice,
      // 单选
      changeSelected,
      // 全选
      isAllSelected,
      changeAllSelected,
      // 获取购物车列表
      getCartList,
      // 添加到购物车
      addCart,
      // 从购物车删除
      delCart,
      // 合并购物车
      mergeCartList
    }
  },
  {
    persist: { key: 'rabbitShopping-cart' }
  }
)
