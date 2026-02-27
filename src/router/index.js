import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔥 TARUH DI SINI (SETELAH router dibuat)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.path === '/dashboard' && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;