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
    // 从购物车删除
    // =============================

    const delCart = (skuId) => {
      const index = cartList.value.findIndex((item) => skuId === item.skuId)

      if (toString(index)) {
        cartList.value.splice(index, 1)
      }
    }

    // =============================
    return {
      // 购物车数据
      cartList,
      cartGoodsTotalCount,
      cartGoodsTotalPrice,
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
