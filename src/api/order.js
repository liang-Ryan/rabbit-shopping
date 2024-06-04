import request from '@/utils/request'

// 获取订单信息
export const orderGetOrderInfoAPI = () => {
  return request.get('/member/order/pre')
}

// 提交订单
export const orderPostOrderAPI = (goods, addressId) => {
  return request.post('/member/order', {
    deliveryTimeType: 1,
    payType: 1,
    payChannel: 1,
    buyerMessage: '',
    goods,
    addressId
  })
}
