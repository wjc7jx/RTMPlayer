<template>
  <div class="loading-container">
    <el-skeleton :rows="rows" animated />
  </div>
</template>

<script setup>
defineProps({
  rows: {
    type: Number,
    default: 3
  }
})
</script>

<style scoped>
.loading-container {
  padding: 20px;
}
</style>
