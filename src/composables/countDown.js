import { computed, onUnmounted } from 'vue'
import { usePayStore } from '@/stores/modules/pay'

// 组件
import dayjs from 'dayjs'

export const useCountDown = () => {
  const payStore = usePayStore()

  // =============================
  // 支付倒计时
  // =============================

  const formatTime = computed(() => {
    return dayjs.unix(payStore.payInfo.countdown).format('mm分ss秒')
  })

  // 倒计时函数
  let interval = null
  const countDown = () => {
    interval = setInterval(() => {
      payStore.payInfo.countdown--
    }, 1000)
  }

  // 销毁计时器
  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })

  return {
    formatTime,
    countDown
  }
}
