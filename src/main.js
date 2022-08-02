import { createApp } from 'vue'
import './assets/tailwind.css'
import './assets/main.css'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation.js'
import './includes/firebase.js'
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
  .use(VeeValidatePlugin)
  .mount('#app')
