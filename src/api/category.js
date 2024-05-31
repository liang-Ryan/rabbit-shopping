import request from '@/utils/request'

// 获取二级分类列表
export const categoryGetListAPI = (id) => {
  return request.get('/category', {
    params: {
      id
    }
  })
}

// 获取二级分类导航地址
export const categoryGetFilterAPI = (id) => {
  return request.get('/category/sub/filter', {
    params: {
      id
    }
  })
}
