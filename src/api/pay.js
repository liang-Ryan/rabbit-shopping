import request from '@/utils/request'

// 获取订单信息
export const payGetInfo = (id) => {
  return request.get(`/member/order/${id}`)
}
