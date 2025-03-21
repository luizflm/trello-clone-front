import axios from "axios";
import { defineStore } from "pinia"

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
            errors: {}
        }
    },

    actions: {
        async authenticate(route, formData) {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/${route}`, formData);

                this.errors = {};
                localStorage.setItem("token", response.data.token);
                this.user = response.data.user;
                this.router.push({ name: 'home'});``
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        }
    }
});