import request from '@/utils/request'

// 轮播图数据
export const layoutGetBannerAPI = () => {
  return request.get('/home/banner')
}
