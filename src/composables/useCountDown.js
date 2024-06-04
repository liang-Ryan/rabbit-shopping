import { ref, computed } from 'vue'
import dayjs from 'dayjs'

// 倒计时功能
export const useCountDown = () => {
  // 倒计时数据
  const time = ref(0)
  const formatTime = computed(() => {
    return dayjs.unix(time.value).format('mm分ss秒')
  })

  // 倒计时函数
  const start = (payTime) => {
    time.value = payTime
    setInterval(() => {
      time.value--
    }, 1000)
  }

  // 导出
  return {
    formatTime,
    start
  }
}
