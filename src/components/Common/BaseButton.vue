<script>
export default {
  props: ['to', 'size', 'className'],
  computed: {
    btnSize() {
      switch (this.size) {
        case 'sm':
          return 'btn-sm'
        case 'lg':
          return 'btn-lg'
        default:
          return null
      }
    },
  },
}
</script>

<template>
  <template v-if="to">
    <RouterLink :to="to" :class="['btn', btnSize, className]">
      <slot />
    </RouterLink>
  </template>
  <template v-else>
    <button :class="['btn', btnSize, className]">
      <slot />
    </button>
  </template>
</template>
