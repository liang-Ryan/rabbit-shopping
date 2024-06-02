import request from '@/utils/request.js'

// 登录
export const userPostLoginAPI = ({ account, password }) => {
  return request.post('/login', {
    account,
    password
  })
}
