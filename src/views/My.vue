<template>
  <div class="my-container">
    <!-- 页面头部 -->
    <div class="my-header">
      <h1>👤 我的视频</h1>
      <p>管理您上传和收藏的视频</p>
    </div>

    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <el-button type="primary" @click="handleRefresh">
          <el-icon><Refresh /></el-icon>
          刷新
        </el-button>
        <el-button 
          v-if="selectedVideos.length > 0" 
          type="danger" 
          @click="handleBatchDelete"
        >
          <el-icon><Delete /></el-icon>
          删除选中 ({{ selectedVideos.length }})
        </el-button>
      </div>
      <div class="toolbar-right">
        <span class="total-info">
          共 {{ totalVideos }} 个视频，总大小 {{ getTotalSize() }}
        </span>
      </div>
    </div>

    <!-- 加载状态 -->
    <el-skeleton v-if="loading" :rows="5" animated />

    <!-- 空状态 -->
    <Empty
      v-else-if="videos.length === 0"
      description="暂无视频，上传视频开始分享"
      :showButton="false"
      :imageSize="150"
    />

    <!-- 视频表格 -->
    <div v-else class="video-table-wrapper">
      <el-table
        ref="tableRef"
        :data="videos"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- 复选框列 -->
        <el-table-column type="selection" width="50" />

        <!-- 视频信息列 -->
        <el-table-column label="视频信息" min-width="300">
          <template #default="{ row }">
            <div class="video-info-cell">
              <img :src="row.cover" :alt="row.title" class="video-cover" />
              <div class="video-details">
                <h4>{{ row.title }}</h4>
                <p class="duration">⏱️ {{ row.duration }}</p>
                <p class="description">{{ row.description }}</p>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- 文件大小列 -->
        <el-table-column prop="fileSize" label="文件大小" width="100" align="center" />

        <!-- 上传时间列 -->
        <el-table-column label="上传时间" width="180" align="center">
          <template #default="{ row }">
            <span>{{ formatDate(row.uploadTime) }}</span>
          </template>
        </el-table-column>

        <!-- 状态列 -->
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag
              :type="row.status === 'completed' ? 'success' : 'warning'"
              effect="light"
            >
              {{ row.status === 'completed' ? '已完成' : '处理中' }}
            </el-tag>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              link
              @click="handlePlay(row)"
            >
              <el-icon><VideoPlay /></el-icon>
              播放
            </el-button>
            <el-button
              type="warning"
              size="small"
              link
              @click="handleDownload(row)"
            >
              <el-icon><Download /></el-icon>
              下载
            </el-button>
            <el-button
              type="danger"
              size="small"
              link
              @click="handleDelete(row)"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div v-if="totalVideos > pageSize" class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="totalVideos"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[5, 10, 20, 50]"
          @current-change="loadVideos"
          @size-change="handlePageSizeChange"
        />
      </div>
    </div>

    <!-- 播放对话框 -->
    <el-dialog
      v-model="playDialogVisible"
      title="视频播放"
      width="90%"
      :close-on-click-modal="false"
    >
      <div v-if="selectedForPlay" class="play-dialog-content">
        <VideoPlayer
          :key="selectedForPlay.id"
          :hlsUrl="selectedForPlay.hlsUrl"
          :videoInfo="selectedForPlay"
          :autoplay="true"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Refresh, Delete, VideoPlay, Download } from '@element-plus/icons-vue'
import { useMessage } from '@/utils/message'
import { fetchMyVideos, deleteMyVideo } from '@/utils/mockData'
import Empty from '@/components/Empty.vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const router = useRouter()

// 状态
const videos = ref([])
const selectedVideos = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const totalVideos = ref(0)
const playDialogVisible = ref(false)
const selectedForPlay = ref(null)
const tableRef = ref(null)

// 计算属性
const hasSelected = computed(() => selectedVideos.value.length > 0)

/**
 * 加载视频列表
 */
const loadVideos = async (page = 1) => {
  loading.value = true
  try {
    // 这里可以切换为真实API调用
    // const response = await getMyVideos({ page, pageSize: pageSize.value })
    const response = await fetchMyVideos(page, pageSize.value)

    videos.value = response.data
    totalVideos.value = response.total
    currentPage.value = page

    // 清除选择
    selectedVideos.value = []
    tableRef.value?.clearSelection()
  } catch (error) {
    console.error('获取我的视频列表失败:', error)
    useMessage.error('获取我的视频列表失败，请重试')
  } finally {
    loading.value = false
  }
}

