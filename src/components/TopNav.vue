<template>
  <el-menu :default-active="activeMenu" mode="horizontal" class="top-nav">
    <div class="logo">RTMPlayer</div>
    <el-menu-item index="/">
      <router-link to="/">首页</router-link>
    </el-menu-item>
    <el-menu-item index="/upload">
      <router-link to="/upload">上传</router-link>
    </el-menu-item>
    <el-menu-item index="/my">
      <router-link to="/my">我的</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const activeMenu = computed(() => {
  return route.path || '/'
})
</script>

<style scoped>
.top-nav {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-right: 30px;
}

.el-menu {
  flex: 1;
  border-bottom: none;
}

:deep(.el-menu-item) {
  padding: 0 !important;
}

:deep(.el-menu-item a) {
  display: block;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  text-decoration: none;
  color: inherit;
}

:deep(.el-menu-item.is-active a) {
  color: #409eff;
}
</style>
