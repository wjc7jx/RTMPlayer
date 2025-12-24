<template>
  <footer class="bili-footer">
    <div class="footer-main">
      <div class="footer-brand">
        <div class="brand-info">
          <div class="brand-logo">
            <span class="logo-icon">📺</span>
            <span class="brand-name">RTMPlayer</span>
          </div>
          <p class="brand-desc">专业的实时流媒体播放平台</p>
          <div class="brand-features">
            <span class="feature-tag">高清画质</span>
            <span class="feature-tag">流畅播放</span>
            <span class="feature-tag">多格式支持</span>
          </div>
        </div>
      </div>

      <div class="footer-links">
        <div class="link-group">
          <h4>产品功能</h4>
          <ul>
            <li><router-link to="/">视频首页</router-link></li>
            <li><router-link to="/upload">视频投稿</router-link></li>
            <li><router-link to="/my">个人中心</router-link></li>
          </ul>
        </div>
        <div class="link-group">
          <h4>帮助支持</h4>
          <ul>
            <li><a href="#">使用教程</a></li>
            <li><a href="#">常见问题</a></li>
            <li><a href="#">技术支持</a></li>
          </ul>
        </div>
        <div class="link-group">
          <h4>关于我们</h4>
          <ul>
            <li><a href="#">项目介绍</a></li>
            <li><a href="#">联系我们</a></li>
            <li><a href="#">意见反馈</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="copyright">
        <p>&copy; 2025 RTMPlayer 通信实训课项目</p>
        <p>基于 Vue 3 + Vite 构建 | Made with 💗 by Team</p>
      </div>
      <div class="tech-info">
        <span class="tech-tag">Vue 3</span>
        <span class="tech-tag">Vite</span>
        <span class="tech-tag">Element Plus</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.bili-footer {
  background: var(--bili-card);
  border-top: 1px solid var(--bili-border);
  margin-top: auto;
}

.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 32px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 48px;
  align-items: start;
}

.footer-brand {
  display: flex;
  flex-direction: column;
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 32px;
  filter: drop-shadow(0 2px 6px rgba(0,161,214,0.3));
}

.brand-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--bili-primary);
  font-family: var(--bili-font);
}

.brand-desc {
  color: var(--bili-text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.brand-features {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.feature-tag {
  padding: 4px 12px;
  background: linear-gradient(135deg, var(--bili-primary), var(--bili-pink));
  color: white;
  font-size: 12px;
  font-weight: 500;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,161,214,0.2);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.link-group h4 {
  color: var(--bili-text);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--bili-primary);
  position: relative;
}

.link-group h4::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 24px;
  height: 2px;
  background: var(--bili-pink);
  border-radius: 1px;
}

.link-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.link-group a {
  color: var(--bili-text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  padding: 4px 0;
  position: relative;
}

.link-group a::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: var(--bili-primary);
  transition: width 0.3s ease;
}

.link-group a:hover {
  color: var(--bili-primary);
  transform: translateX(4px);
}

.link-group a:hover::before {
  width: 100%;
}

.footer-bottom {
  background: var(--bili-bg);
  border-top: 1px solid var(--bili-border);
  padding: 24px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.copyright {
  color: var(--bili-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.copyright p {
  margin: 4px 0;
}

.tech-info {
  display: flex;
  gap: 8px;
}

.tech-tag {
  padding: 4px 8px;
  background: var(--bili-card);
  color: var(--bili-primary);
  font-size: 11px;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid var(--bili-border);
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 32px 16px 24px;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    padding: 20px 16px;
    text-align: center;
  }
  
  .tech-info {
    justify-content: center;
  }
}
</style>
