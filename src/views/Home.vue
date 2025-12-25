<template>
  <div class="home-container">
    <!-- 页面头部 -->
    <div class="home-header">
      <div class="header-content">
        <h1>📺 发现精彩视频</h1>
        <p>海量高清内容，尽在RTMPlayer</p>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">{{ totalVideos }}</span>
            <span class="stat-label">精彩视频</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">HD</span>
            <span class="stat-label">高清画质</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <span class="stat-label">全天播放</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div class="search-section">
      <div class="search-container">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索你感兴趣的视频内容..."
          clearable
          @input="handleSearch"
          class="search-input"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <div class="search-suggestions">
          <el-tag size="small" effect="plain" @click="searchKeyword = '热门'">热门</el-tag>
          <el-tag size="small" effect="plain" @click="searchKeyword = '教程'">教程</el-tag>
          <el-tag size="small" effect="plain" @click="searchKeyword = '音乐'">音乐</el-tag>
          <el-tag size="small" effect="plain" @click="searchKeyword = '电影'">电影</el-tag>
        </div>
      </div>
    </div>

    <!-- 主要内容区 -->
    <el-row :gutter="20" style="margin-bottom: 30px">
      <!-- 播放器区 -->
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <div class="player-section">
          <div class="bili-card player-card">
            <div class="card-header">
              <div class="player-title">
                <h3>{{ currentVideo?.title || '选择视频观看' }}</h3>
                <div class="player-meta" v-if="currentVideo">
                  <el-tag type="success" size="small">正在播放</el-tag>
                  <span class="upload-info">{{ currentVideo.uploadedBy }}</span>
                  <span class="view-count">
                    <el-icon><VideoPlay /></el-icon>
                    {{ currentVideo.views }} 次观看
                  </span>
                </div>
              </div>
            </div>

            <div class="card-body">
              <div v-if="currentVideo" class="player-wrapper">
                <VideoPlayer
                  :key="currentVideo.id"
                  :videoUrl="currentVideo.videoUrl"
                  :hlsUrl="currentVideo.hlsUrl"
                  :videoInfo="currentVideo"
                  :autoplay="true"
                  @play="onVideoPlay"
                  @pause="onVideoPause"
                  @ended="onVideoEnded"
                  @error="onVideoError"
                />
              </div>
              <div v-else class="empty-player">
                <Empty description="请从播放列表中选择视频观看" :showButton="false" />
              </div>
            </div>
          </div>
        </div>
      </el-col>

      <!-- 视频列表区 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <div class="playlist-section">
          <div class="bili-card playlist-card">
            <div class="card-header">
              <div class="playlist-header">
                <h3>📝 播放列表</h3>
                <span class="video-count">{{ filteredVideos.length }} 个视频</span>
              </div>
            </div>

            <div class="card-body">
              <!-- 加载状态 -->
              <el-skeleton v-if="loading" :rows="5" animated />

              <!-- 空状态 -->
              <Empty
                v-else-if="filteredVideos.length === 0"
                description="暂无视频"
                :showButton="false"
                :imageSize="100"
              />

              <!-- 视频列表 -->
              <div v-else class="video-list">
                <div
                  v-for="video in filteredVideos"
                  :key="video.id"
                  class="video-item"
                  :class="{ active: currentVideo?.id === video.id }"
                  @click="selectVideo(video)"
                >
                  <div class="video-item-cover">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect fill='%23f0f0f0' width='400' height='225'/%3E%3Ctext x='200' y='120' text-anchor='middle' fill='%23999' font-size='16'%3E视频封面%3C/text%3E%3C/svg%3E" :alt="video.title" loading="lazy" />
                    <div class="play-overlay" v-if="currentVideo?.id === video.id">
                      <el-icon><VideoPlay /></el-icon>
                    </div>
                  </div>
                  <div class="video-item-info">
                    <h4>{{ video.title }}</h4>
                    <p class="meta">
                      <span class="upload-time">{{ formatTime(video.createTime) }}</span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- 分页 -->
              <div v-if="totalVideos > pageSize" class="pagination">
                <el-pagination
                  v-model:current-page="currentPage"
                  :page-size="pageSize"
                  :total="totalVideos"
                  layout="prev, pager, next"
                  @current-change="loadVideos"
                  small
                />
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 相关推荐 -->
    <div v-if="recommendedVideos.length > 0" class="recommended-section">
      <div class="section-header">
        <h2>🎯 为你推荐</h2>
        <span class="section-desc">根据你的观看记录为你推荐更多精彩内容</span>
      </div>
      <div class="video-grid">
        <div
          v-for="video in recommendedVideos.slice(0, 6)"
          :key="video.id"
          class="bili-card video-card"
          @click="selectVideo(video)"
        >
          <div class="video-card-cover">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect fill='%23f0f0f0' width='400' height='225'/%3E%3Ctext x='200' y='120' text-anchor='middle' fill='%23999' font-size='16'%3E视频封面%3C/text%3E%3C/svg%3E" :alt="video.title" loading="lazy" />
            <div class="play-button">
              <el-icon><VideoPlay /></el-icon>
            </div>
          </div>

          <div class="video-card-body">
            <h3 class="video-title">{{ video.title }}</h3>
            <div class="video-meta">
              <span class="upload-time">{{ formatTime(video.createTime) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useVideoStore } from '@/stores/video'
import { getVideos } from '@/api/video'
import { fetchMockVideos, searchMockVideos } from '@/utils/mockData'
import { useMessage } from '@/utils/message'
import VideoPlayer from '@/components/VideoPlayer.vue'
import Empty from '@/components/Empty.vue'
import { Search, VideoPlay } from '@element-plus/icons-vue'

const videoStore = useVideoStore()

// 状态
const videos = ref([])
const currentVideo = ref(null)
const loading = ref(false)
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(6)
const totalVideos = ref(0)
const searchResults = ref(null)

// 计算属性
const filteredVideos = computed(() => {
  // 如果有搜索结果，显示搜索结果；否则显示分页后的视频列表
  if (searchResults.value !== null) {
    return searchResults.value
  }
  return videos.value
})

const recommendedVideos = computed(() => {
  // 从视频列表中随机推荐（实际应该由后端返回）
  const allVideos = searchResults.value || videos.value
  return allVideos.filter((v) => v.id !== currentVideo.value?.id)
})

/**
 * 加载视频列表
 */
const loadVideos = async (page = 1) => {
  loading.value = true
  try {
    // 使用真实API调用
    const response = await getVideos({ page, pageSize: pageSize.value })
    // 备用mock数据调用
    // const response = await fetchMockVideos(page, pageSize.value)

    // 处理新的API响应格式
    if (response.code === 200) {
      videos.value = response.data
      totalVideos.value = response.data.length
      currentPage.value = page
      searchResults.value = null // 重置搜索结果

      // 如果没有选中的视频，自动选中第一个
      if (!currentVideo.value && videos.value.length > 0) {
        selectVideo(videos.value[0])
      }

      videoStore.setVideoList(videos.value)
    } else {
      useMessage.error(response.msg || '获取视频列表失败')
    }
  } catch (error) {
    console.error('获取视频列表失败:', error)
    useMessage.error('获取视频列表失败，请重试')
  } finally {
    loading.value = false
  }
}

/**
 * 搜索视频
 */
const handleSearch = async () => {
  if (!searchKeyword.value.trim()) {
    // 清空搜索
    searchResults.value = null
    loadVideos(1)
    return
  }

  loading.value = true
  try {
    // 这里可以切换为真实API调用
    // const response = await getVideos({ keyword: searchKeyword.value })
    const response = await searchMockVideos(searchKeyword.value)

    searchResults.value = response.data
    totalVideos.value = response.total

    if (response.data.length > 0) {
      selectVideo(response.data[0])
    } else {
      useMessage.info('未找到匹配的视频')
    }
  } catch (error) {
    console.error('搜索视频失败:', error)
    useMessage.error('搜索视频失败，请重试')
  } finally {
    loading.value = false
  }
}

/**
 * 选中视频
 */
const selectVideo = (video) => {
  currentVideo.value = video
  videoStore.setCurrentVideo(video)
  useMessage.success(`已选择: ${video.title}`, 1500)
}

/**
 * 格式化时间
 */
const formatTime = (timeString) => {
  if (!timeString) return '未知时间'
  try {
    const date = new Date(timeString)
    return date.toLocaleString('zh-CN')
  } catch {
    return '未知时间'
  }
}

/**
 * 视频播放事件
 */
const onVideoPlay = () => {
  console.log('视频开始播放:', currentVideo.value?.title)
}

const onVideoPause = () => {
  console.log('视频暂停:', currentVideo.value?.title)
}

const onVideoEnded = () => {
  console.log('视频播放结束:', currentVideo.value?.title)
  // 自动播放下一个视频
  const currentIndex = filteredVideos.value.findIndex((v) => v.id === currentVideo.value.id)
  if (currentIndex < filteredVideos.value.length - 1) {
    selectVideo(filteredVideos.value[currentIndex + 1])
  }
}

const onVideoError = (error) => {
  console.error('视频播放错误:', error)
  useMessage.error(`播放错误: ${error}`)
}

onMounted(() => {
  loadVideos(1)
})

// 监听搜索关键词变化
watch(searchKeyword, () => {
  currentPage.value = 1
})
</script>

<style scoped>
.home-container {
  padding: 24px;
  background: var(--bili-bg);
  min-height: calc(100vh - 64px);
}

.home-header {
  background: var(--bili-card);
  border-radius: var(--bili-radius);
  box-shadow: var(--bili-shadow);
  margin-bottom: 32px;
  overflow: hidden;
}

.header-content {
  text-align: center;
  padding: 48px 24px;
  background: linear-gradient(135deg, var(--bili-primary), var(--bili-pink));
  color: white;
}

.header-content h1 {
  font-size: 32px;
  margin-bottom: 12px;
  font-weight: 700;
}

.header-content p {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.header-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

.search-section {
  margin-bottom: 32px;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: var(--bili-radius);
  box-shadow: var(--bili-shadow);
  border: 2px solid transparent;
  transition: all 0.2s;
}

.search-input :deep(.el-input__wrapper:hover) {
  border-color: var(--bili-primary);
}

.search-input :deep(.el-input__wrapper.is-focus) {
  border-color: var(--bili-primary);
  box-shadow: 0 0 0 3px rgba(0,161,214,0.1);
}

.search-suggestions {
  margin-top: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.search-suggestions .el-tag {
  cursor: pointer;
  transition: all 0.2s;
}

.search-suggestions .el-tag:hover {
  background: var(--bili-primary);
  color: white;
}

.bili-card {
  background: var(--bili-card);
  border-radius: var(--bili-radius);
  box-shadow: var(--bili-shadow);
  border: 1px solid var(--bili-border);
  overflow: hidden;
  transition: all 0.2s;
}

.bili-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  transform: translateY(-2px);
}

.card-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--bili-border);
}

