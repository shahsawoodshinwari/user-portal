<script>
import { money } from '@/utils/money.js'

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    money,
  },
}
</script>

<template>
  <div class="card h-100 border-0 shadow">
    <img
      :src="product.thumbnail"
      class="card-img-top bg-light product-thumbnail"
      :style="{ minWidth: '300px', minHeight: '300px' }"
      loading="lazy"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">
        {{ product.title }}
      </h5>
      <p class="card-text">
        {{ product.description }}
      </p>
      <div class="d-flex justify-content-between gap-3 flex-wrap">
        <div class="fw-bold">
          {{ money(product.price) }}
        </div>
        <RouterLink
          :to="{ name: 'products.show', params: { productId: product.id } }"
          class="btn btn-sm btn-primary stretched-link"
        >
          View More
        </RouterLink>
      </div>
    </div>
  </div>
</template>
