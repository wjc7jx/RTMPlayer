<template>
  <div class="upload-page fade-in-up">
    <div class="upload-header">
      <h1>📤 视频投稿</h1>
      <p>分享你的精彩内容，让更多人看到</p>
    </div>
    
    <div class="upload-container">
      <div class="bili-card upload-card hover-lift">
        <div class="upload-area">
          <div class="upload-icon pulse-animation">
            <svg viewBox="0 0 1024 1024" width="64" height="64" fill="var(--bili-primary)">
              <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"/>
            </svg>
          </div>
          <h3>上传你的视频</h3>
          <p>支持 MP4、AVI、MOV 等格式，最大支持 2GB</p>
          <button class="upload-button ripple-effect">
            选择文件
          </button>
        </div>
      </div>
      
      <div class="feature-cards">
        <div class="bili-card feature-card hover-lift">
          <div class="feature-icon">
            <svg viewBox="0 0 1024 1024" width="32" height="32" fill="var(--bili-primary)">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292c-12.7 17.7-39 17.7-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"/>
            </svg>
          </div>
          <h4>高清画质</h4>
          <p>自动压缩优化，保证最佳播放体验</p>
        </div>
        
        <div class="bili-card feature-card hover-lift">
          <div class="feature-icon">
            <svg viewBox="0 0 1024 1024" width="32" height="32" fill="var(--bili-pink)">
              <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"/>
            </svg>
          </div>
          <h4>安全存储</h4>
          <p>多重备份机制，永不丢失你的作品</p>
        </div>
        
        <div class="bili-card feature-card hover-lift">
          <div class="feature-icon">
            <svg viewBox="0 0 1024 1024" width="32" height="32" fill="var(--bili-primary)">
              <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h42.5c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.2-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"/>
            </svg>
          </div>
          <h4>快速分享</h4>
          <p>一键发布，立即与全世界分享</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>

<style scoped>
.upload-page {
  padding: 24px;
  background: var(--bili-bg);
  min-height: calc(100vh - 64px);
}

.upload-header {
  text-align: center;
  margin-bottom: 48px;
}

.upload-header h1 {
  font-size: 32px;
  margin-bottom: 12px;
  color: var(--bili-text);
  font-weight: 700;
}

.upload-header p {
  font-size: 16px;
  color: var(--bili-text-secondary);
}

.upload-container {
  max-width: 800px;
  margin: 0 auto;
}

.upload-card {
  margin-bottom: 32px;
  text-align: center;
  padding: 48px 24px;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.upload-icon {
  padding: 24px;
  background: rgba(0, 161, 214, 0.1);
  border-radius: 50%;
  margin-bottom: 8px;
}

.upload-area h3 {
  font-size: 24px;
  margin: 0;
  color: var(--bili-text);
  font-weight: 600;
}

.upload-area p {
  font-size: 16px;
  color: var(--bili-text-secondary);
  margin: 0;
  max-width: 400px;
  line-height: 1.6;
}

.upload-button {
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, var(--bili-primary), var(--bili-pink));
  border: none;
  border-radius: var(--bili-radius);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 16px rgba(0, 161, 214, 0.3);
}

.upload-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 161, 214, 0.4);
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.feature-card {
  text-align: center;
  padding: 32px 24px;
}

.feature-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  background: rgba(0, 161, 214, 0.1);
  border-radius: 50%;
}

.feature-card h4 {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--bili-text);
}

.feature-card p {
  margin: 0;
  font-size: 14px;
  color: var(--bili-text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .upload-page {
    padding: 16px;
  }
  
  .upload-header h1 {
    font-size: 24px;
  }
  
  .upload-card {
    padding: 32px 20px;
  }
  
  .feature-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .feature-card {
    padding: 24px 20px;
  }
}
</style>
