import request from '@/utils/request'

// 轮播图数据
export const homeGetBannerAPI = () => {
  return request.get('/home/banner')
}

// 人气推荐
export const homeGetHotAPI = () => {
  return request.get('/home/hot')
}

// 新鲜好物
export const homeGetNewAPI = () => {
  return request.get('/home/new')
}

// 商品
export const homeGetGoodsAPI = () => {
  return request.get('/home/goods')
}
