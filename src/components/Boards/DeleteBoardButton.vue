<script setup>
import { useTemplateRef } from 'vue';
import DeleteBoardModal from './DeleteBoardModal.vue';

defineProps({
    boardId: Number
});

const deleteBoardModal = useTemplateRef('deleteBoardModal');

function showDeleteBoardModal() {
    deleteBoardModal.value?.showModal();
}
</script>

<template> 
    <button 
        class="btn btn-sm btn-circle btn-error"
        @click="showDeleteBoardModal()"
        title="Delete board"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z"></path></svg>
    </button>

    <DeleteBoardModal ref="deleteBoardModal" :boardId="boardId" />
</template>