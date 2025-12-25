# RTMPlayer - 实时视频播放器

基于 Vue 3 + Vite 的实时视频播放器应用，支持 HLS 流播放。

## 环境配置

项目支持三种运行环境：

### 测试环境 (test)
- 使用Mock数据
- 不调用真实API
- 用于开发时测试UI和交互功能

```bash
npm run test
```

### 开发环境 (dev)
- 连接本地开发服务器 (localhost:8080)
- 调用真实API
- 用于本地开发和调试

```bash
npm run dev
```

### 生产环境 (prod)
- 连接生产服务器 (http://139.186.225.25)
- 调用生产环境API
- 用于生产部署

```bash
npm run prod
```

### 生产环境测试 (prod-test)
- 通过本地代理连接生产服务器
- 解决跨域问题，便于本地测试生产API
- 推荐用于生产环境调试

```bash
npm run prod-test
```

## API 配置

### 环境变量文件
- `.env.test` - 测试环境配置
- `.env.development` - 开发环境配置  
- `.env.production` - 生产环境配置
- `.env.prod-test` - 生产环境测试配置
- `.env.production` - 生产环境配置

### API 接口
1. **视频列表接口**: `POST /api/videoInfo/listAll`
2. **视频推流接口**: `POST /api/stream/push/{videoId}`

## 特性

- 🎯 环境自动切换：根据运行脚本自动切换API和Mock数据
- 📱 响应式设计：支持多种设备尺寸
- 🎬 HLS流播放：支持实时视频流播放
- 🔄 实时推流：支持视频推流到Nginx-RTMP服务器
- 💻 开发友好：完善的环境配置和调试信息

## 构建和部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```
