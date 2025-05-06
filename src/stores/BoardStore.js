import { useFlash } from "@/composables/useFlash";
import axios from "axios";
import { defineStore } from "pinia"

export const useBoardStore = defineStore('boardStore', {
    state: () => {
        return {
            boards: [],
            currentBoard: {},
            errors: {}
        }
    },

    actions: {
        async createBoard(data) {
            const url = 'http://127.0.0.1:8000/api/boards';

            axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                this.boards.push(response.data.board);

                const { flash } = useFlash();
                flash('Success', 'Board successfully created!', 'success');

                this.errors = {};
                this.router.push({ name: 'boards.index'});
            })
            .catch((error) => {
                this.errors = error.response.data.errors;
            });
        },

        async findBoard(id) {
            const url = `http://127.0.0.1:8000/api/boards/${id}`;

            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                this.currentBoard = response.data.board;
            })
            .catch((error) => {
                if (error.status == 403 || error.status == 404) {
                    this.router.push({ name: 'boards.index'});
                }
            })
        },

        async updateBoard(id, data) {
            const url = `http://127.0.0.1:8000/api/boards/${id}`;

            axios.patch(url, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {
                this.errors = {};

                const { flash } = useFlash();
                flash('Success', 'Board successfully updated!', 'success');

                this.router.push({ name: 'boards.index'});
            })
            .catch((error) => {
                if (error.status == 422) {
                    this.errors = error.response.data.errors;
                }

                if (error.status == 403 || error.status == 404) {
                    this.router.push({ name: 'boards.index' });
                }
            })
        },

        async getUserBoards() {
            const url = 'http://127.0.0.1:8000/api/boards';

            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                this.boards = response.data.boards;
            })
            .catch((error) => {
                if (error.status == 403) {
                    this.router.push({ name: 'boards.index'});
                }
            })
        },

        async deleteBoard(id) {
            const url = `http://127.0.0.1:8000/api/boards/${id}`;

            axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(async () => {
                await this.getUserBoards();

                const { flash } = useFlash();
                flash('Success', 'Board successfully deleted!', 'success');

                this.router.push({ name: 'boards.index'});
            })
            .catch((error) => {
                if (error.status == 403 || error.status == 404) {
                    this.router.push({ name: 'boards.index' });
                }
            })
        },
    }
});