<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Manage Menu</h1>

    <!-- FORM -->
    <div class="mb-4 flex gap-2">
      <input v-model="form.name" placeholder="Nama" class="border p-2 rounded" />
      <input v-model="form.price" type="number" placeholder="Harga" class="border p-2 rounded" />

      <button @click="saveFood" class="bg-blue-500 text-white px-3 rounded">
        {{ form.id ? 'Update' : 'Tambah' }}
      </button>
    </div>

    <!-- LIST -->
    <div class="space-y-2">
      <div v-for="food in foods" :key="food.id"
        class="flex justify-between border p-2 rounded">

        <span>{{ food.name }} - Rp {{ food.price }}</span>

        <div class="space-x-2">
          <button @click="editFood(food)" class="text-blue-500">Edit</button>
          <button @click="deleteFood(food.id)" class="text-red-500">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const foods = ref([]);
const form = ref({ name: '', price: '' });

const fetchFoods = async () => {
  const res = await api.get('/foods');
  foods.value = res.data;
};

const saveFood = async () => {
  if (form.value.id) {
    await api.put(`/foods/${form.value.id}`, form.value);
  } else {
    await api.post('/foods', form.value);
  }

  form.value = { name: '', price: '' };
  fetchFoods();
};

const editFood = (food) => {
  form.value = { ...food };
};

const deleteFood = async (id) => {
  await api.delete(`/foods/${id}`);
  fetchFoods();
};

onMounted(fetchFoods);
</script>