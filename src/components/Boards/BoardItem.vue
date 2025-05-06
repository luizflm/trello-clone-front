<script setup>
import DeleteBoardButton from './DeleteBoardButton.vue';
import EditBoardButton from './EditBoardButton.vue';
import ShowBoardButton from './ShowBoardButton.vue';

defineProps({
    board: Object
});
</script>

<template>
    <div class="card bg-base-100 shadow-md hover:shadow-lg transition duration-200 min-w-[250px] max-w-[300px] flex-grow">
        <div class="card-body items-center text-center space-y-8">
            <h2 class="card-title">{{ board.name }}</h2>

            <div class="flex justify-center items-center">
                <ShowBoardButton :boardName="board.name" />

                <EditBoardButton :boardId="board.id" />

                <DeleteBoardButton :boardId="board.id" />
            </div>
        </div>
    </div>
</template>