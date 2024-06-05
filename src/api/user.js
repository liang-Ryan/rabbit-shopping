import request from '@/utils/request.js'

// 登录
export const userPostLoginAPI = ({ account, password }) => {
  return request.post('/login', {
    account,
    password
  })
}

// 猜你喜欢
export const userGetLikeAPI = (limit = 4) => {
  return request.get('/goods/relevant', {
    params: {
      limit
    }
  })
}

// 个人订单
export const userGerOrderAPI = (params) => {
  return request.get('/member/order', {
    params
  })
}
