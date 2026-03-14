<script>
import { money } from '@/utils/money.js'
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      product: {},
      loading: false,
      successModal: null,
      form: {
        productId: this.$route.params.productId,
        quantity: 0,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
      },
    }
  },
  computed: {
    discountedPrice() {
      if (!this.product.price) return 0

      if (this.product.discountPercentage) {
        return this.product.price * (1 - this.product.discountPercentage / 100)
      }

      return this.product.price
    },
    total() {
      return this.subtotal + this.tax + this.shipping;
    },
    subtotal() {
    if (!this.discountedPrice) return 0
      return this.discountedPrice * this.form.quantity
    },
    tax() {
      return this.subtotal * 0.05
    },
    shipping() {
      return this.subtotal * 0.1
    },
  },
  methods: {
    money,
    async fetchProduct() {
      this.loading = true
      try {
        const res = await fetch(`https://dummyjson.com/products/${this.$route.params.productId}`)
        this.product = await res.json()
        this.form.quantity = this.product.minimumOrderQuantity
      } catch (error) {
        this.productError = `Something went wrong. Please try again later. We have informed our technical team, they are working on it.
          Please <a href="https://wa.me/923474938678">contact</a> them if you need any help.`
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    onSubmit() {
      this.successModal = new Modal(this.$refs.successModal);
      this.successModal.show();
    },
    closeModal() {
      this.successModal.hide();
      this.$router.push({
        name: 'products.index'
      });
    },
  },
  mounted() {
    this.fetchProduct()
  },
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="row g-3">
    <!-- product details -->
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text">
            <span v-if="!product.discountPercentage" class="fs-4 fw-bold">
              {{ money(product.price) }}
            </span>
            <span
              v-if="product.discountPercentage"
              class="text-decoration-line-through text-muted ms-2"
            >
              {{ money(product.price) }}
            </span>
            <span v-if="discountedPrice" class="fs-5 text-success ms-2">
              {{ money(discountedPrice) }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="col-12">
      <h3>
        <strong>Personal & Shipping Address</strong>
      </h3>
    </div>

    <!-- first name -->
    <div class="col-md-6">
      <div class="form-group">
        <label for="first_name" class="form-label"
          >First Name <span class="text-danger">*</span></label
        >
        <input
          type="text"
          v-model="form.first_name"
          class="form-control"
          id="first_name"
          autofocus
          autocomplete="given-name"
          placeholder="John"
        />
      </div>
    </div>

    <!-- last name -->
    <div class="col-md-6">
      <div class="form-group">
        <label for="last_name" class="form-label"
          >Last Name <span class="text-danger">*</span></label
        >
        <input
          type="text"
          v-model="form.last_name"
          class="form-control"
          id="last_name"
          autocomplete="family-name"
          placeholder="Doe"
        />
      </div>
    </div>

    <!-- email -->
    <div class="col-md-6">
      <div class="form-group">
        <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
        <input
          type="email"
          v-model="form.email"
          class="form-control"
          autocomplete="email"
          id="email"
          placeholder="someone@example"
        />
      </div>
    </div>

    <!-- optional phone -->
    <div class="col-md-6">
      <div class="form-group">
        <label for="phone" class="form-label">Phone</label>
        <input
          type="tel"
          v-model="form.phone"
          class="form-control"
          id="phone"
          autocomplete="tel"
          placeholder="+923474938678"
        />
      </div>
    </div>

    <!-- address -->
    <div class="col-12">
      <div class="form-group">
        <label for="address" class="form-label">Address <span class="text-danger">*</span></label>
        <textarea
          v-model="form.address"
          class="form-control"
          id="address"
          autocomplete="address"
          placeholder="Address"
        ></textarea>
      </div>
    </div>

    <!-- quantity -->
    <div class="col-md-6">
      <div class="form-group">
        <label for="quantity" class="form-label">Quantity <span class="text-danger">*</span></label>
        <input
          type="number"
          v-model="form.quantity"
          min="1"
          class="form-control"
          id="quantity"
          placeholder="1"
        />
      </div>
    </div>

    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Order Summary</h5>
          <p class="card-text">
            <strong>Quantity:</strong> {{ form.quantity }} <br />
            <strong>Tax (5%):</strong> {{ money(tax) }} <br />
            <strong>Shipping (10%):</strong> {{ money(shipping) }} <br />
            <strong>Subtotal:</strong> {{ money(subtotal) }} <br />
            <hr />
            <strong>Total:</strong> <span class="fs-4 fw-semibold">{{ money(total) }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="col-12 text-end">
      <button type="submit" class="btn btn-primary">
        Place Order
      </button>
    </div>
  </form>

<!-- Modal -->
<div class="modal fade" ref="successModal" id="successModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="successModalLabel">Order Placed!</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>
          Your order has been placed successfully.
          <br />
          Your order total was: {{ money(total) }}
          <br />
          Your order will be delivered in 3-5 business days.
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" @click="closeModal" class="btn btn-secondary">
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</div>
</template>
