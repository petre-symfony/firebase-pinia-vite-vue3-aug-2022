import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Manage from '@/views/Manage.vue'
import Song from '@/views/Song.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    name: 'home',
    path: "/",
    component: Home
  },
  {
    name: 'about',
    path: "/about",
    component: About
  },
  {
    name: 'manage',
    //alias: '/manage',
    path: "/manage-music",
    component: Manage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  { path: '/:path(.*)', component: NotFound },
]
