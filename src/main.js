import { createApp } from 'vue'
import './assets/tailwind.css'
import './assets/main.css'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation.js'
import { firebaseAuth } from "@/includes/firebase.js"
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/storeUserLoggedIn.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  if(!to.meta.requiresAuth) {
    next()
    return
  }

  const storeUser = useUserStore()

  if (storeUser.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
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

