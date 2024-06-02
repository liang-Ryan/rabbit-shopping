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

    // =============================
    // 添加到购物车
    // =============================

    const addCart = async (goods) => {
      const item = cartList.value.find((item) => goods.skuId === item.skuId)

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
    return {
      // 购物车数据
      cartList,
      cartGoodsTotalCount,
      cartGoodsTotalPrice,
      // 添加到购物车
      addCart
    }
  },
  {
    persist: { key: 'rabbitShopping-cart' }
  }
)
