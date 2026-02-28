<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";
import { useAuthStore } from "../stores/auth";

const tables = ref([]);
const summary = ref({});
const router = useRouter();
const auth = useAuthStore();

let interval = null;

const fetchTables = async () => {
  const res = await api.get("/tables");
  tables.value = res.data.data;
  summary.value = res.data.summary;
};

const openTable = async (tableId) => {
  // 🔥 langsung buka order (backend handle open)
  const res = await api.post(`/orders/open/${tableId}`);
  router.push(`/order/${res.data.id}`);
};

const logout = () => {
  auth.logout();
  router.push("/");
};

onMounted(() => {
  fetchTables();

  // 🔥 AUTO REFRESH tiap 3 detik
  interval = setInterval(() => {
    fetchTables();
  }, 3000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="p-6">

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">
        Dashboard / Table List
      </h1>

      <div class="flex gap-2">
        <button
          @click="$router.push('/foods')"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Manage Menu
        </button>

        <button
          @click="logout"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>

    <!-- LEGEND -->
    <div class="flex gap-4 mb-4">
      <span class="flex items-center gap-2">
        <span class="w-3 h-3 bg-green-500 rounded-full"></span>
        Available
      </span>
      <span class="flex items-center gap-2">
        <span class="w-3 h-3 bg-gray-400 rounded-full"></span>
        Occupied
      </span>
    </div>

    <div class="grid grid-cols-4 gap-6">

      <!-- TABLE GRID -->
      <div class="col-span-3 grid grid-cols-6 gap-4">
        <div
          v-for="table in tables"
          :key="table.id"
          @click="openTable(table.id)"
          :class="[
            'p-6 rounded text-center cursor-pointer transition',
            table.status === 'available'
              ? 'bg-green-500 text-white'
              : 'bg-gray-400 text-white'
          ]"
        >
          <div class="text-lg font-bold">
            {{ table.number }}
          </div>
          <div class="text-sm">
            {{ table.status }}
          </div>
        </div>
      </div>

      <!-- STATS -->
      <div class="bg-white shadow rounded p-4">
        <h2 class="font-semibold mb-3">Quick Stats</h2>

        <div>Available: {{ summary.available }}</div>
        <div>Occupied: {{ summary.occupied }}</div>
      </div>

    </div>
  </div>
</template>