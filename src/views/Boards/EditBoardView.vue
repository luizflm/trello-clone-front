<script setup>
import FormContainer from '@/components/Auth/Forms/FormContainer.vue';
import FormTitle from '@/components/Auth/Forms/FormTitle.vue';
import InputError from '@/components/Auth/Forms/InputError.vue';
import SubmitButton from '@/components/Auth/Forms/SubmitButton.vue';
import TextInput from '@/components/Auth/Forms/TextInput.vue';
import { useBoardStore } from '@/stores/BoardStore';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';

const boardStore = useBoardStore();
const { errors, currentBoard } = storeToRefs(boardStore);
const route = useRoute();
const boardId = route.params.id;

const formData = reactive({
    name: ''
});

onMounted(async () => {
    errors.value = {};
    await boardStore.findBoard(boardId);
});

watch(currentBoard, (newValue) => {
    if (newValue.name) {
        formData.name = newValue.name;
    }
});
</script>

<template>
    <FormContainer @submit-form="boardStore.updateBoard(boardId, formData)">
        <FormTitle title="Edit Board" />

        <TextInput 
            :modelValue="formData.name"
            @update:modelValue="$event => (formData.name = $event)"
            type="text"
            label="Name"
            placeholder="ex: Daily"
        >
            <InputError v-if="errors.name" :description="errors.name[0]"/>
        </TextInput>

        <SubmitButton title="Update" />
    </FormContainer>
</template>
