/**
 * 模拟数据 - 用于开发测试
 * 实际环境下应该通过后端API获取
 */

export const mockVideos = [
  {
    id: 1,
    title: '示例视频 1',
    cover: 'https://picsum.photos/400/225',
    hlsUrl: 'https://live.funhillrm.com/5/sd/live.m3u8',
    uploadedBy: 'User A',
    uploadTime: '2025-12-23T10:00:00',
    duration: '10:23',
    views: 1230,
    description: '虽然是黑屏，但是传输格式是HLS（https://live.funhillrm.com/5/sd/live.m3u8）'
  },
  {
    id: 2,
    title: '示例视频 2',
    cover: 'https://picsum.photos/400/225',
    hlsUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadedBy: 'User B',
    uploadTime: '2025-12-22T15:30:00',
    duration: '9:48',
    views: 856,
    description: '演示MP4格式视频播放'
  },
  {
    id: 3,
    title: '示例视频 3',
    cover: 'https://picsum.photos/400/225',
    hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x3devon.m3u8',
    uploadedBy: 'User C',
    uploadTime: '2025-12-21T08:15:00',
    duration: '15:42',
    views: 2145,
    description: '高质量HLS视频流演示'
  },
  {
    id: 4,
    title: '示例视频 4',
    cover: 'https://picsum.photos/400/225',
    hlsUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadedBy: 'User D',
    uploadTime: '2025-12-20T12:00:00',
    duration: '7:30',
    views: 654,
    description: '短视频演示'
  },
  {
    id: 5,
    title: '示例视频 5',
    cover: 'https://picsum.photos/400/225',
    hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x3devon.m3u8',
    uploadedBy: 'User E',
    uploadTime: '2025-12-19T14:45:00',
    duration: '12:15',
    views: 1876,
    description: '长时间HLS视频演示'
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
        data: mockVideos.slice(start, end),
        total: mockVideos.length,
        page,
        pageSize
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
    hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x3devon.m3u8',
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
    hlsUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
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
    hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x3devon.m3u8',
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
    hlsUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
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
