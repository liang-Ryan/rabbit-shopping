import request from '@/utils/request'

// 获取购物车列表
export const cartGetCartListAPI = () => {
  return request.get('/member/cart')
}

// 加入购物车
export const cartPostAddCartAPI = (skuId, count) => {
  return request.post('/member/cart', {
    skuId,
    count
  })
}

// 删除购物车商品
export const cartDeleteCartAPI = (array) => {
  return request.delete('/member/cart', {
    data: {
      ids: array
    }
  })
}

// 合并购物车
export const cartPostMergeAPI = (array) => {
  return request.post('/member/cart/merge', array)
}
