<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold">Dashboard / Table List</h1>
      <button @click="logout"
        class="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>

    <!-- CARD -->
    <div class="bg-white p-6 rounded-xl shadow">

      <!-- STATUS -->
      <div class="flex gap-4 mb-4 text-sm">
        <span class="flex items-center gap-2">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          Available
        </span>
        <span class="flex items-center gap-2">
          <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
          Occupied
        </span>
      </div>

      <div class="grid grid-cols-4 gap-4">
        
        <!-- TABLE GRID -->
        <div class="col-span-3 grid grid-cols-6 gap-3">
          <div v-for="table in tables" :key="table.id"
            @click="openTable(table)"
            :class="[
              'p-6 text-center rounded-lg cursor-pointer text-white',
              table.status === 'available' ? 'bg-green-500' : 'bg-gray-500'
            ]">
            {{ table.number }}
          </div>
        </div>

        <!-- SUMMARY -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Quick Stats</h3>

          <p>Available: {{ summary.available }}</p>
          <p>Occupied: {{ summary.occupied }}</p>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const tables = ref([]);
const summary = ref({ available: 0, occupied: 0 });

const router = useRouter();
const auth = useAuthStore();

const fetchTables = async () => {
  const res = await api.get("/tables");
  tables.value = res.data.data;
  summary.value = res.data.summary;
};

const openTable = (table) => {
  alert(`Open table ${table.number}`);
};

const logout = () => {
  auth.logout();
  router.push('/');
};

onMounted(() => {
  fetchTables();
});
</script>