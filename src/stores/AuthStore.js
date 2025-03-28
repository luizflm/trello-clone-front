import { useFlash } from "@/composables/useFlash";
import axios from "axios";
import { defineStore } from "pinia"

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
            userAvatar: null,
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

        async getUserAvatar() {
            if (localStorage.getItem("token")) {
                try {
                    const response = await axios.get("http://127.0.0.1:8000/api/avatar", {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    this.userAvatar = response.data;
                } catch (error) {
                    this.errors = error.response.data.errors;
                }
            }
        },
        
        async register(formData) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/register', formData);

                this.errors = {};
                localStorage.setItem("token", response.data.token);
                this.user = response.data.user;
                await this.getUserAvatar();
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
                await this.getUserAvatar();
                this.router.push({ name: 'home'});
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        }, 

        async logout() {
            try {
                if (localStorage.getItem("token")) {
                    await axios.delete('http://127.0.0.1:8000/api/logout', {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    this.errors = {};
                    localStorage.removeItem("token");
                    this.user = null;
                    this.userAvatar = null;
                    this.router.push({ name: 'auth.login'});
                }
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        },

        async updateProfile(formData) {
            try {
                if (localStorage.getItem('token')) {
                    const response = await axios.post(`http://127.0.0.1:8000/api/users/${this.user.id}`, formData, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
    
                    this.errors = {};
                    this.user = response.data.user;
                    await this.getUserAvatar();

                    const { flash } = useFlash();
                    flash('Success', 'Your profile has been updated successfully', 'success');
                    
                    this.router.push({ name: 'profile.edit'});
                }
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        }
    }
});