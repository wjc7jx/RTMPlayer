import request from './request'

// 获取视频列表
export const getVideos = (params) => {
  return request.get('/videos', { params })
}

// 获取单个视频详情
export const getVideo = (id) => {
  return request.get(`/video/${id}`)
}

// 上传视频
export const uploadVideo = (formData) => {
  return request.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取用户视频列表
export const getMyVideos = (params) => {
  return request.get('/my/videos', { params })
}

// 删除视频
export const deleteVideo = (id) => {
  return request.delete(`/my/videos/${id}`)
}
