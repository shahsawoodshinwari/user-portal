<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ['deletePost', 'editPost', 'publishPost'],
}
</script>

<template>
  <div class="card h-100">
    <img :src="post.image" class="card-img-top object-fit-cover post-image" :alt="post.title" />
    <div class="card-body d-flex flex-column justify-content-between gap-3">
      <div>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text text-truncate" v-html="post.content"></p>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <span class="badge bg-secondary">{{ post.createdAt }}</span>
        <primary-button size="sm" @click="$emit('editPost', post.id)">Edit</primary-button>

        <danger-button size="sm" @click="$emit('deletePost', index)">Delete</danger-button>
      </div>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          @click="$emit('publishPost', index)"
          :id="`publish-${index}`"
          switch
        />
        <label class="form-check-label" :for="`publish-${index}`"> Publish </label>
      </div>
    </div>
  </div>
</template>
