import axios from 'axios'
		
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 1000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 请求携带token
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
      console.log('401 权限不足')
    }

    // 响应错误默认处理
    return Promise.reject(err)
  }
)
export default instance
