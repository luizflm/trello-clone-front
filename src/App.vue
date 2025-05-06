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
  <div class="navbar justify-between px-10 bg-primary text-white">
    <div>
      <RouterLink :to="{ name: 'boards.index' }" class="font-bold text-xl">Trello</RouterLink>
    </div>

    <div v-if="authStore.user" class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li>
          <details>
            <summary>Boards</summary>
            <ul class="w-48 font-medium text-black text-sm p-2">
              <li>
                <RouterLink :to="{ name: 'boards.create' }">Create a new Board</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'boards.index' }" class="font-medium text-sm">My Boards</RouterLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>
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
        <li><RouterLink :to="{ name: 'profile.edit' }">Edit Profile</RouterLink></li>
        <li><a @click="authStore.logout()">Logout</a></li>
      </ul>
    </div>

    <div v-else class="space-x-2">
      <RouterLink :to="{ name: 'auth.login' }" class="btn btn-ghost text-md">Sign in</RouterLink>
      <RouterLink :to="{ name: 'auth.register' }" class="btn btn-soft btn-primary text-md">Sign up</RouterLink>        
    </div>
  </div>

  <RouterView />
</template>