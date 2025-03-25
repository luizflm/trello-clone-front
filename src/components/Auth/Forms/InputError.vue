<script setup>
const props = defineProps({
    description: String
})
</script>

<template>
    <span class="text-sm text-red-500">
        {{ props.description }}
    </span>
</template>