import { defineStore } from "pinia";
import api from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null
  }),

  actions: {
    async login(data) {
      const res = await api.post("/login", data);
      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem("token", this.token);
    },

    async register(data) {
      const res = await api.post("/register", data);
      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem("token", this.token);
    },

    logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.token = null;
    }
  }
});