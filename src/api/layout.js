import request from '@/utils/request'

export const layoutGetCategoryAPI = () => {
  return request.get('home/category/head')
}
