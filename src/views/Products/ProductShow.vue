<script>
import ProductAdditionalInfo from '@/components/Product/ProductAdditionalInfo.vue'
import ProductImages from '@/components/Product/ProductImages.vue'
import ProductReviews from '@/components/Product/ProductReviews.vue'
import StarRating from '@/components/Product/StarRating.vue'
import { money } from '@/utils/money.js'

export default {
  components: {
    StarRating,
    ProductReviews,
    ProductAdditionalInfo,
    ProductImages,
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
    money,
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
      <ProductImages :images="product.images" :title="product.title" />

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
          <secondary-button class-name=" me-2 flex-grow-1 fw-bold" :to="{ name: 'products.index' }">
            Back
          </secondary-button>
          <warning-button
            :to="{ name: 'checkout', params: { productId: product.id } }"
            class="flex-grow-1 fw-bold"
          >
            Buy Now
          </warning-button>
        </div>
      </div>
    </div>

    <hr />

    <div class="row">
      <!-- left side section -->
      <div class="col-md-6">
        <h4>Reviews</h4>
        <ProductReviews :reviews="product.reviews" />
      </div>

      <!-- right side section -->
      <div class="col-md-6">
        <h4>Additional Info</h4>
        <ProductAdditionalInfo :product="product" />
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
