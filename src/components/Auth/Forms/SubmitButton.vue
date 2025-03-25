<script setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <button type="submit" class="btn btn-primary text-white w-64">{{ props.title }}</button>
</template>