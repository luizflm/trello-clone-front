<script setup>
import BoardItem from '@/components/Boards/BoardItem.vue';
import BoardsContainer from '@/components/Boards/BoardsContainer.vue';
import { useBoardStore } from '@/stores/BoardStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const boardStore = useBoardStore();
const { boards } = storeToRefs(boardStore);

onMounted(async () => {
    await boardStore.getUserBoards();
})
</script>

<template>
  <div class="pt-10 flex flex-col items-center space-y-10 px-4">
    <h1 class="font-bold text-3xl text-center">My Boards</h1>

    <BoardsContainer>
        <BoardItem v-for="board in boards" :key="board.id" :board="board"/>
    </BoardsContainer>
  </div>
</template>
