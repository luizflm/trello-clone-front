import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'auth.register',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/login',
      name: 'auth.login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { auth: true }
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if(authStore.user && to.meta.guest) {
    return { name: "home" };
  }

  if(!authStore.user && to.meta.auth) {
    return { name: "auth.login" };
  }  
});

export default router
