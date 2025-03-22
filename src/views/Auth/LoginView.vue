<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from '@/stores/AuthStore.js';
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { errors } = storeToRefs(authStore)

const formData = reactive({
    email: '',
    password: '',
});

onMounted(() => { errors.value = {} })
</script>

<template>
    <div class="pt-10 flex justify-center w-3xl">
        <form 
            @submit.prevent="authStore.login(formData)"
            class="flex flex-col items-center space-y-4 w-full"
        >
            <h1 class="font-bold text-2xl">Sign in</h1>

            <fieldset class="fieldset w-64">
                <legend class="fieldset-legend">Email</legend>
                <input v-model="formData.email" type="email" class="input" placeholder="ex: johndoe@gmail.com" />
                <span 
                    class="text-sm text-red-500"
                    v-if="errors.email"
                >
                    {{ errors.email[0] }}
                </span>
            </fieldset>

            <fieldset class="fieldset w-64">
                <legend class="fieldset-legend">Password</legend>
                <input v-model="formData.password" type="password" class="input" placeholder="Password" />
                <span 
                    class="text-sm text-red-500"
                    v-if="errors.password"
                >
                    {{ errors.password[0] }}
                </span>
            </fieldset>

            <button type="submit" class="btn btn-primary text-white w-64">Sign in</button>
        </form>
    </div>
</template>
