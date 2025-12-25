/**
 * 模拟数据 - 用于开发测试
 * 实际环境下应该通过后端API获取
 */

export const mockVideos = [
  {
    id: 1,
    title: '示例视频 1',
    videoUrl: '/wwwroot/javaProject/video/test1.mp4',
    createTime: '2025-12-23T10:00:00.000+00:00',
    updateTime: '2025-12-23T10:00:00.000+00:00',
    isDeleted: 0
  },
  {
    id: 2,
    title: '示例视频 2',
    videoUrl: '/wwwroot/javaProject/video/test2.mp4',
    createTime: '2025-12-22T15:30:00.000+00:00',
    updateTime: '2025-12-22T15:30:00.000+00:00',
    isDeleted: 0
  },
  {
    id: 3,
    title: '示例视频 3',
    videoUrl: '/wwwroot/javaProject/video/test3.mp4',
    createTime: '2025-12-21T08:15:00.000+00:00',
    updateTime: '2025-12-21T08:15:00.000+00:00',
    isDeleted: 0
  },
  {
    id: 4,
    title: '示例视频 4',
    videoUrl: '/wwwroot/javaProject/video/test4.mp4',
    createTime: '2025-12-20T12:00:00.000+00:00',
    updateTime: '2025-12-20T12:00:00.000+00:00',
    isDeleted: 0
  },
  {
    id: 5,
    title: '示例视频 5',
    videoUrl: '/wwwroot/javaProject/video/test5.mp4',
    createTime: '2025-12-19T14:45:00.000+00:00',
    updateTime: '2025-12-19T14:45:00.000+00:00',
    isDeleted: 0
  },
  {
    id: 6,
    title: '示例视频 6',
    videoUrl: '/wwwroot/javaProject/video/test6.mp4',
    createTime: '2025-12-18T14:45:00.000+00:00',
    updateTime: '2025-12-18T14:45:00.000+00:00',
    isDeleted: 0
  }
]

/**
 * 模拟获取视频列表
 */
export const fetchMockVideos = (page = 1, pageSize = 6) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      resolve({
        code: 200,
        msg: '操作成功',
        data: mockVideos.slice(start, end)
      })
    }, 500) // 模拟网络延迟
  })
}

/**
 * 模拟搜索视频
 */
export const searchMockVideos = (keyword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(keyword.toLowerCase()) ||
          video.description.toLowerCase().includes(keyword.toLowerCase())
      )
      resolve({
        data: results,
        total: results.length
      })
    }, 300)
  })
}

/**
 * 我的视频（模拟用户上传的视频）
 */
export const mockMyVideos = [
  {
    id: 101,
    title: '我的第一个视频',
    cover: 'https://via.placeholder.com/400x225?text=My+Video+1',
    hlsUrl: '/hls/vod/test1.mp4.m3u8',
    uploadTime: '2025-12-20T10:00:00',
    duration: '10:23',
    description: '我上传的第一个视频，展示了视频播放功能',
    fileSize: '125 MB',
    status: 'completed'
  },
  {
    id: 102,
    title: '视频教程 - Vue3 基础',
    cover: 'https://via.placeholder.com/400x225?text=Vue+Tutorial',
    hlsUrl: '/hls/vod/test2.mp4.m3u8',
    uploadTime: '2025-12-18T14:30:00',
    duration: '15:42',
    description: 'Vue3 框架的基础教程视频',
    fileSize: '234 MB',
    status: 'completed'
  },
  {
    id: 103,
    title: '产品演示',
    cover: 'https://via.placeholder.com/400x225?text=Product+Demo',
    hlsUrl: '/hls/vod/test3.mp4.m3u8',
    uploadTime: '2025-12-15T08:15:00',
    duration: '8:30',
    description: '新产品的完整演示',
    fileSize: '156 MB',
    status: 'completed'
  },
  {
    id: 104,
    title: '我的直播录像',
    cover: 'https://via.placeholder.com/400x225?text=Live+Recording',
    hlsUrl: '/hls/vod/test4.mp4.m3u8',
    uploadTime: '2025-12-10T19:45:00',
    duration: '45:20',
    description: '上周五的直播内容录制',
    fileSize: '512 MB',
    status: 'completed'
  }
]

/**
 * 模拟获取我的视频列表
 */
export const fetchMyVideos = (page = 1, pageSize = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      resolve({
        data: mockMyVideos.slice(start, end),
        total: mockMyVideos.length,
        page,
        pageSize
      })
    }, 500)
  })
}

/**
 * 模拟删除视频
 */
export const deleteMyVideo = (videoId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockMyVideos.findIndex((v) => v.id === videoId)
      if (index !== -1) {
        mockMyVideos.splice(index, 1)
      }
      resolve({
        code: 0,
        message: '删除成功'
      })
    }, 300)
  })
}

/**
 * 模拟推流接口 - 根据视频ID获取HLS播放地址
 */
export const mockGetStreamUrl = (videoId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const video = mockVideos.find(v => v.id === parseInt(videoId))
      if (video) {
        resolve({
          code: '200',
          message: '推流成功',
          videoTitle: video.title,
          streamName: `video_${videoId}_${video.title.replace(/\s+/g, '_')}`,
          playUrl: `http://localhost/live/video_${videoId}_stream.m3u8`
        })
      } else {
        resolve({
          code: '404',
          message: '视频不存在',
          videoTitle: '',
          streamName: '',
          playUrl: ''
        })
      }
    }, 800) // 模拟推流需要一点时间
  })
}
