<template>
  <div class="top-nav-wrapper">
    <el-menu :default-active="activeMenu" mode="horizontal" class="top-nav">
      <div class="nav-logo">
        <span class="logo-text">🎬 RTMPlayer</span>
      </div>
      <div class="nav-items">
        <el-menu-item index="/">
          <router-link to="/" class="menu-link">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="/upload">
          <router-link to="/upload" class="menu-link">
            <el-icon><UploadFilled /></el-icon>
            <span>上传</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="/my">
          <router-link to="/my" class="menu-link">
            <el-icon><UserFilled /></el-icon>
            <span>我的</span>
          </router-link>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { HomeFilled, UploadFilled, UserFilled } from '@element-plus/icons-vue'

const route = useRoute()

const activeMenu = computed(() => {
  return route.path || '/'
})
</script>

<style scoped>
.top-nav-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.top-nav {
  display: flex !important;
  align-items: center;
  padding: 0 20px;
  background-color: transparent;
  border-bottom: none;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo-text:hover {
  transform: scale(1.05);
}

.nav-items {
  display: flex;
  gap: 0;
}

:deep(.el-menu-item) {
  padding: 0 !important;
  background-color: transparent !important;
  height: 70px;
  line-height: 70px;
  border-bottom: none !important;
  margin: 0;
}

:deep(.el-menu-item:not(.is-active)) {
  color: rgba(255, 255, 255, 0.8);
}

:deep(.el-menu-item.is-active) {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: #fff;
  border-bottom: 3px solid #fff !important;
}

.menu-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  height: 70px;
  line-height: 70px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.menu-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

:deep(.el-icon) {
  font-size: 18px;
}
</style>

<style scoped>
.top-nav-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.top-nav {
  display: flex !important;
  align-items: center;
  padding: 0 20px;
  background-color: transparent;
  border-bottom: none;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo-text:hover {
  transform: scale(1.05);
}

.nav-items {
  display: flex;
  gap: 0;
}

:deep(.el-menu-item) {
  padding: 0 !important;
  background-color: transparent !important;
  height: 70px;
  line-height: 70px;
  border-bottom: none !important;
  margin: 0;
}

:deep(.el-menu-item:not(.is-active)) {
  color: rgba(255, 255, 255, 0.8);
}

:deep(.el-menu-item.is-active) {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: #fff;
  border-bottom: 3px solid #fff !important;
}

.menu-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  height: 70px;
  line-height: 70px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.menu-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

:deep(.el-icon) {
  font-size: 18px;
}
</style>
