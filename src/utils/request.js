// 通用
import axios from 'axios'
import { useUserStore } from '@/stores'
// import  from 'vue-router'
import router from '@/router'

// 组件
import { ElMessage } from 'element-plus'

// =============================
// 拦截器
// =============================

const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 请求携带token
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 响应成功判断
    return res
  },
  (err) => {
    // 错误特殊情况（权限不足）
    if (err.response?.status === 401) {
      const userStore = useUserStore()
      userStore.userInfo = {}

      const route = router.currentRoute
      router.push({
        path: '/login',
        query: {
          backUrl: route.value.fullPath
        }
      })
    }

    // 响应错误默认处理
    ElMessage.error(err.response.data.message)
    return Promise.reject(err)
  }
)
export default instance
