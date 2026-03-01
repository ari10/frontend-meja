<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Riwayat Transaksi</h1>

    <!-- SEARCH -->
    <input
      v-model="search"
      placeholder="Search ID..."
      class="mb-4 p-2 border rounded w-64"
    />

    <!-- TABLE -->
    <div class="bg-white rounded-xl shadow overflow-hidden">
      <table class="w-full text-sm">
        
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">ID</th>
            <th class="p-3 text-left">Meja</th>
            <th class="p-3 text-left">Total</th>
            <th class="p-3 text-left">Status</th>
            <th class="p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="p-3">#{{ order.id }}</td>
            <td class="p-3">{{ order.table_id }}</td>
            <td class="p-3">Rp {{ order.total }}</td>

            <!-- STATUS -->
            <td class="p-3">
              <span
                :class="order.status === 'open'
                  ? 'text-blue-600 font-semibold'
                  : 'text-green-600 font-semibold'"
              >
                {{ order.status }}
              </span>
            </td>

            <!-- ACTION -->
            <td class="p-3 flex gap-2">
              <button 
                @click="editOrder(order)"
                :disabled="order.status === 'closed'"
                class="bg-yellow-400 px-3 py-1 rounded text-white 
                        hover:bg-yellow-500 
                        disabled:bg-gray-400 
                        disabled:cursor-not-allowed 
                        disabled:opacity-70"
                >
                Edit
                </button>

              <button
                @click="deleteOrder(order.id)"
                  :disabled="order.status === 'closed'"
                class="bg-red-400 px-3 py-1 rounded text-white 
                        hover:bg-yellow-500 
                        disabled:bg-gray-400 
                        disabled:cursor-not-allowed 
                        disabled:opacity-70"
                >
                Delete
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <!-- MODAL EDIT -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 class="text-lg font-bold mb-4">Edit Order</h2>

        <label class="block mb-2">Meja</label>
        <input
          v-model="selectedOrder.table_id"
          class="w-full border p-2 mb-3 rounded"
        />

        <label class="block mb-2">Status</label>
        <select
          v-model="selectedOrder.status"
          class="w-full border p-2 mb-4 rounded"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <div class="flex justify-end gap-2">
          <button
            @click="showModal = false"
            class="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            @click="updateOrder"
            class="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/services/api";

// STATE
const orders = ref([]);
const search = ref("");

const showModal = ref(false);
const selectedOrder = ref(null);

// FETCH DATA
const fetchHistory = async () => {
  const res = await api.get("/orders/history");
  orders.value = res.data;
};

// FILTER SEARCH
const filteredOrders = computed(() => {
  return orders.value.filter(o =>
    o.id.toString().includes(search.value)
  );
});

// EDIT
const editOrder = (order) => {
  selectedOrder.value = { ...order };
  showModal.value = true;
};

// UPDATE
const updateOrder = async () => {
  await api.put(`/orders/${selectedOrder.value.id}`, {
    table_id: selectedOrder.value.table_id,
    status: selectedOrder.value.status
  });

  showModal.value = false;
  fetchHistory();
};

// DELETE
const deleteOrder = async (id) => {
  if (confirm("Yakin hapus order ini?")) {
    await api.delete(`/orders/${id}`);
    fetchHistory();
  }
};

onMounted(fetchHistory);
</script>