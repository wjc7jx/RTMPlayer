import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * 消息提示工具类
 */
export const useMessage = {
  /**
   * 成功提示
   * @param {string} message 提示信息
   * @param {number} duration 显示时长（毫秒）
   */
  success(message, duration = 3000) {
    ElMessage.success({
      message,
      duration,
      showClose: true
    })
  },

  /**
   * 错误提示
   * @param {string} message 提示信息
   * @param {number} duration 显示时长（毫秒）
   */
  error(message, duration = 3000) {
    ElMessage.error({
      message,
      duration,
      showClose: true
    })
  },

  /**
   * 警告提示
   * @param {string} message 提示信息
   * @param {number} duration 显示时长（毫秒）
   */
  warning(message, duration = 3000) {
    ElMessage.warning({
      message,
      duration,
      showClose: true
    })
  },

  /**
   * 信息提示
   * @param {string} message 提示信息
   * @param {number} duration 显示时长（毫秒）
   */
  info(message, duration = 3000) {
    ElMessage.info({
      message,
      duration,
      showClose: true
    })
  },

  /**
   * 加载提示
   * @param {string} message 提示信息
   */
  loading(message = '加载中...') {
    return ElMessage.loading({
      message,
      duration: 0,
      showClose: false
    })
  },

  /**
   * 确认对话框
   * @param {string} title 标题
   * @param {string} content 内容
   * @param {object} options 其他选项
   */
  confirm(title, content, options = {}) {
    return ElMessageBox.confirm(content, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      ...options
    })
  },

  /**
   * 删除确认对话框
   * @param {string} content 确认信息
   */
  confirmDelete(content = '确定要删除吗？') {
    return ElMessageBox.confirm(content, '删除确认', {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
      confirmButtonClass: 'el-button--danger'
    })
  }
}
