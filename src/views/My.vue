<template>
  <div class="my">
    <h1>我的视频</h1>
    <div class="my-videos">
      <el-empty description="我的视频开发中..." />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getMyVideos } from '@/api/video'

const myVideos = ref([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const response = await getMyVideos()
    myVideos.value = response.data || []
  } catch (error) {
    console.error('获取用户视频列表失败:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.my {
  padding: 20px;
}

.my-videos {
  margin-top: 20px;
}
</style>
