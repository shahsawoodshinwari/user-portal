<script>
import StarRating from '@/components/Product/StarRating.vue'

export default {
  components: {
    StarRating,
  },
  data() {
    return {
      product: {},
      loading: false,
    }
  },
  computed: {
    discountedPrice() {
      if (this.product.discountPercentage) {
        return this.product.price * (1 - this.product.discountPercentage / 100)
      }
      return null
    },
  },
  methods: {
    money(value) {
      return new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
      }).format(value)
    },
    async fetchProducts() {
      this.loading = true
      try {
        const res = await fetch(`https://dummyjson.com/products/${this.$route.params.id}`)
        this.product = await res.json()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.fetchProducts()
  },
}
</script>

<template>
  <div v-if="loading" class="text-center my-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="container py-4">
    <div class="row">
      <div class="col-md-6">
        <div
          id="productCarousel"
          class="carousel slide"
          data-bs-ride="carousel"
          v-if="product.images && product.images.length"
        >
          <div class="carousel-inner">
            <div
              class="carousel-item"
              v-for="(img, idx) in product.images"
              :class="{ active: idx === 0 }"
              :key="idx"
            >
              <img :src="img" class="d-block w-100" :alt="product.title" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
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
      <div class="col-md-6">
        <h2>
          {{ product.title }} <small class="text-muted">#{{ product.id }}</small>
        </h2>
        <p class="text-muted mb-1">by {{ product.brand }}</p>
        <div class="mb-2">
          <span class="badge bg-secondary text-capitalize">{{ product.category }}</span>
          <span class="badge bg-info text-dark">{{ product.availabilityStatus }}</span>
        </div>
        <div class="mb-3">
          <span v-if="!product.discountPercentage" class="fs-4 fw-bold">{{
            money(product.price)
          }}</span>
          <span
            v-if="product.discountPercentage"
            class="text-decoration-line-through text-muted ms-2"
          >
            {{ money(product.price) }}
          </span>
          <span v-if="discountedPrice" class="fs-5 text-success ms-2">
            {{ money(discountedPrice) }}
          </span>
        </div>
        <div class="mb-3">
          <star-rating :rating="product.rating" />
          <span class="ms-2">({{ product.rating }})</span>
        </div>
        <div class="mb-3"><strong>Stock:</strong> {{ product.stock }}</div>
        <div class="mb-3"><strong>SKU:</strong> {{ product.sku }}</div>
        <div class="mb-3"><strong>Weight:</strong> {{ product.weight }} g</div>
        <div class="mb-3">
          <strong>Dimensions:</strong>
          {{ product.dimensions?.width }} × {{ product.dimensions?.height }} ×
          {{ product.dimensions?.depth }} mm
        </div>
        <div class="mb-3">
          <strong>Tags:</strong>
          <span
            v-for="tag in product.tags"
            :key="tag"
            class="badge bg-light text-dark me-1 text-capitalize"
          >
            {{ tag }}
          </span>
        </div>
        <div class="mb-3">
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>

    <hr />

    <div class="row">
      <div class="col-md-6">
        <h4>Reviews</h4>
        <ul class="list-group">
          <li class="list-group-item" v-for="(rev, idx) in product.reviews" :key="idx">
            <div class="d-flex justify-content-between">
              <strong>{{ rev.reviewerName }}</strong>
              <small>{{ new Date(rev.date).toLocaleDateString() }}</small>
            </div>
            <star-rating :rating="rev.rating" small />
            <p class="mb-0">{{ rev.comment }}</p>
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <h4>Additional Info</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <strong>Warranty:</strong> {{ product.warrantyInformation }}
          </li>
          <li class="list-group-item">
            <strong>Shipping:</strong> {{ product.shippingInformation }}
          </li>
          <li class="list-group-item">
            <strong>Return Policy:</strong> {{ product.returnPolicy }}
          </li>
          <li class="list-group-item">
            <strong>Minimum Order Qty:</strong> {{ product.minimumOrderQuantity }}
          </li>
          <li class="list-group-item" v-if="product.meta">
            <strong>Created:</strong> {{ new Date(product.meta.createdAt).toLocaleString() }}
          </li>
          <li class="list-group-item" v-if="product.meta">
            <strong>Updated:</strong> {{ new Date(product.meta.updatedAt).toLocaleString() }}
          </li>
        </ul>
        <div class="mt-3">
          <img
            v-if="product.meta?.qrCode"
            :src="product.meta.qrCode"
            class="img-fluid"
            alt="QR code"
          />
          <div class="mt-2">
            <small class="text-muted"> Barcode: {{ product.meta?.barcode }} </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
