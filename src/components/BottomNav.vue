<template>
  <div class="bottom-nav">
    <div class="footer-content">
      <div class="footer-section">
        <h4>关于我们</h4>
        <p>RTMPlayer 是一个功能强大的视频播放和管理平台</p>
      </div>
      <div class="footer-section">
        <h4>快速链接</h4>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/upload">上传视频</router-link></li>
          <li><router-link to="/my">我的视频</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>联系方式</h4>
        <p>Email: support@rtmplayer.com</p>
        <p>Phone: 400-0000-0000</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 RTMPlayer. All rights reserved.</p>
      <p>通信实训课项目 | Made with ❤️ by Team</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.bottom-nav {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 30px;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-section h4 {
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}

.footer-section p {
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.9;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin: 8px 0;
}

.footer-section a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
}

.footer-section a:hover {
  color: #fff;
  transform: translateX(4px);
}

.footer-bottom {
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 13px;
  opacity: 0.85;
}

.footer-bottom p {
  margin: 5px 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 30px 15px 20px;
  }
}
</style>
