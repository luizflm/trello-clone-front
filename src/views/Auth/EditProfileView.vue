<script setup>
import FormContainer from '@/components/Auth/Forms/FormContainer.vue';
import FormTitle from '@/components/Auth/Forms/FormTitle.vue';
import InputError from '@/components/Auth/Forms/InputError.vue';
import SubmitButton from '@/components/Auth/Forms/SubmitButton.vue';
import TextInput from '@/components/Auth/Forms/TextInput.vue';
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const { errors, user } = storeToRefs(authStore);

onMounted(() => { errors.value = {} })

let newAvatar = null;

function handleAvatarUpload(event) {
    if (event.target.files && event.target.files[0]) {
        newAvatar = event.target.files[0];
    }
}

function handleSubmit() {
    const data = new FormData();

    data.append('name', user.value.name);
    data.append('email', user.value.email);

    if (newAvatar) {
        data.append('avatar', newAvatar);
    }

    authStore.updateProfile(data);
}
</script>

<template>
    <FormContainer @submit-form="handleSubmit">
        <FormTitle title="Edit Profile" />

        <TextInput
            :modelValue="user.name"
            @update:modelValue="$event => (user.name = $event)"
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
            :modelValue="user.email"
            @update:modelValue="$event => (user.email = $event)"
            type="email"
            label="Email"
            placeholder="ex: johndoe@gmail.com"
        >
            <InputError v-if="errors.email" :description="errors.email[0]"/>
        </TextInput>

        <SubmitButton title="Update Profile" />
    </FormContainer>
</template>