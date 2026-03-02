import { createRouter, createWebHistory } from "vue-router";

// pages
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import OrderPage from "../views/OrderPage.vue"; // 🔥 WAJIB
import FoodPage from '@/views/FoodPage.vue';
import History from "../views/History.vue";

const routes = [
  {
    path: '/',
    name: 'GuestDashboard',
    component: () => import('@/views/GuestDashboard.vue')
  },

  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/order/:id",
    component: OrderPage,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/foods",
    component: FoodPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/history",
    component: History,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔥 MODERN GUARD (NO next())
router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return "/";
  }

  return true;
});

export default router;