.card-body {
  padding: 20px 24px;
}

.player-title h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--bili-text);
}

.player-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.upload-info, .view-count {
  font-size: 14px;
  color: var(--bili-text-secondary);
}

.player-wrapper {
  border-radius: 12px;
  overflow: hidden;
  background: #000;
}

.empty-player {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bili-bg);
  border-radius: 12px;
}

.playlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.playlist-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--bili-text);
}

.video-count {
  font-size: 14px;
  color: var(--bili-text-secondary);
  padding: 4px 12px;
  background: var(--bili-bg);
  border-radius: 12px;
}

.playlist-card {
  max-height: 680px;
}

.playlist-card .card-body {
  padding: 0;
}

.video-list {
  max-height: 560px;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.video-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--bili-bg);
  border: 2px solid transparent;
}

.video-item:hover {
  background: white;
  border-color: var(--bili-primary);
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0,161,214,0.1);
}

.video-item.active {
  background: linear-gradient(135deg, var(--bili-primary), var(--bili-pink));
  color: white;
  border-color: transparent;
}

.video-item-cover {
  position: relative;
  width: 96px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.video-item-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.duration {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.video-item-info {
  flex: 1;
  min-width: 0;
}

.video-item-info h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  margin: 8px 0;
  font-size: 12px;
  color: var(--bili-text-secondary);
  display: flex;
  gap: 12px;
}

.video-item.active .meta {
  color: rgba(255, 255, 255, 0.8);
}

.views {
  margin: 8px 0 0 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--bili-text-secondary);
}

