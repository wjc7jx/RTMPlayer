<template>
  <div class="error-state">
    <el-result
      icon="error"
      :title="title"
      :sub-title="subtitle"
    >
      <template #extra>
        <el-button type="primary" @click="$emit('retry')">
          {{ buttonText }}
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '加载失败'
  },
  subtitle: {
    type: String,
    default: '请稍后重试'
  },
  buttonText: {
    type: String,
    default: '重新加载'
  }
})

defineEmits(['retry'])
</script>

<style scoped>
.error-state {
  padding: 40px 20px;
}
</style>
