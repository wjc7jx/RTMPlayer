import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Upload from '../views/Upload.vue'
import My from '../views/My.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/my',
    name: 'My',
    component: My
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