/**
 * 处理分页大小改变
 */
const handlePageSizeChange = (newSize) => {
  pageSize.value = newSize
  currentPage.value = 1
  loadVideos(1)
}

/**
 * 选择改变
 */
const handleSelectionChange = (selection) => {
  selectedVideos.value = selection
}

/**
 * 播放视频
 */
const handlePlay = (video) => {
  selectedForPlay.value = video
  playDialogVisible.value = true
}

/**
 * 下载视频
 */
const handleDownload = (video) => {
  useMessage.info(`下载功能开发中: ${video.title}`)
  // 实际实现中可以调用后端下载接口
}

/**
 * 删除单个视频
 */
const handleDelete = async (video) => {
  try {
    await useMessage.confirmDelete(`确定要删除视频 "${video.title}" 吗？`)
    
    loading.value = true
    await deleteMyVideo(video.id)
    
    useMessage.success(`已删除视频: ${video.title}`)
    await loadVideos(currentPage.value)
  } catch (error) {
    // 用户取消删除
    console.log('删除取消')
  } finally {
    loading.value = false
  }
}

/**
 * 批量删除视频
 */
const handleBatchDelete = async () => {
  const titles = selectedVideos.value.map((v) => v.title).join('、')
  try {
    await useMessage.confirmDelete(
      `确定要删除选中的 ${selectedVideos.value.length} 个视频吗？\n${titles}`
    )

    loading.value = true
    const deletePromises = selectedVideos.value.map((video) =>
      deleteMyVideo(video.id)
    )
    await Promise.all(deletePromises)

    useMessage.success(`已删除 ${selectedVideos.value.length} 个视频`)
    selectedVideos.value = []
    await loadVideos(currentPage.value)
  } catch (error) {
    // 用户取消删除
    console.log('批量删除取消')
  } finally {
    loading.value = false
  }
}

/**
 * 刷新列表
 */
const handleRefresh = async () => {
  await loadVideos(currentPage.value)
  useMessage.success('已刷新列表', 1500)
}

/**
 * 格式化日期
 */
const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

/**
 * 获取总大小
 */
const getTotalSize = () => {
  let totalMB = 0
  videos.value.forEach((video) => {
    const match = video.fileSize.match(/(\d+)\s*MB/)
    if (match) {
      totalMB += parseInt(match[1])
    }
  })

  if (totalMB >= 1024) {
    return `${(totalMB / 1024).toFixed(2)} GB`
  }
  return `${totalMB} MB`
}

onMounted(() => {
  loadVideos(1)
})
</script>

<style scoped>
.my-container {
  padding: 20px;
}

.my-header {
  text-align: center;
  margin-bottom: 30px;
}

.my-header h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #333;
}

.my-header p {
  font-size: 16px;
  color: #666;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 8px;
}

.toolbar-left {
  display: flex;
  gap: 12px;
}

.toolbar-right {
  font-size: 14px;
  color: #666;
}

.total-info {
  padding: 8px 16px;
  background: white;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.video-table-wrapper {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.video-info-cell {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.video-cover {
  width: 120px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.video-details {
  flex: 1;
  min-width: 0;
}

.video-details h4 {
  margin: 0 0 6px 0;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.duration {
  margin: 4px 0;
  font-size: 12px;
  color: #909399;
}

.description {
  margin: 4px 0;
  font-size: 12px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #f0f0f0;
}

.play-dialog-content {
  min-height: 400px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .my-container {
    padding: 15px;
  }

  .toolbar {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .toolbar-left {
    justify-content: flex-start;
  }

  .toolbar-right {
    text-align: right;
  }
}

@media (max-width: 768px) {
  .my-container {
    padding: 10px;
  }

  .my-header h1 {
    font-size: 22px;
  }

  .video-cover {
    width: 100px;
    height: 60px;
  }

  .video-details h4 {
    font-size: 13px;
  }

  :deep(.el-table) {
    font-size: 12px;
  }

  :deep(.el-button) {
    padding: 4px 8px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .toolbar {
    padding: 10px;
  }

  .toolbar-left {
    width: 100%;
  }

  :deep(.el-table__header th) {
    padding: 8px 0;
  }

  :deep(.el-table__body td) {
    padding: 8px 0;
  }
}
</style>
