<script>
import BaseButton from './BaseButton.vue'
export default {
  components: {
    BaseButton,
  },
  props: ['to', 'size', 'className'],
}
</script>

<template>
  <BaseButton :to="to" :className="['btn-success', className]" :size="size">
    <slot />
  </BaseButton>
</template>
