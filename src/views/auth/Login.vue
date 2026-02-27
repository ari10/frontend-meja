<!-- src/views/auth/Login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <form @submit.prevent="submit" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email"
          class="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200" />

        <input v-model="password" type="password" placeholder="Password"
          class="w-full p-3 border rounded-lg focus:ring focus:ring-blue-200" />

        <button
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </form>

      <p class="text-center mt-4 text-sm">
        Belum punya akun?
        <router-link to="/register" class="text-blue-600 font-semibold">
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  try {
    await auth.login({
      email: email.value,
      password: password.value
    });

    // 🔥 redirect ke dashboard
    router.push('/dashboard');

  } catch (err) {
    alert(err.response?.data?.message || 'Login gagal');
  }
};
</script>