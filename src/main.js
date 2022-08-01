import { createApp } from 'vue'
import './assets/tailwind.css'
import './assets/main.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
