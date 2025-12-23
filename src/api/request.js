import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 可以在这里添加 token 等认证信息
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    const { data } = response
    
    // 如果返回的是 blob（文件下载）
    if (response.config.responseType === 'blob') {
      return response
    }
    
    // 假设后端返回的格式为 { code, message, data }
    if (data.code === 0 || response.status === 200) {
      return data
    } else {
      const errorMessage = data.message || '请求失败'
      ElMessage.error({
        message: errorMessage,
        duration: 3000,
        showClose: true
      })
      return Promise.reject(new Error(errorMessage))
    }
  },
  error => {
    let message = '网络错误，请重试'
    let duration = 3000
    
    if (error.response) {
      // 根据不同的状态码提供不同的提示
      switch (error.response.status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未授权，请登录'
          localStorage.removeItem('token')
          break
        case 403:
          message = '禁止访问'
          break
        case 404:
          message = '请求资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务暂时不可用'
          break
        default:
          message = `${error.response.status}: ${error.response.statusText}`
      }
      
      // 获取后端返回的错误信息
      if (error.response.data && error.response.data.message) {
        message = error.response.data.message
      }
    } else if (error.message === 'Network Error') {
      message = '网络连接失败，请检查网络'
    } else if (error.code === 'ECONNABORTED') {
      message = '请求超时，请稍后重试'
      duration = 5000
    }
    
    ElMessage.error({
      message,
      duration,
      showClose: true
    })
    
    return Promise.reject(error)
  }
)

export default instance
