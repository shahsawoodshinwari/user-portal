<script>
import StartRating from '@/components/Product/StarRating.vue'

export default {
  components: {
    StartRating,
  },
  props: {
    review: {
      type: Object,
      default: {},
    },
  },
}
</script>

<template>
  <li class="list-group-item">
    <div class="d-flex justify-content-between">
      <div>
        <strong>{{ review.reviewerName }}</strong>
        (<small>{{ review.reviewerEmail }}</small
        >)
      </div>
      <small>{{ new Date(review.date).toLocaleDateString() }}</small>
    </div>
    <StartRating :rating="review.rating" small />
    <p class="mb-0">{{ review.comment }}</p>
  </li>
</template>
