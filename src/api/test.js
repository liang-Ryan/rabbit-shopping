import request from '@/utils/request'

export function getCategoryAPI () {
  return request.get('home/category/head')
}