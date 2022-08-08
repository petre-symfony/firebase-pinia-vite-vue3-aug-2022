import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Manage from '@/views/Manage.vue'
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
    path: "/manage",
    component: Manage
  },
  { path: '/:path(.*)', component: NotFound },
]
