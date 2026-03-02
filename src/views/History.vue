<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Riwayat Transaksi</h1>

    <!-- SEARCH -->
    <input
      v-model="search"
      placeholder="Search ID..."
      class="mb-4 p-2 border rounded w-64"
    />

    <!--  TABLE -->
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
            <td class="p-3">Rp {{ formatRupiah(order.total) }}</td>

            <!-- STATUS -->
            <td class="p-3">
              <span
                :class="{
                  'text-blue-600 font-semibold': order.status === 'open',
                  'text-yellow-600 font-semibold': order.status === 'process',
                  'text-green-600 font-semibold': order.status === 'closed'
                }"
              >
                {{ order.status }}
              </span>
            </td>

            <!-- ACTION -->
            <td class="p-3 flex gap-2">

              <!-- CLOSE (hanya process) -->
              <button
                v-if="order.status === 'process'"
                @click="closeOrder(order.id)"
                :disabled="loading"
                class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:bg-gray-400"
              >
                Close
              </button>

              <!-- EDIT -->
              <button
                @click="editOrder(order)"
                :disabled="order.status === 'closed'"
                class="bg-yellow-400 px-3 py-1 rounded text-white 
                       hover:bg-yellow-500 
                       disabled:bg-gray-400 
                       disabled:cursor-not-allowed"
              >
                Edit
              </button>

              <!-- DELETE -->
              <button
                @click="deleteOrder(order.id)"
                :disabled="order.status === 'closed'"
                class="bg-red-500 px-3 py-1 rounded text-white 
                       hover:bg-red-600 
                       disabled:bg-gray-400 
                       disabled:cursor-not-allowed"
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
          <option value="process">Process</option>
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
const loading = ref(false);
const showModal = ref(false);
const selectedOrder = ref(null);

// FORMAT
const formatRupiah = (val) => {
  return new Intl.NumberFormat("id-ID").format(val);
};

// FETCH DATA (INI YANG DIPAKAI)
const fetchOrders = async () => {
  try {
    const res = await api.get("/history");
    orders.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

// 🔍 FILTER
const filteredOrders = computed(() => {
  return orders.value.filter(o =>
    o.id.toString().includes(search.value)
  );
});

// CLOSE ORDER
const closeOrder = async (id) => {
  try {
    loading.value = true;

    await api.post(`/orders/${id}/close`);

    alert("Order ditutup!");
    fetchOrders(); // ✅ FIX

  } catch (err) {
    console.error(err);
    alert("Gagal close order");
  } finally {
    loading.value = false;
  }
};

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
  fetchOrders();
};

// DELETE
const deleteOrder = async (id) => {
  if (confirm("Yakin hapus order ini?")) {
    await api.delete(`/orders/${id}`);
    fetchOrders();
  }
};

// INIT
onMounted(fetchOrders);
</script>