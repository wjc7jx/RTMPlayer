<template>
  <div class="home-container">
    <!-- 页面头部 -->
    <div class="home-header">
      <h1>📺 视频中心</h1>
      <p>发现精彩视频，享受高清观影体验</p>
    </div>

    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索视频标题..."
        clearable
        @input="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 主要内容区 -->
    <el-row :gutter="20" style="margin-bottom: 30px">
      <!-- 播放器区 -->
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <div class="player-section">
          <el-card class="player-card">
            <template #header>
              <div style="display: flex; justify-content: space-between; align-items: center">
                <span>{{ currentVideo?.title || '选择视频观看' }}</span>
                <el-tag v-if="currentVideo" type="success">正在播放</el-tag>
              </div>
            </template>

            <div v-if="currentVideo">
              <VideoPlayer
                :key="currentVideo.id"
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
              <Empty description="请从左侧选择视频观看" :showButton="false" />
            </div>
          </el-card>
        </div>
      </el-col>

      <!-- 视频列表区 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <div class="playlist-section">
          <el-card class="playlist-card">
            <template #header>
              <span>📝 播放列表 ({{ filteredVideos.length }})</span>
            </template>

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
                  <img :src="video.cover" :alt="video.title" />
                  <div class="duration">{{ video.duration }}</div>
                </div>
                <div class="video-item-info">
                  <h4>{{ video.title }}</h4>
                  <p class="meta">
                    <span class="uploader">{{ video.uploadedBy }}</span>
                  </p>
                  <p class="views">
                    <el-icon style="vertical-align: middle"><VideoPlay /></el-icon>
                    {{ video.views }} 次观看
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
              />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!-- 相关推荐 -->
    <div v-if="recommendedVideos.length > 0" class="recommended-section">
      <h2>🎯 推荐视频</h2>
      <el-row :gutter="20">
        <el-col
          v-for="video in recommendedVideos.slice(0, 3)"
          :key="video.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <el-card class="video-card" shadow="hover" @click="selectVideo(video)">
            <template #header>
              <div class="video-card-header">
                <img :src="video.cover" :alt="video.title" class="video-card-cover" />
                <div class="duration-badge">{{ video.duration }}</div>
              </div>
            </template>

            <div class="video-card-body">
              <h3>{{ video.title }}</h3>
              <p class="video-card-meta">
                <span>{{ video.uploadedBy }}</span>
              </p>
              <p class="video-card-desc">{{ video.description }}</p>
              <div class="video-card-stats">
                <span class="views">
                  <el-icon><VideoPlay /></el-icon>
                  {{ video.views }}
                </span>
                <el-button
                  type="primary"
                  size="small"
                  @click.stop="selectVideo(video)"
                >
                  播放
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
    // 这里可以切换为真实API调用
    // const response = await getVideos({ page, pageSize: pageSize.value })
    const response = await fetchMockVideos(page, pageSize.value)

    videos.value = response.data
    totalVideos.value = response.total
    currentPage.value = page
    searchResults.value = null // 重置搜索结果

    // 如果没有选中的视频，自动选中第一个
    if (!currentVideo.value && videos.value.length > 0) {
      selectVideo(videos.value[0])
    }

    videoStore.setVideoList(videos.value)
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
  padding: 20px;
}

.home-header {
  text-align: center;
  margin-bottom: 30px;
}

.home-header h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #333;
}

.home-header p {
  font-size: 16px;
  color: #666;
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar :deep(.el-input) {
  max-width: 400px;
}

.player-section {
  margin-bottom: 20px;
}

.player-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.empty-player {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.playlist-section {
  margin-bottom: 20px;
}

.playlist-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 600px;
  overflow-y: auto;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.video-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f9f9f9;
}

.video-item:hover {
  background: #f0f0f0;
  transform: translateX(4px);
}

.video-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.video-item-cover {
  position: relative;
  width: 80px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 6px;
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
  border-radius: 3px;
  font-size: 12px;
}

.video-item-info {
  flex: 1;
  min-width: 0;
}

.video-item-info h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 6px;
}

.meta {
  margin: 4px 0;
  font-size: 12px;
  color: #999;
}

.video-item.active .meta {
  color: rgba(255, 255, 255, 0.8);
}

.views {
  margin: 4px 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.video-item.active .views {
  color: rgba(255, 255, 255, 0.8);
}

.pagination {
  margin-top: 16px;
  text-align: center;
}

.pagination :deep(.el-pagination) {
  justify-content: center;
}

.recommended-section {
  margin-top: 40px;
}

.recommended-section h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
}

.video-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.video-card-header {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  background: #000;
  border-radius: 4px;
  margin: -16px -16px 0 -16px;
}

.video-card-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.duration-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.video-card-body {
  padding: 16px 0;
}

.video-card-body h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-card-meta {
  margin: 8px 0;
  font-size: 12px;
  color: #999;
}

.video-card-desc {
  margin: 8px 0;
  font-size: 13px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-card-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.views {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .home-container {
    padding: 15px;
  }

  .home-header h1 {
    font-size: 24px;
  }

  .search-bar :deep(.el-input) {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 10px;
  }

  .home-header h1 {
    font-size: 20px;
  }

  .home-header p {
    font-size: 14px;
  }

  .playlist-card {
    max-height: none;
  }

  .video-item-cover {
    width: 70px;
    height: 50px;
  }

  .video-item-info h4 {
    font-size: 13px;
  }
}
</style>
