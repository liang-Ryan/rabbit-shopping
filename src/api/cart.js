import request from '@/utils/request'

// 加入购物车
export const cartPostAddCartAPI = (skuId, count) => {
  return request.post('/member/cart', {
    skuId,
    count
  })
}
