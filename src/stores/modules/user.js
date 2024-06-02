// 通用
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userPostLoginAPI } from '@/api/user'
import { ElMessage } from 'element-plus'

// API

export const useUserStore = defineStore('userStore', () => {
  // =============================
  // 登录数据
  // =============================

  const userInfo = ref({})
  // const token = ref()

  // =============================
  // 登录请求
  // =============================

  const userLogin = async (form) => {
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
    userLogin
  }
})
