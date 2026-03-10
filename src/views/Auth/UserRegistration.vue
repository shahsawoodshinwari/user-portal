<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        gender: 1,
        terms: false,
      },
      genderOptions: [
        { label: 'Male', value: 1 },
        { label: 'Female', value: 2 },
      ],
      errors: {},
    }
  },
  computed: {
    //
  },
  methods: {
    onSubmit() {
      // Step 1: validation
      !this.form.name ? (this.errors.name = 'The name field is required.') : (this.errors.name = '')
      !this.form.email
        ? (this.errors.email = 'The email field is required.')
        : (this.errors.email = '')
      !this.form.terms
        ? (this.errors.terms = 'You must accept terms & conditions')
        : (this.errors.terms = '')

      // Step 2: submit
      console.log(this.form)
    },
  },
}
</script>

<template>
  <main class="container py-3">
    <form @submit.prevent="onSubmit" class="row g-3" novalidate>
      <div class="col-12">
        <h1>User Registration Form</h1>

        <ol>
          <li>Fill out the form completely.</li>
          <li>You are completely responsible for the information.</li>
          <li>This information is secured using ssl.</li>
        </ol>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="name" class="form-label">Name <span class="text-danger">*</span></label>
          <input
            v-model.trim.capitalize="form.name"
            type="text"
            :class="['form-control', errors.name ? 'is-invalid' : null]"
            id="name"
            placeholder="John Doe"
          />
          <div class="invalid-feedback" v-if="errors.name">
            {{ errors.name }}
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
          <input
            v-model.trim="form.email"
            type="email"
            :class="['form-control', errors.email ? 'is-invalid' : null]"
            id="email"
            placeholder="someone@example.com"
          />
          <div class="invalid-feedback" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="form-group">
          <label for="gender" class="form-label">Gender</label>
          <select v-model="form.gender" class="form-select" id="gender">
            <option value="">Select your gender</option>
            <option v-for="(gender, index) in genderOptions" :value="gender.value" :key="index">
              {{ gender.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-12">
        <div class="form-check form-switch">
          <input
            v-model="form.terms"
            :class="['form-check-input', errors.terms ? 'is-invalid' : null]"
            type="checkbox"
            role="switch"
            id="terms"
          />
          <label class="form-check-label" for="terms">
            I accept the <a href="#">terms</a> and conditions.
          </label>

          <div class="invalid-feedback" v-if="errors.terms">
            {{ errors.terms }}
          </div>
        </div>
      </div>

      <div class="col-12 text-end">
        <button type="submit" class="btn btn-success">Register</button>
      </div>
    </form>
  </main>
</template>
