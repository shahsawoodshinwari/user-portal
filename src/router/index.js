import FAQs from '@/views/FAQs.vue'
import HomeView from '@/views/HomeView.vue'
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
  ],
})

export default router
