<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Meja Tersedia</h1>

      <button
        @click="goLogin"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </div>

    <!-- STATUS -->
    <div class="flex gap-4 mb-4 text-sm">
      <span class="flex items-center gap-1">
        <span class="w-3 h-3 bg-green-500 rounded-full"></span>Meja Tersedia
      </span>
      <span class="flex items-center gap-1">
        <span class="w-3 h-3 bg-gray-400 rounded-full"></span> Meja Terisi
      </span>
    </div>
   <div class="bg-white shadow rounded p-4">
        <h2 class="font-semibold mb-3">Status Meja</h2>

        <div>Tersedia: {{ summary.available }}</div>
        <div>Terisi: {{ summary.occupied }}</div>
        
      </div>
    <!-- GRID MEJA -->
    <div class="grid grid-cols-6 gap-4">
      <div
        v-for="table in tables"
        :key="table.id"
        class="p-6 rounded-xl text-center text-white font-bold cursor-not-allowed opacity-80"
        :class="table.status === 'available'
          ? 'bg-green-500'
          : 'bg-gray-400'"
      >
        Meja {{ table.number }}
      </div>
    </div>
       <!-- STATS -->
   
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const summary = ref({});
const router = useRouter();
const tables = ref([]);

const fetchTables = async () => {
  const res = await api.get('/tables'); // tetap pakai API
  tables.value = res.data.data;
 summary.value = res.data.summary;
};

const goLogin = () => {
  router.push('/login');
};

onMounted(fetchTables);
</script>