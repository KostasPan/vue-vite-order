import { createRouter, createWebHistory } from 'vue-router';
import ListingPage from '../pages/ListingPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListingPage,
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "cartpage" */ '../pages/CartPage.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
