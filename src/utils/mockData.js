/**
 * 模拟数据 - 用于开发测试
 * 实际环境下应该通过后端API获取
 */

export const mockVideos = [
  {
    id: 1,
    title: '示例视频 1',
    cover: 'https://via.placeholder.com/400x225?text=Video+1',
    hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x3devon.m3u8',
    uploadedBy: 'User A',
    uploadTime: '2025-12-23T10:00:00',
    duration: '10:23',
    views: 1230,
    description: '这是一个示例视频，展示HLS播放器的功能'
  },
  {
    id: 2,
    title: '示例视频 2',
    cover: 'https://via.placeholder.com/400x225?text=Video+2',
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
    cover: 'https://via.placeholder.com/400x225?text=Video+3',
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
    cover: 'https://via.placeholder.com/400x225?text=Video+4',
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
    cover: 'https://via.placeholder.com/400x225?text=Video+5',
    hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x3devon.m3u8',
    uploadedBy: 'User E',
    uploadTime: '2025-12-19T14:45:00',
    duration: '12:15',
    views: 1876,
    description: '长时间HLS视频演示'
  },
  {
    id: 6,
    title: '示例视频 6',
    cover: 'https://via.placeholder.com/400x225?text=Video+6',
    hlsUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    uploadedBy: 'User F',
    uploadTime: '2025-12-18T09:30:00',
    duration: '8:20',
    views: 923,
    description: '演示视频列表的滚动加载'
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
