<script setup>
import FormContainer from '@/components/Auth/Forms/FormContainer.vue';
import FormTitle from '@/components/Auth/Forms/FormTitle.vue';
import InputError from '@/components/Auth/Forms/InputError.vue';
import SubmitButton from '@/components/Auth/Forms/SubmitButton.vue';
import TextInput from '@/components/Auth/Forms/TextInput.vue';
import { useBoardStore } from '@/stores/BoardStore';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';

const boardStore = useBoardStore();
const { errors } = storeToRefs(boardStore);

onMounted(() => {
    errors.value = {};
});

const formData = reactive({
    name: ''
});
</script>

<template>
    <FormContainer @submit-form="boardStore.createBoard(formData)">
        <FormTitle title="Create Board" />

        <TextInput 
            :modelValue="formData.name"
            @update:modelValue="$event => (formData.name = $event)"
            type="text"
            label="Name"
            placeholder="ex: Daily"
        >
            <InputError v-if="errors.name" :description="errors.name[0]"/>
        </TextInput>

        <SubmitButton title="Create" />
    </FormContainer>
</template>
