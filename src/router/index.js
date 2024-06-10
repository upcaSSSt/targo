import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { showAddBtn: false, showBasketBtn: true },
  },
  {
    path: '/basket',
    name: 'basket',
    component: () => import('../views/BasketView.vue'),
    meta: { showAddBtn: false, showBasketBtn: false },
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: { showAddBtn: true, showBasketBtn: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
