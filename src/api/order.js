import request from '@/utils/request'

export const orderGetOrderInfoAPI = () => {
  return request.get('/member/order/pre')
}
