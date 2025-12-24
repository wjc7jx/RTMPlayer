<template>
  <div class="video-player-wrapper">
    <div class="video-container">
      <video
        ref="videoElement"
        class="video-player"
        controls
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect fill='%23000' width='800' height='600'/%3E%3C/svg%3E"
      >
        <source :src="currentSource" type="video/mp4" />
        您的浏览器不支持视频播放
      </video>

      <!-- 加载中遮罩 -->
      <div v-if="loading" class="loading-overlay">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
        <p>加载中...</p>
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="error-overlay">
        <el-icon class="error-icon">
          <CircleCloseFilled />
        </el-icon>
        <p>{{ error }}</p>
        <el-button type="primary" size="small" @click="retry">重试</el-button>
      </div>
    </div>

    <!-- 视频信息 -->
    <div v-if="videoInfo" class="video-info">
      <div class="info-header">
        <h2 class="video-title">{{ videoInfo.title || '无标题' }}</h2>
        <div class="video-meta">
          <span class="upload-by">
            <el-icon><User /></el-icon>
            {{ videoInfo.uploadedBy || '未知上传者' }}
          </span>
          <span class="upload-time">
            <el-icon><Clock /></el-icon>
            {{ formatTime(videoInfo.uploadTime) }}
          </span>
        </div>
      </div>
      <div v-if="videoInfo.description" class="video-description">
        <p>{{ videoInfo.description }}</p>
      </div>
    </div>

    <!-- 控制栏 -->
    <div class="player-controls">
      <el-button
        v-if="!isPlaying"
        type="primary"
        size="small"
        @click="play"
      >
        <el-icon><VideoPlay /></el-icon>
        播放
      </el-button>
      <el-button
        v-else
        size="small"
        @click="pause"
      >
        <el-icon><VideoPause /></el-icon>
        暂停
      </el-button>

      <el-button size="small" @click="toggleFullscreen">
        <el-icon><FullScreen /></el-icon>
        全屏
      </el-button>

      <div class="spacer"></div>

      <span class="current-time">
        {{ formatCurrentTime() }} / {{ formatDuration() }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import HLS from 'hls.js'
import {
  Loading,
  CircleCloseFilled,
  User,
  Clock,
  VideoPlay,
  VideoPause,
  FullScreen
} from '@element-plus/icons-vue'

const props = defineProps({
  // HLS播放地址或普通视频地址
  hlsUrl: {
    type: String,
    required: true
  },
  // 视频信息
  videoInfo: {
    type: Object,
    default: null
  },
  // 是否自动播放
  autoplay: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['play', 'pause', 'ended', 'error'])

const videoElement = ref(null)
const hls = ref(null)
const loading = ref(false)
const error = ref('')
const isPlaying = ref(false)
const volume = ref(1)
const currentTime = ref(0)
const duration = ref(0)

const currentSource = computed(() => {
  // 如果是HLS地址且浏览器支持，使用HLS.js
  if (props.hlsUrl && props.hlsUrl.endsWith('.m3u8')) {
    return null // HLS会由hls.js处理
  }
  return props.hlsUrl
})

/**
 * 初始化播放器
 */
const initPlayer = () => {
  if (!videoElement.value || !props.hlsUrl) return

  loading.value = true
  error.value = ''

  // 处理HLS流
  if (props.hlsUrl.endsWith('.m3u8')) {
    if (HLS.isSupported()) {
      if (hls.value) {
        hls.value.destroy()
      }

      hls.value = new HLS({
        debug: false,
        enableWorker: true,
        lowLatencyMode: false
      })

      hls.value.loadSource(props.hlsUrl)
      hls.value.attachMedia(videoElement.value)

      hls.value.on(HLS.Events.MANIFEST_PARSED, () => {
        loading.value = false
        if (props.autoplay) {
          videoElement.value.play()
        }
      })

      hls.value.on(HLS.Events.ERROR, (event, data) => {
        handleHLSError(event, data)
      })
    } else if (videoElement.value.canPlayType('application/vnd.apple.mpegurl')) {
      // 某些浏览器原生支持HLS
      videoElement.value.src = props.hlsUrl
      loading.value = false
      if (props.autoplay) {
        videoElement.value.play()
      }
    } else {
      error.value = '浏览器不支持HLS播放'
      loading.value = false
      emit('error', error.value)
    }
  } else {
    // 处理普通视频
    videoElement.value.src = props.hlsUrl
    loading.value = false
    if (props.autoplay) {
      videoElement.value.play()
    }
  }
}

/**
 * 处理HLS错误
 */
const handleHLSError = (event, data) => {
  console.error('HLS Error:', data)

  if (data.fatal) {
    switch (data.type) {
      case HLS.ErrorTypes.NETWORK_ERROR:
        error.value = '网络错误：无法加载视频资源'
        break
      case HLS.ErrorTypes.MEDIA_ERROR:
        error.value = '媒体错误：无法解析视频'
        break
      default:
        error.value = `致命错误：${data.details}`
    }
    loading.value = false
    emit('error', error.value)
  }
}

/**
 * 播放
 */
const play = () => {
  if (videoElement.value) {
    videoElement.value.play()
  }
}

/**
 * 暂停
 */
const pause = () => {
  if (videoElement.value) {
    videoElement.value.pause()
  }
}

/**
 * 切换全屏
 */
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoElement.value?.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

/**
 * 更新音量
 */
const updateVolume = () => {
  if (videoElement.value) {
    videoElement.value.volume = volume.value
  }
}

/**
 * 重试
 */
const retry = () => {
  error.value = ''
  initPlayer()
}

/**
 * 格式化时间（秒 -> mm:ss）
 */
const formatTime = (time) => {
  if (!time) return '未知时间'
  if (typeof time === 'string') return time

  const date = new Date(time)
  return date.toLocaleDateString('zh-CN')
}

/**
 * 格式化当前时间
 */
const formatCurrentTime = () => {
  return formatSeconds(currentTime.value)
}

/**
 * 格式化总时长
 */
const formatDuration = () => {
  return formatSeconds(duration.value)
}

/**
 * 将秒数转换为 mm:ss 格式
 */
const formatSeconds = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00'

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)

  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * 监听视频事件
 */
const setupVideoListeners = () => {
  if (!videoElement.value) return

  videoElement.value.addEventListener('play', () => {
    isPlaying.value = true
    emit('play')
  })

  videoElement.value.addEventListener('pause', () => {
    isPlaying.value = false
    emit('pause')
  })

  videoElement.value.addEventListener('ended', () => {
    isPlaying.value = false
    emit('ended')
  })

  videoElement.value.addEventListener('timeupdate', () => {
    currentTime.value = videoElement.value.currentTime
  })

  videoElement.value.addEventListener('loadedmetadata', () => {
    duration.value = videoElement.value.duration
  })

  videoElement.value.addEventListener('error', () => {
    error.value = '视频加载失败'
    emit('error', error.value)
  })
}

/**
 * 清理资源
 */
const cleanup = () => {
  if (hls.value) {
    hls.value.destroy()
    hls.value = null
  }

  if (videoElement.value) {
    videoElement.value.pause()
    videoElement.value.src = ''
    videoElement.value.load()
  }
}

/**
 * 监听hlsUrl变化
 */
watch(
  () => props.hlsUrl,
  (newUrl) => {
    if (newUrl) {
      cleanup()
      initPlayer()
    }
  }
)

onMounted(() => {
  setupVideoListeners()
  initPlayer()
})

onBeforeUnmount(() => {
  cleanup()
})

// 暴露方法供外部调用
defineExpose({
  play,
  pause,
  toggleFullscreen,
  getCurrentTime: () => currentTime.value,
  getDuration: () => duration.value,
  setVolume: (vol) => {
    volume.value = vol
    updateVolume()
  }
})
</script>

<style scoped>
.video-player-wrapper {
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  background: #000;
  overflow: hidden;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 10;
}

.loading-overlay .el-icon {
  font-size: 48px;
  margin-bottom: 16px;
  animation: spin 1s linear infinite;
}

.error-overlay {
  background: rgba(0, 0, 0, 0.9);
}

.error-overlay .error-icon {
  font-size: 48px;
  color: #f56c6c;
  margin-bottom: 16px;
}

.error-overlay p {
  font-size: 16px;
  margin-bottom: 16px;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.video-info {
  background: #fff;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.info-header {
  margin-bottom: 12px;
}

.video-title {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.video-meta {
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: #666;
}

.upload-by,
.upload-time {
  display: flex;
  align-items: center;
  gap: 6px;
}

.video-description {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-top: 1px solid #f0f0f0;
}

.spacer {
  flex: 1;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 150px;
}

.current-time {
  font-size: 12px;
  color: #666;
  min-width: 80px;
  text-align: right;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .video-info {
    padding: 12px;
  }

  .video-title {
    font-size: 16px;
  }

  .video-meta {
    gap: 12px;
    font-size: 12px;
  }

  .player-controls {
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 12px;
  }

  .volume-control {
    display: none;
  }

  .current-time {
    order: -1;
  }
}
</style>
