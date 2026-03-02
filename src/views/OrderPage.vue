<template>
  <div class="p-6 bg-gray-100 min-h-screen">

    <!-- HEADER -->
    <h1 class="text-2xl font-bold mb-6">
      Order #{{ orderId }}
    </h1>

    <div class="grid grid-cols-3 gap-6">

      <!-- MENU -->
      <div class="col-span-2 bg-white p-4 rounded-xl shadow">
        <h2 class="font-semibold mb-4">Menu</h2>

        <div v-if="foods.length" class="space-y-3">
          <div
            v-for="food in foods"
            :key="food.id"
            class="flex justify-between items-center border p-3 rounded-lg hover:shadow transition"
          >
            <div>
              <p class="font-semibold">{{ food.name }}</p>
              <p class="text-sm text-gray-500">
                Rp {{ formatRupiah(food.price) }}
              </p>
            </div>

            <!-- ADD kalau open / process -->
            <button
              v-if="auth.user?.role === 'pelayan' && isEditable"
              @click="addItem(food.id)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              +
            </button>
          </div>
        </div>

        <div v-else>Loading menu...</div>
      </div>

      <!-- ORDER -->
      <div class="bg-white p-4 rounded-xl shadow flex flex-col justify-between">

        <div>
          <h2 class="font-semibold mb-4">Current Order</h2>

          <div v-if="order">

            <!-- ITEM LIST -->
            <div v-if="order.items && order.items.length">
              <div
                v-for="item in order.items"
                :key="item.id"
                class="flex justify-between text-sm mb-2"
              >
                <span>{{ item.food?.name }} x{{ item.qty }}</span>
                <span>
                  Rp {{ formatRupiah(item.food?.price * item.qty) }}
                </span>
              </div>
            </div>

            <div v-else class="text-gray-400 text-sm">
              Belum ada pesanan
            </div>

            <!-- TOTAL -->
            <div class="border-t mt-4 pt-3 font-bold">
              Total: Rp {{ formatRupiah(order.total) }}
            </div>

          </div>
        </div>

        <!-- ACTION -->
        <div class="mt-6 space-y-2">

          <!-- SEND TO KITCHEN -->
          <button
            v-if="auth.user?.role === 'kasir'"
            @click="sendKitchen"
            class="w-full bg-gray-900 text-white py-2 rounded hover:bg-black"
          >
            🍳 Send to Kitchen
          </button>


          <!-- SAVE -->
          <button
            @click="saveDraft"
            class="w-full border py-2 rounded hover:bg-gray-100"
          >
            💾 Save Draft
          </button>

          <!-- PRINT -->
          <button
            v-if="auth.user?.role === 'kasir'"
            @click="printReceipt"
            class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            🧾 Print Bill
          </button>

        </div>

      </div>

    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();

const orderId = route.params.id;

const order = ref(null);
const foods = ref([]);
const auth = useAuthStore();

const formatRupiah = (val) => {
  return new Intl.NumberFormat("id-ID").format(val || 0);
};

// STATUS EDITABLE
const isEditable = computed(() => {
  return order.value?.status === 'open' || order.value?.status === 'process';
});

// GET ORDER
const fetchOrder = async () => {
  const res = await api.get(`/orders/${orderId}`);
  order.value = res.data;
};

// GET FOODS
const fetchFoods = async () => {
  const res = await api.get("/foods");
  foods.value = res.data;
};

// ADD ITEM
const addItem = async (foodId) => {
  await api.post(`/orders/${orderId}/add-item`, {
    food_id: foodId,
    qty: 1
  });

  fetchOrder();
};

// SEND TO KITCHEN
const sendKitchen = async () => {
  try {
    await api.post(`/orders/${orderId}/process`);
    alert("Dikirim ke kitchen!");
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Gagal kirim ke kitchen");
  }
};

// CLOSE ORDER
const closeOrder = async () => {
  await api.post(`/orders/${orderId}/close`);
  alert("Order selesai!");
  router.push("/dashboard");
};

// SAVE
const saveDraft = () => {
  router.push("/dashboard");
};

// PRINT
const printReceipt = async () => {
  const res = await api.get(`/orders/${orderId}/receipt`, {
    responseType: "blob"
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  window.open(url);
};

onMounted(() => {
  fetchOrder();
  fetchFoods();
});
</script>