<script setup>
import { useRouter } from 'vue-router'
import TopNav from './components/TopNav.vue'
import BottomNav from './components/BottomNav.vue'

const router = useRouter()
</script>

<template>
  <div id="app" class="app-container">
    <TopNav />
    <div class="main-content">
      <router-view />
    </div>
    <BottomNav />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
