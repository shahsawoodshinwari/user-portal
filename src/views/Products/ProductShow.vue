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
      productError: '',
      quantity: 1,
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
    formatDate(date) {
      return new Date(date).toLocaleString()
    },
    async fetchProduct() {
      this.loading = true
      try {
        const res = await fetch(`https://dummyjson.com/products/${this.$route.params.productId}`)
        this.product = await res.json()
        this.quantity = this.product.minimumOrderQuantity
      } catch (error) {
        this.productError = `Something went wrong. Please try again later. We have informed our technical team, they are working on it.
          Please <a href="https://wa.me/923474938678">contact</a> them if you need any help.`
        console.log(error)
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.fetchProduct()
  },
}
</script>

<template>
  <div class="alert alert-danger" role="alert" v-if="productError" v-html="productError"></div>
  <div v-if="loading" class="text-center my-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="container py-4">
    <div class="row">
      <!-- left side section -->
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

      <!-- right side section -->
      <div class="col-md-6">
        <h2>
          {{ product.title }}
        </h2>
        <p class="text-muted mb-1" v-if="product.brand">by {{ product.brand }}</p>
        <div class="mb-2 d-flex gap-2">
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

        <div class="form-group d-flex gap-3 mb-3">
          <label for="quantity">Quantity</label>
          <input
            type="number"
            :min="product.minimumOrderQuantity"
            placeholder="Enter your desired quantity"
            class="form-control form-control-sm"
            id="quantity"
            v-model="quantity"
          />
        </div>
        <div class="d-flex gap-2 align-items-center">
          <RouterLink
            class="btn btn-secondary me-2 flex-grow-1 fw-bold"
            :to="{ name: 'products.index' }"
            >Back</RouterLink
          >
          <button class="btn btn-warning flex-grow-1 fw-bold">Buy Now</button>
        </div>
      </div>
    </div>

    <hr />

    <div class="row">
      <!-- left side section -->
      <div class="col-md-6">
        <h4>Reviews</h4>
        <ul class="list-group">
          <li class="list-group-item" v-for="(rev, idx) in product.reviews" :key="idx">
            <div class="d-flex justify-content-between">
              <div>
                <strong>{{ rev.reviewerName }}</strong>
                (<small>{{ rev.reviewerEmail }}</small
                >)
              </div>
              <small>{{ new Date(rev.date).toLocaleDateString() }}</small>
            </div>
            <star-rating :rating="rev.rating" small />
            <p class="mb-0">{{ rev.comment }}</p>
          </li>
        </ul>
      </div>

      <!-- right side section -->
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
            <strong>Created:</strong> {{ formatDate(product.meta.createdAt) }}
          </li>
          <li class="list-group-item" v-if="product.meta">
            <strong>Updated:</strong> {{ formatDate(product.meta.updatedAt) }}
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
