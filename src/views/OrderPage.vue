<template>
  <div class="p-6 bg-gray-100 min-h-screen">

    <!-- HEADER -->
    <h1 class="text-2xl font-bold mb-6">
      Order #{{ orderId }}
    </h1>

    <div class="grid grid-cols-3 gap-6">

      <!-- 🍔 LIST MAKANAN -->
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

           <button
            v-if="auth.user?.role === 'pelayan' && order.status === 'open'"
            @click="addItem(food.id)"
            class="bg-blue-500 text-white px-2 py-1 rounded"
            >
            +
            </button>
            
          </div>
          
        </div>

        <div v-else>Loading menu...</div>
      </div>

      <!-- 🧾 ORDER DETAIL -->
      <div class="bg-white p-4 rounded-xl shadow">
        <h2 class="font-semibold mb-4">Current Order</h2>

        <div v-if="order">

          <div v-if="order.items && order.items.length">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex justify-between text-sm mb-2"
            >
              <span>
                {{ item.food.name }} x{{ item.qty }}
              </span>
              <span>
                Rp {{ formatRupiah(item.food.price * item.qty) }}
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

          <!-- CLOSE ORDER -->
        <button
        v-if="auth.user?.role === 'kasir' && order.status === 'open'"
        @click="closeOrder"
        class="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
        Close Order
        </button>

        </div>

        <div v-else>Loading order...</div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
  return new Intl.NumberFormat("id-ID").format(val);
};

// ambil order
const fetchOrder = async () => {
  const res = await api.get(`/orders/${orderId}`);
  order.value = res.data;
};

// ambil makanan
const fetchFoods = async () => {
  const res = await api.get("/foods");
  foods.value = res.data;
};

// tambah item
const addItem = async (foodId) => {
  await api.post(`/orders/${orderId}/add-item`, {
    food_id: foodId,
    qty: 1
  });

  fetchOrder(); // refresh realtime
};

// close order
const closeOrder = async () => {
  await api.post(`/orders/${orderId}/close`);
  alert("Order selesai!");
  router.push("/dashboard");
};

onMounted(() => {
  fetchOrder();
  fetchFoods();
});
</script>