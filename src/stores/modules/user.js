// 通用
import { ref } from 'vue'
import { defineStore } from 'pinia'

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

    return {
      // 登录数据
      userInfo,
      // 登录请求
      getUserInfo
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
