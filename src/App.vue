<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/AuthStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();
onMounted(async () => {
  await authStore.getUserAvatar();
})
</script>

<template>
  <div class="navbar px-10 bg-primary text-white">
    <div class="flex-1">
      <RouterLink :to="{ name: 'home' }" class="font-bold text-xl">Trello</RouterLink>
    </div>

    <div v-if="authStore.user" class="dropdown dropdown-end text-black">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            alt="User avatar"
            :src="authStore.userAvatar" />
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a @click="authStore.logout()">Logout</a></li>
      </ul>
    </div>

    <div v-else>
      <RouterLink :to="{ name: 'auth.register' }" class="btn btn-ghost text-md">Sign up</RouterLink>
      <RouterLink :to="{ name: 'auth.login' }" class="btn btn-ghost text-md">Sign in</RouterLink>
    </div>
  </div>

  <RouterView />
</template>