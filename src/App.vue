<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/AuthStore';

const authStore = useAuthStore();
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
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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