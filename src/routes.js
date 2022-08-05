import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/about",
    component: About
  },
  { path: '/:path(.*)', component: NotFound },
]
