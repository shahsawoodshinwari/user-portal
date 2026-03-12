import FAQs from '@/views/FAQs.vue'
import HomeView from '@/views/HomeView.vue'
import ProductList from '@/views/Products/ProductList.vue'
import ProductShow from '@/views/Products/ProductShow.vue'
import { createRouter, createWebHistory } from 'vue-router'
import UserRegistration from '@/views/Auth/UserRegistration.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'home',
      },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/register',
      name: 'auth.register',
      component: UserRegistration,
    },
    {
      path: '/public/faqs',
      name: 'faqs',
      component: FAQs,
    },
    {
      path: '/products',
      name: 'products.index',
      component: ProductList,
    },
    {
      path: '/products/:id',
      name: 'products.show',
      component: ProductShow,
    },
  ],
})

export default router
