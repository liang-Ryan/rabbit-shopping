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

// 二级分类数据
export const categoryPostGoodsTemporaryAPI = (reqData) => {
  return request.post('/category/goods/temporary', reqData)
  // reqData {
  // categoryId: route.params.id,
  // page: 1,
  // pageSize: 20,
  // sortField: 'publishTime' // 排序 sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
  // }
}
