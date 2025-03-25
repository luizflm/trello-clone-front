<script setup>
const emit = defineEmits(['submit-form']);
</script> 

<template>
     <div class="pt-10 flex justify-center w-3xl">
        <form
            @submit.prevent="emit('submit-form')"
            class="flex flex-col items-center space-y-4 w-full"
        >
            <slot></slot>
        </form>
    </div>
</template>