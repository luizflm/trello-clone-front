<script setup>
import { useTemplateRef } from "vue";

const props = defineProps({
  boardName: String,
});

const modal = useTemplateRef("modal");

function showModal() {
  modal.value?.showModal();
}

defineExpose({ showModal });
</script>

<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-bold">{{ props.boardName }}</h3>
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost">✕</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
