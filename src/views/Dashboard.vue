<template>
  <div class="p-6 bg-gray-100 min-h-screen">

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Dashboard / Table List</h1>

      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
    <button
      @click="$router.push('/foods')"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
    >
      Manage Menu
    </button>
    <!-- CARD -->
    <div class="bg-white p-6 rounded-xl shadow">

      <!-- STATUS LEGEND -->
      <div class="flex gap-6 mb-6 text-sm">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          Available
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
          Occupied
        </div>
      </div>

      <div class="grid grid-cols-4 gap-6">

        <!-- TABLE GRID -->
        <div class="col-span-3 grid grid-cols-6 gap-4">

          <div
            v-for="table in tables"
            :key="table.id"
            @click="handleClick(table)"
            :class="[
              'p-6 rounded-xl text-center text-white font-semibold transition transform',
              table.status === 'available'
                ? 'bg-green-500 hover:bg-green-600 hover:scale-105 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed opacity-70'
            ]"
          >
            <div class="text-lg">{{ table.number }}</div>

            <div class="text-xs mt-2 capitalize">
              {{ table.status }}
            </div>
          </div>

        </div>

        <!-- SUMMARY -->
        <div class="bg-gray-50 p-4 rounded-xl shadow-sm">
          <h3 class="font-semibold mb-4">Quick Stats</h3>

          <div class="space-y-2 text-sm">
            <p>Available: <b>{{ summary.available }}</b></p>
            <p>Occupied: <b>{{ summary.occupied }}</b></p>
          </div>
        </div>

      </div>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="mt-4 text-center text-gray-500">
      Loading data...
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const tables = ref([]);
const summary = ref({
  available: 0,
  occupied: 0
});
const loading = ref(false);

const router = useRouter();
const auth = useAuthStore();

// ambil data meja
const fetchTables = async () => {
  try {
    loading.value = true;

    const res = await api.get("/tables");

    tables.value = res.data.data;
    summary.value = res.data.summary;

  } catch (err) {
    console.error(err);
    alert("Gagal mengambil data meja");
  } finally {
    loading.value = false;
  }
};

// klik meja
const handleClick = async (table) => {
  if (table.status !== 'available') return;

  try {
    const res = await api.post(`/orders/open/${table.id}`);

    router.push(`/order/${res.data.id}`);
  } catch (err) {
    console.error(err);
    alert("Gagal membuka order");
  }
};

// logout
const logout = () => {
  auth.logout();
  router.push('/');
};

onMounted(() => {
  fetchTables();
});
</script>