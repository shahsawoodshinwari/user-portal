<script>
import { formatDate } from '@/utils/date'

export default {
  props: {
    product: {
      type: Object,
      default: {},
    },
  },
  methods: {
    formatDate,
  },
}
</script>

<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><strong>Warranty:</strong> {{ product.warrantyInformation }}</li>
    <li class="list-group-item"><strong>Shipping:</strong> {{ product.shippingInformation }}</li>
    <li class="list-group-item"><strong>Return Policy:</strong> {{ product.returnPolicy }}</li>
    <li class="list-group-item">
      <strong>Minimum Order Qty:</strong> {{ product.minimumOrderQuantity }}
    </li>
    <li class="list-group-item" v-if="product.meta">
      <strong>Created:</strong> {{ formatDate(product.meta.createdAt) }}
    </li>
    <li class="list-group-item" v-if="product.meta">
      <strong>Updated:</strong> {{ formatDate(product.meta.updatedAt) }}
    </li>
  </ul>
</template>
