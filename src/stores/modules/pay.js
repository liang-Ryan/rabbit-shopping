import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

// 组件
import dayjs from 'dayjs'

// API
import { payGetInfo } from '@/api/pay'

export const usePayStore = defineStore('payStore', () => {
  // =============================
  // 获取订单信息
  // =============================

  const payInfo = ref({})

  const getPayInfo = async (id) => {
    const {
      data: { result }
    } = await payGetInfo(id)
    payInfo.value = result
  }

  // =============================
  // 支付地址
  // =============================

  const route = useRoute()

  const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
  const backURL = 'http://127.0.0.1:5173/paycallback'
  const redirectUrl = encodeURIComponent(backURL)
  const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`

  // 支付宝沙箱账号：jfjbwb4477@sandbox.com
  // 支付宝沙箱登录密码：111111
  // 支付宝沙箱支付密码：111111

  // =============================
  // 支付倒计时
  // =============================

  const formatTime = computed(() => {
    return dayjs.unix(payInfo.value.countdown).format('mm分ss秒')
  })

  // 倒计时函数
  let interval = null
  const countDown = () => {
    interval = setInterval(() => {
      payInfo.value.countdown--
    }, 1000)
  }

  // =============================

  return {
    // 获取订单信息
    payInfo,
    getPayInfo,
    // 支付地址
    payUrl,
    // 支付倒计时
    formatTime,
    interval,
    countDown
  }
})
