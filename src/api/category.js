import request from '@/utils/request'

// 获取二级分类列表
export const categoryGetListAPI = (id) => {
  return request.get('/category', {
    params: {
      id
    }
  })
}
