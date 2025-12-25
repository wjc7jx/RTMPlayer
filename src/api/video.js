import request from './request'

// 查询所有未删除的视频信息列表
export const getVideos = (params) => {
  return request.post('/api/videoInfo/listAll', params)
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
