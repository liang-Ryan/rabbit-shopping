// 通用
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

// 组件
import { ElMessage } from 'element-plus'

// API
import { userPostLoginAPI } from '@/api/user'

export const useUserStore = defineStore(
  'userStore',
  () => {
    // =============================
    // 用户信息
    // =============================

    const userInfo = ref({})

    // =============================
    // 登录请求
    // =============================

    const getUserInfo = async (form) => {
      const {
        data: { result }
      } = await userPostLoginAPI(form)
      userInfo.value = result
      ElMessage.success('登录成功')
    }

    // =============================
    // 退出登录
    // =============================

    const router = useRouter()

    const logout = () => {
      userInfo.value = {}
      router.push('/login')
      ElMessage.success('退出成功')
    }
    // =============================
    return {
      // 登录数据
      userInfo,
      // 登录请求
      getUserInfo,
      // 退出登录
      logout
    }
  },
  {
    persist: {
      // 开启pinia持久化
      key: 'rabbitShopping-userInfo',
      path: ['userInfo']
    }
  }
)
