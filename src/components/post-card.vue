<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
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
        <!-- <button class="btn btn-danger btn-sm" @click="deletePost(index)">Delete</button> -->
      </div>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          v-model="post.published"
          type="checkbox"
          value=""
          id="publish"
          switch
        />
        <label class="form-check-label" for="publish"> Publish </label>
      </div>
    </div>
  </div>
</template>
