已创建 10 个待办事项

# 开发计划TODO文档
请按照以下步骤执行，每完成一步，最后给出一个git commit提交信息，停下来让我完成检查以及git提交。
## TODO列表

1. **设置项目基础结构** (not-started)
   - 初始化Vue + Vite项目，安装依赖包：Vue 3、Vite、Element Plus、hls.js、Axios、Vue Router等。配置项目结构和基础配置文件。

2. **开发公共组件** (not-started)
   - 创建公共组件：顶部导航栏组件（使用ElMenu和Router-Link）、底部导航栏组件、全局提示组件（ElMessage、ElDialog）。

3. **实现视频播放器组件** (not-started)
   - 封装可复用的视频播放器组件：使用<video>标签和hls.js支持HLS播放，接收hlsUrl prop。包括播放控制、错误处理等功能。

4. **开发首页模块** (not-started)
   - 实现首页模块：创建Home.vue页面，使用ElCard或ElTable展示视频列表（调用GET /api/videos接口）。实现点击播放切换视频功能，使用Vue ref或Pinia管理状态。

5. **开发上传模块** (not-started)
   - 实现视频上传模块：创建Upload.vue页面，使用ElUpload组件支持文件选择和上传（限制MP4格式）。实现上传进度条，调用POST /api/upload接口提交文件。处理成功/失败提示。

6. **开发我的模块** (not-started)
   - 实现我的模块：创建My.vue页面，使用ElTable或ElCard展示用户视频列表（调用GET /api/my/videos接口）。可选实现删除视频功能（调用DELETE /api/my/videos/{id}）。

7. **集成后端接口** (not-started)
   - 配置Axios实例，设置基础URL和请求/响应拦截器。在各模块中集成后端接口调用，处理错误情况和数据格式化。

8. **配置路由系统** (not-started)
   - 配置Vue Router，设置路由为首页、上传、我的页面。确保导航栏与路由联动。

9. **测试和调试** (not-started)
   - 测试各模块功能：视频列表展示、播放、上传、用户视频管理等。检查错误处理和用户体验。修复发现的bug。

10. **项目优化和扩展** (not-started)
    - 优化UI设计，确保响应式布局和美观性。添加加载状态、空状态处理等。可选添加更多功能如搜索、分页等。