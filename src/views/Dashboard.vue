<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <button @click="logout"
      class="bg-red-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push('/');
};
</script>