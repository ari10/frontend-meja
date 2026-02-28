import { defineStore } from "pinia";
import api from "@/services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async login(data) {
      const res = await api.post("/login", data);

      this.token = res.data.token;
      this.user = res.data.user;

      localStorage.setItem("token", this.token);
      localStorage.setItem("user", JSON.stringify(this.user));
    },

    async register(data) {
      await api.post("/register", data);
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      this.user = null;
      this.token = null;
    }
  }
});