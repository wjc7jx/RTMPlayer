<template>
  <div class="empty-state">
    <el-empty
      :image-size="imageSize"
      :description="description"
    >
      <template v-if="showButton">
        <el-button type="primary" @click="$emit('retry')">
          {{ buttonText }}
        </el-button>
      </template>
    </el-empty>
  </div>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    default: '暂无数据'
  },
  imageSize: {
    type: Number,
    default: 200
  },
  showButton: {
    type: Boolean,
    default: false
  },
  buttonText: {
    type: String,
    default: '重新加载'
  }
})

defineEmits(['retry'])
</script>

<style scoped>
.empty-state {
  padding: 40px 20px;
  text-align: center;
}
</style>
