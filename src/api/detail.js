import request from '@/utils/request'

// 获取商品详情
export const detailGetGoodsAPI = (id) => {
  return request.get('/goods', {
    params: {
      id
    }
  })
}

// 获取热榜商品
export const detailGetHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return request.get('/goods/hot', {
    params: {
      id,
      type,
      limit
    }
  })
}
