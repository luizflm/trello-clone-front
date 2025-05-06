<script setup>
import { useBoardStore } from '@/stores/BoardStore';
import { useTemplateRef } from 'vue';

const props = defineProps({
    boardId: Number
})

const boardStore = useBoardStore();
const deleteBoardModal = useTemplateRef('deleteBoardModal');

function showModal() {
    deleteBoardModal.value?.showModal();
}

defineExpose({ showModal });

async function deleteBoard() {
    await boardStore.deleteBoard(props.boardId);
}
</script>

<template>
    <dialog ref="deleteBoardModal" class="modal ">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Are you sure to delete this?</h3>
            <div class="modal-action flex justify-center mt-10">
                <form method="dialog" class="space-x-2">
                    <button class="btn btn-outline btn-error" @click="deleteBoard()">Delete</button>
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>