import request from '@/utils/request'

// 商品分类
export const layoutGetCategoryAPI = () => {
  return request.get('home/category/head')
}
