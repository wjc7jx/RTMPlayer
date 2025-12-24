<template>
  <div class="top-nav-wrapper">
    <header class="bili-header">
      <div class="header-left">
        <div class="nav-logo">
          <span class="logo-icon">📺</span>
          <span class="logo-text">RTMPlayer</span>
        </div>
      </div>
      
      <div class="header-center">
        <div class="search-container">
          <input type="text" placeholder="搜索你感兴趣的内容" class="search-input">
          <button class="search-btn">
            <svg viewBox="0 0 1024 1024" width="18" height="18" fill="currentColor">
              <path d="M853.333333 853.333333l-138.88-138.88c73.813333-82.346667 119.04-191.573333 119.04-311.04 0-254.293333-206.293333-460.586667-460.586666-460.586666S12.32 148.906667 12.32 403.2s206.293333 460.586667 460.586667 460.586667c119.466667 0 228.693333-45.226667 311.04-119.04L922.826667 883.626667c8.533333 8.533333 22.186667 8.533333 30.72 0s8.533333-22.186667 0-30.72zM51.2 403.2c0-232.106667 188.586667-420.693333 420.693333-420.693333s420.693333 188.586667 420.693334 420.693333-188.586667 420.693333-420.693334 420.693333S51.2 635.306667 51.2 403.2z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="header-right">
        <nav class="nav-items">
          <router-link to="/" class="nav-link" :class="{ active: activeMenu === '/' }">
            <svg viewBox="0 0 1024 1024" width="20" height="20" fill="currentColor">
              <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h42.5c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.2-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"/>
            </svg>
            <span>首页</span>
          </router-link>
          <router-link to="/upload" class="nav-link" :class="{ active: activeMenu === '/upload' }">
            <svg viewBox="0 0 1024 1024" width="20" height="20" fill="currentColor">
              <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"/>
            </svg>
            <span>投稿</span>
          </router-link>
          <router-link to="/my" class="nav-link" :class="{ active: activeMenu === '/my' }">
            <svg viewBox="0 0 1024 1024" width="20" height="20" fill="currentColor">
              <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"/>
            </svg>
            <span>个人中心</span>
          </router-link>
        </nav>
      </div>
    </header>
  </div>
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
.top-nav-wrapper {
  background: var(--bili-card);
  border-bottom: 1px solid var(--bili-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.bili-header {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 64px;
  max-width: 1760px;
  margin: 0 auto;
  gap: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.nav-logo:hover {
  transform: scale(1.03);
}

.logo-icon {
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0,161,214,0.3));
}

.logo-text {
  font-size: 22px;
  font-weight: 700;
  color: var(--bili-primary);
  font-family: var(--bili-font);
}

.header-center {
  flex: 1;
  max-width: 560px;
  margin: 0 auto;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--bili-bg);
  border: 2px solid transparent;
  border-radius: var(--bili-radius);
  overflow: hidden;
  transition: all 0.2s;
}

.search-container:hover {
  border-color: var(--bili-primary);
  box-shadow: 0 4px 12px rgba(0,161,214,0.1);
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 14px;
  font-family: var(--bili-font);
  background: transparent;
  color: var(--bili-text);
}

.search-input::placeholder {
  color: var(--bili-text-secondary);
}

.search-btn {
  padding: 12px 20px;
  background: var(--bili-primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover {
  background: var(--bili-pink);
}

.header-right {
  flex-shrink: 0;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 0;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 20px;
  color: var(--bili-text-secondary);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.2s;
  font-size: 13px;
  font-weight: 500;
  position: relative;
}

.nav-link:hover {
  color: var(--bili-primary);
  background: rgba(0,161,214,0.05);
  transform: translateY(-2px);
}

.nav-link.active {
  color: var(--bili-primary);
  background: rgba(0,161,214,0.08);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 3px;
  background: var(--bili-primary);
  border-radius: 2px;
}

.nav-link svg {
  transition: transform 0.2s;
}

.nav-link:hover svg {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .bili-header {
    padding: 0 16px;
    gap: 16px;
  }
  
  .header-center {
    max-width: none;
  }
  
  .nav-link span {
    display: none;
  }
  
  .nav-link {
    padding: 8px 12px;
  }
}
</style>
