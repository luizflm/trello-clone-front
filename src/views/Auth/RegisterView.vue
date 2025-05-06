<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from '@/stores/AuthStore.js';
import { storeToRefs } from "pinia";
import TextInput from "@/components/Auth/Forms/TextInput.vue";
import FormTitle from "@/components/Auth/Forms/FormTitle.vue";
import SubmitButton from "@/components/Auth/Forms/SubmitButton.vue";
import FormContainer from "@/components/Auth/Forms/FormContainer.vue";
import InputError from "@/components/Auth/Forms/InputError.vue";

const authStore = useAuthStore();
const { errors } = storeToRefs(authStore)

const formData = reactive({
    name: '',
    email: '',
    avatar: '',
    password: '',
    password_confirmation: ''
});

onMounted(() => { errors.value = {} })

function handleAvatarUpload(event) {
    if (event.target.files && event.target.files[0]) {
        formData.avatar = event.target.files[0];
    }
}

function handleSubmit() {
    const data = new FormData();

    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('password_confirmation', formData.password_confirmation);

    if (formData.avatar) {
        data.append('avatar', formData.avatar);
    }

    authStore.register(data);
}
</script>

<template>
    <FormContainer @submit-form="handleSubmit">
        <FormTitle title="Sign up" />

        <TextInput 
            :modelValue="formData.name"
            @update:modelValue="$event => (formData.name = $event)"
            type="text"
            label="Name"
            placeholder="ex: John Doe"
        >
            <InputError v-if="errors.name" :description="errors.name[0]"/>
        </TextInput>

        <fieldset class="fieldset w-64">
            <legend class="fieldset-legend">Profile Photo</legend>
            <input class="file-input" type="file" accept=".png,.jpg,.jpeg" @change="handleAvatarUpload"/>
            <InputError v-if="errors.avatar" :description="errors.avatar[0]"/>
        </fieldset>

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

        <TextInput 
            :modelValue="formData.password_confirmation"
            @update:modelValue="$event => (formData.password_confirmation = $event)"
            type="password"
            label="Password Confirmation"
            placeholder="Password Confirmation"
        />

        <SubmitButton title="Sign up" />
    </FormContainer>
</template>
