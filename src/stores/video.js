import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVideoStore = defineStore('video', () => {
  // 当前播放的视频
  const currentVideo = ref(null)

  // 视频列表
  const videoList = ref([])

  // 设置当前视频
  const setCurrentVideo = (video) => {
    currentVideo.value = video
  }

  // 设置视频列表
  const setVideoList = (list) => {
    videoList.value = list
  }

  return {
    currentVideo,
    videoList,
    setCurrentVideo,
    setVideoList
  }
})
