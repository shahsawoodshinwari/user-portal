<script>
export default {
  props: {
    images: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <div class="col-md-6 ">
    <div
      id="productCarousel"
      class="carousel slide carousel-dark "
      data-bs-ride="carousel"
      v-if="images && images.length"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(img, idx) in images"
          :class="{ active: idx === 0 }"
          :key="idx"
        >
          <img :src="img" class="d-block w-100" :alt="title" />
        </div>
      </div>
      <button
        class="carousel-control-prev "
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
