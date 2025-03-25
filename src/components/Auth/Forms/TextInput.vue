<script setup>
const props = defineProps({
    modelValue: String,
    label: String,
    placeholder: String,
    type: String
});

const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <fieldset class="fieldset w-64">
        <legend class="fieldset-legend">{{ props.label }}</legend>

        <input 
            :value="props.modelValue" 
            @input="emit('update:modelValue', $event.target.value)" 
            :type="props.type" 
            class="input" 
            :placeholder="props.placeholder" 
        />

        <slot></slot>
    </fieldset>
</template>