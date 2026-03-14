<script>
import ProductReview from './ProductReview.vue'

export default {
  components: {
    ProductReview,
  },
  props: {
    reviews: {
      type: Array,
      default: [],
    },
  },
}
</script>

<template>
  <ul class="list-group">
    <ProductReview v-for="(rev, idx) in reviews" :review="rev" :key="idx" />
  </ul>
</template>
