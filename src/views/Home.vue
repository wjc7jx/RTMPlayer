<template>
  <div class="home">
    <h1>首页 - 视频列表</h1>
    <div class="video-list">
      <el-empty description="敬请期待..." v-if="!videoList || videoList.length === 0" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getVideos } from '@/api/video'
import { useVideoStore } from '@/stores/video'

const videoStore = useVideoStore()
const videoList = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const response = await getVideos()
    videoList.value = response.data || []
    videoStore.setVideoList(videoList.value)
  } catch (error) {
    console.error('获取视频列表失败:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home {
  padding: 20px;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
