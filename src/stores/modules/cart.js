import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import { cartPostAddCartAPI } from '@/api/cart'

export const useCartStore = defineStore(
  'cartStore',
  () => {
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
    // 添加到购物车
    // =============================

    const addCart = async (goods) => {
      const item = cartList.value.find((item) => {
        return item.skuId === goods.skuId
      })

      // 本地购物车
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
      // const {
      //   data: { result }
      // } = await cartPostAddCartAPI(skuId, count)
    }

    // =============================
    // 从购物车删除
    // =============================

    const delCart = (skuId) => {
      const index = cartList.value.findIndex((item) => skuId === item.skuId)

      if (toString(index)) {
        // 本地购物车
        cartList.value.splice(index, 1)
      }
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
      // 添加到购物车
      addCart,
      // 从购物车删除
      delCart
    }
  },
  {
    persist: { key: 'rabbitShopping-cart' }
  }
)
