<script>
import { RouterView } from 'vue-router'
import router from './router'

export default {
  data() {
    return {
      navItems: [
        { label: 'Home', route: 'home' },
        { label: 'Register', route: 'auth.register' },
        { label: 'FAQs', route: 'faqs' },
        { label: 'Products', route: 'products.index' },
      ],
    }
  },
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark stick-top">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: 'home' }">User Portal</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <template v-for="(navItem, index) in navItems">
            <li class="nav-item">
              <router-link activeClass="active" class="nav-link" :to="{ name: navItem.route }">
                {{ navItem.label }}
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>

  <main class="container py-3">
    <RouterView />
  </main>
</template>
