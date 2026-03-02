<!-- src/views/auth/Register.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>

      <form @submit.prevent="submit" class="space-y-4">
        <input v-model="name" placeholder="Nama"
          class="w-full p-3 border rounded-lg" />

        <input v-model="email" type="email" placeholder="Email"
          class="w-full p-3 border rounded-lg" />

        <input v-model="password" type="password" placeholder="Password"
          class="w-full p-3 border rounded-lg" />

        <select v-model="role" class="w-full p-3 border rounded-lg">
          <option value="pelayan">Pelayan</option>
          <option value="kasir">Kasir</option>
        </select>

        <button
          class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
          Register
        </button>
      </form>

      <p class="text-center mt-4 text-sm">
        Sudah punya akun?
        <router-link to="/" class="text-blue-600 font-semibold">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("pelayan");

const auth = useAuthStore();
const router = useRouter();

const submit = async () => {
  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    });

    // balik ke login setelah register
    router.push('/');

  } catch (err) {
    alert(JSON.stringify(err.response?.data?.errors));
  }
};
</script>