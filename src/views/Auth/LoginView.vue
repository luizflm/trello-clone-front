<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from '@/stores/AuthStore.js';
import { storeToRefs } from "pinia";
import FormContainer from "@/components/Auth/Forms/FormContainer.vue";
import FormTitle from "@/components/Auth/Forms/FormTitle.vue";
import TextInput from "@/components/Auth/Forms/TextInput.vue";
import SubmitButton from "@/components/Auth/Forms/SubmitButton.vue";
import InputError from "@/components/Auth/Forms/InputError.vue";

const authStore = useAuthStore();
const { errors } = storeToRefs(authStore)

const formData = reactive({
    email: '',
    password: '',
});

onMounted(() => { errors.value = {} })
</script>

<template>
    <FormContainer @submit-form="authStore.login(formData)">
        <FormTitle title="Sign in" />

        <TextInput 
            :modelValue="formData.email"
            @update:modelValue="$event => (formData.email = $event)"
            type="email"
            label="Email"
            placeholder="ex: johndoe@gmail.com"
        >
            <InputError v-if="errors.email" :description="errors.email[0]"/>
        </TextInput>
        
        <TextInput 
            :modelValue="formData.password"
            @update:modelValue="$event => (formData.password = $event)"
            type="password"
            label="Password"
            placeholder="Password"
        >
            <InputError v-if="errors.password" :description="errors.password[0]"/>
        </TextInput>

        <SubmitButton title="Sign in" />
    </FormContainer>
</template>
