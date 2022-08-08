import { createApp } from 'vue'
import './assets/tailwind.css'
import './assets/main.css'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation.js'
import { firebaseAuth } from "@/includes/firebase";

'./includes/firebase.js'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  console.log('Global Guard')

  next()
})

let app;

firebaseAuth.onAuthStateChanged((to, from, next) => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .use(createPinia())
      .use(VeeValidatePlugin)
      .mount('#app')
  }
})