.video-item.active .views {
  color: rgba(255, 255, 255, 0.8);
}

.pagination {
  padding: 16px;
  text-align: center;
  border-top: 1px solid var(--bili-border);
}

.recommended-section {
  margin-top: 48px;
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 28px;
  margin-bottom: 8px;
  color: var(--bili-text);
  font-weight: 700;
}

.section-desc {
  font-size: 16px;
  color: var(--bili-text-secondary);
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.video-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.video-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.15);
}

.video-card-cover {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  background: #000;
}

.video-card-cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.video-card:hover .video-card-cover img {
  transform: scale(1.05);
}

.duration-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  background: var(--bili-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  opacity: 0;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(0,161,214,0.3);
}

.video-card:hover .play-button {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.1);
}

.video-card-body {
  padding: 20px;
}

.video-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--bili-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--bili-text-secondary);
}

.uploader {
  font-weight: 500;
}

.video-desc {
  margin: 0;
  font-size: 14px;
  color: var(--bili-text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .home-container {
    padding: 20px;
  }
  
  .header-stats {
    gap: 32px;
  }
  
  .video-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 16px;
  }

  .header-content {
    padding: 32px 20px;
  }
  
  .header-content h1 {
    font-size: 24px;
  }
  
  .header-stats {
    gap: 24px;
    flex-wrap: wrap;
  }
  
  .stat-number {
    font-size: 20px;
  }

  .playlist-card {
    max-height: none;
  }

  .video-item-cover {
    width: 80px;
    height: 60px;
  }
  
  .video-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .card-header,
  .card-body {
    padding: 16px;
  }
}
</style>
