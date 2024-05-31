import request from '@/utils/request'

// 获取商品详情
export const detailGetGoodsAPI = (id) => {
  return request.get('/goods', {
    params: {
      id
    }
  })
}
