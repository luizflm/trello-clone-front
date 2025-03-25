<script setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <h1 class="font-bold text-2xl">{{ props.title }}</h1>
</template>