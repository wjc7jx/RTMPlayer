<template>
  <div class="upload">
    <h1>视频上传</h1>
    <div class="upload-container">
      <el-empty description="上传功能开发中..." />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<style scoped>
.upload {
  padding: 20px;
}

.upload-container {
  margin-top: 20px;
}
</style>
