<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from '@/stores/AuthStore.js';
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { errors } = storeToRefs(authStore)

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});

onMounted(() => { errors.value = {} })
</script>

<template>
    <div class="pt-10 flex justify-center w-3xl">
        <form 
            @submit.prevent="authStore.register(formData)"
            class="flex flex-col items-center space-y-4 w-full"
        >
            <h1 class="font-bold text-2xl">Sign up</h1>

            <fieldset class="fieldset w-64">
                <legend class="fieldset-legend">Name</legend>
                <input v-model="formData.name" type="text" class="input" placeholder="ex: John Doe" />
                <span 
                    class="text-sm text-red-500"
                    v-if="errors.name"
                >
                    {{ errors.name[0] }}
                </span>
            </fieldset>

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

            <fieldset class="fieldset w-64">
                <legend class="fieldset-legend">Confirm Password</legend>
                <input v-model="formData.password_confirmation" type="password" class="input" placeholder="Confirm Password" />
            </fieldset>

            <button type="submit" class="btn btn-primary text-white w-64">Sign up</button>
        </form>
    </div>
    
</template>
