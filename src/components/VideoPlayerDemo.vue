<template>
  <div class="player-demo">
    <el-card>
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>视频播放器演示</span>
        </div>
      </template>

      <!-- 模式选择 -->
      <div class="demo-controls" style="margin-bottom: 20px">
        <el-radio-group v-model="demoMode" @change="switchDemoMode">
          <el-radio label="hls">HLS 流演示</el-radio>
          <el-radio label="mp4">MP4 演示</el-radio>
          <el-radio label="custom">自定义 URL</el-radio>
        </el-radio-group>
      </div>

      <!-- 自定义URL输入 -->
      <div v-if="demoMode === 'custom'" style="margin-bottom: 20px">
        <el-input
          v-model="customUrl"
          placeholder="请输入视频URL（.m3u8 或 .mp4）"
          @keyup.enter="playCustomUrl"
        >
          <template #append>
            <el-button @click="playCustomUrl">播放</el-button>
          </template>
        </el-input>
      </div>

      <!-- 播放器 -->
      <VideoPlayer
        :key="videoUrl"
        :hlsUrl="videoUrl"
        :videoInfo="currentVideoInfo"
        :autoplay="true"
        @play="onPlayerPlay"
        @pause="onPlayerPause"
        @ended="onPlayerEnded"
        @error="onPlayerError"
      />

      <!-- 事件日志 -->
      <el-divider />
      <div class="event-log">
        <h3>事件日志：</h3>
        <div class="log-content">
          <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-event">{{ log.event }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VideoPlayer from './VideoPlayer.vue'

const demoMode = ref('hls')
const customUrl = ref('')
const videoUrl = ref('')
const eventLogs = ref([])

const demoVideos = {
  hls: 'https://test-streams.mux.dev/x36xhzz/x3 devon.m3u8',
  mp4: 'https://www.w3schools.com/html/mov_bbb.mp4'
}

const demoVideoInfo = {
  hls: {
    title: 'HLS 示例视频',
    uploadedBy: '系统',
    uploadTime: '2025-12-23T10:00:00',
    description: '这是一个 HLS 格式的演示视频'
  },
  mp4: {
    title: 'MP4 示例视频',
    uploadedBy: '系统',
    uploadTime: '2025-12-23T10:00:00',
    description: '这是一个 MP4 格式的演示视频'
  }
}

const currentVideoInfo = ref(null)

const switchDemoMode = () => {
  customUrl.value = ''
  if (demoMode.value !== 'custom') {
    videoUrl.value = demoVideos[demoMode.value]
    currentVideoInfo.value = demoVideoInfo[demoMode.value]
    addLog(`切换到 ${demoMode.value} 演示模式`)
  }
}

const playCustomUrl = () => {
  if (!customUrl.value) {
    alert('请输入视频URL')
    return
  }
  videoUrl.value = customUrl.value
  currentVideoInfo.value = {
    title: '自定义视频',
    uploadedBy: '用户',
    uploadTime: new Date().toISOString(),
    description: customUrl.value
  }
  addLog(`播放自定义视频: ${customUrl.value}`)
}

const addLog = (event) => {
  const now = new Date()
  const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
  eventLogs.value.unshift({ time, event })
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop()
  }
}

const onPlayerPlay = () => {
  addLog('▶ 播放')
}

const onPlayerPause = () => {
  addLog('⏸ 暂停')
}

const onPlayerEnded = () => {
  addLog('✓ 播放结束')
}

const onPlayerError = (error) => {
  addLog(`✗ 错误: ${error}`)
}

// 初始化
switchDemoMode()
</script>

<style scoped>
.player-demo {
  padding: 20px;
}

.demo-controls {
  display: flex;
  gap: 16px;
}

.event-log {
  margin-top: 20px;
}

.log-content {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #f5f7fa;
  padding: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.log-item {
  display: flex;
  gap: 12px;
  padding: 8px;
  font-size: 12px;
  line-height: 1.5;
  border-bottom: 1px solid #e4e7eb;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #909399;
  min-width: 70px;
  font-family: monospace;
}

.log-event {
  color: #333;
  flex: 1;
}

@media (max-width: 768px) {
  .demo-controls {
    flex-wrap: wrap;
  }
}
</style>
