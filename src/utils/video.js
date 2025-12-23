/**
 * 视频播放器工具和配置
 */

/**
 * HLS 配置
 */
export const HLS_CONFIG = {
  // 调试模式
  debug: false,
  // 启用Web Worker
  enableWorker: true,
  // 低延迟模式
  lowLatencyMode: false,
  // 自动恢复错误
  autoRecoverError: true,
  // 错误恢复尝试次数
  errorRecoveryAttempts: 3
}

/**
 * 视频播放器事件类型
 */
export const PLAYER_EVENTS = {
  PLAY: 'play',
  PAUSE: 'pause',
  ENDED: 'ended',
  ERROR: 'error',
  LOADING: 'loading',
  LOADED: 'loaded'
}

/**
 * 视频格式检测
 */
export const VIDEO_FORMATS = {
  HLS: 'm3u8',
  MP4: 'mp4',
  WEBM: 'webm',
  OGG: 'ogg'
}

/**
 * 检测视频格式
 * @param {string} url 视频URL
 * @returns {string} 格式类型
 */
export const detectVideoFormat = (url) => {
  if (!url) return null

  const urlLower = url.toLowerCase()

  if (urlLower.includes('.m3u8') || urlLower.includes('m3u8')) {
    return VIDEO_FORMATS.HLS
  } else if (urlLower.includes('.mp4') || urlLower.includes('mp4')) {
    return VIDEO_FORMATS.MP4
  } else if (urlLower.includes('.webm') || urlLower.includes('webm')) {
    return VIDEO_FORMATS.WEBM
  } else if (urlLower.includes('.ogg') || urlLower.includes('ogg')) {
    return VIDEO_FORMATS.OGG
  }

  return null
}

/**
 * 检测浏览器是否支持HLS
 * @returns {boolean}
 */
export const isHLSSupported = () => {
  // 检查hls.js支持
  if (typeof window !== 'undefined' && window.HLS) {
    return true
  }

  // 检查原生HLS支持（Safari等）
  const video = document.createElement('video')
  return video.canPlayType('application/vnd.apple.mpegurl') !== ''
}

/**
 * 验证视频URL
 * @param {string} url 视频URL
 * @returns {boolean}
 */
export const isValidVideoUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false
  }

  try {
    new URL(url)
    const format = detectVideoFormat(url)
    return format !== null
  } catch (e) {
    return false
  }
}

/**
 * 格式化播放时间
 * @param {number} seconds 秒数
 * @returns {string} 格式化的时间字符串 (mm:ss)
 */
export const formatPlayTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * 检测网络连接
 * @returns {boolean}
 */
export const isOnline = () => {
  return typeof navigator !== 'undefined' && navigator.onLine
}

/**
 * 获取视频类型MIME
 * @param {string} format 视频格式
 * @returns {string} MIME类型
 */
export const getVideoMimeType = (format) => {
  const mimeTypes = {
    [VIDEO_FORMATS.HLS]: 'application/vnd.apple.mpegurl',
    [VIDEO_FORMATS.MP4]: 'video/mp4',
    [VIDEO_FORMATS.WEBM]: 'video/webm',
    [VIDEO_FORMATS.OGG]: 'video/ogg'
  }

  return mimeTypes[format] || ''
}

/**
 * 视频播放器错误代码
 */
export const PLAYER_ERROR_CODES = {
  MEDIA_ERR_UNKNOWN: 0,
  MEDIA_ERR_ABORTED: 1,
  MEDIA_ERR_NETWORK: 2,
  MEDIA_ERR_DECODE: 3,
  MEDIA_ERR_SRC_NOT_SUPPORTED: 4,
  HLS_ERROR_NETWORK: 'hls_network',
  HLS_ERROR_MEDIA: 'hls_media',
  HLS_ERROR_MANIFEST: 'hls_manifest'
}

/**
 * 获取错误描述
 * @param {number} code 错误代码
 * @returns {string} 错误描述
 */
export const getErrorMessage = (code) => {
  const messages = {
    [PLAYER_ERROR_CODES.MEDIA_ERR_UNKNOWN]: '发生未知错误',
    [PLAYER_ERROR_CODES.MEDIA_ERR_ABORTED]: '视频加载已中止',
    [PLAYER_ERROR_CODES.MEDIA_ERR_NETWORK]: '网络错误',
    [PLAYER_ERROR_CODES.MEDIA_ERR_DECODE]: '视频解码错误',
    [PLAYER_ERROR_CODES.MEDIA_ERR_SRC_NOT_SUPPORTED]: '不支持该视频格式',
    [PLAYER_ERROR_CODES.HLS_ERROR_NETWORK]: 'HLS网络错误',
    [PLAYER_ERROR_CODES.HLS_ERROR_MEDIA]: 'HLS媒体错误',
    [PLAYER_ERROR_CODES.HLS_ERROR_MANIFEST]: 'HLS清单错误'
  }

  return messages[code] || '视频加载失败'
}
