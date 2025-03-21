import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'auth.register',
      component: RegisterView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
