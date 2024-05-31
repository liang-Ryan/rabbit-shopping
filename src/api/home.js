import request from '@/utils/request'

// 轮播图数据
export const homeGetBannerAPI = (params = {}) => {
  const { distributionSite = '1' } = params
  return request.get('/home/banner', {
    params: {
      distributionSite
    }
  })
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
