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
        async getUser() {
            if (localStorage.getItem("token")) {
                try {
                    const response = await axios.get("http://127.0.0.1:8000/api/user", {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    this.user = response.data;
                } catch {
                    localStorage.removeItem("token");
                    this.router.push({ name: 'auth.login'});
                }
            }
        },
        
        async authenticate(route, formData) {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/api/${route}`, formData);

                this.errors = {};
                localStorage.setItem("token", response.data.token);
                this.user = response.data.user;
                this.router.push({ name: 'home'});
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        },

        async login(formData) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', formData);

                this.errors = {};
                localStorage.setItem("token", response.data.token);
                this.router.push({ name: 'home'});
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        }
    }
});