/**
 * 环境判断工具
 */

// 获取环境模式
export const getAppMode = () => {
  return import.meta.env.VITE_APP_MODE || import.meta.env.MODE || 'dev'
}

// 判断是否为测试环境
export const isTestMode = () => {
  return getAppMode() === 'test'
}

// 判断是否为开发环境
export const isDevMode = () => {
  return getAppMode() === 'dev'
}

// 判断是否为生产环境
export const isProdMode = () => {
  return getAppMode() === 'prod'
}

// 判断是否使用Mock数据
export const useMockData = () => {
  return isTestMode()
}

// 获取API基础URL
export const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
}

// 环境信息
export const envInfo = {
  mode: getAppMode(),
  apiBaseUrl: getApiBaseUrl(),
  useMock: useMockData()
}

// 在开发环境下打印环境信息
if (isDevMode()) {
  console.log('🌍 环境信息:', envInfo)
}