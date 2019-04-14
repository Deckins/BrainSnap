import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/views/Index'
import Info from '@/components/views/Info'
import Gallery from '@/components/views/Gallery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery
    },
  ]
})
