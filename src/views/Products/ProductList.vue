<script>
import ProductCard from '@/components/Product/ProductCard.vue'
import ProductPlaceholderCard from '@/components/Product/ProductPlaceholderCard.vue'

export default {
  components: {
    ProductCard,
    ProductPlaceholderCard,
  },
  data() {
    return {
      products: [],
      loading: false,
    }
  },
  methods: {
    async fetchProducts() {
      this.loading = true
      try {
        const res = await fetch('https://dummyjson.com/products')
        this.products = (await res.json()).products
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    console.log('mounted')
    this.fetchProducts()
  },
  unmounted() {
    console.log('unmounted')
  },
}
</script>

<template>
  <template v-if="products.length > 0 && !loading">
    <h1 class="mb-4">Premium Products</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
      <div class="col" v-for="(product, index) in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </template>
  <template v-else-if="loading">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
      <div class="col" v-for="number in [1, 2, 3, 4, 5, 6, 7, 8]">
        <ProductPlaceholderCard />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="row row-cols-1">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <p>No products found.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style></style>
