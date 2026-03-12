<script>
export default {
  props: {
    rating: { type: Number, required: true },
    small: { type: Boolean, default: false },
  },
}
</script>

<template>
  <span :class="small ? 'small' : ''">
    <i
      v-for="n in 5"
      :key="n"
      class="bi"
      :class="n <= Math.round(rating) ? 'bi-star-fill text-warning' : 'bi-star text-secondary'"
    ></i>
  </span>
</template>
