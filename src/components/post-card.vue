<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  },
};
</script>

<template>
  <div class="card h-100">
    <img :src="post.image" class="card-img-top object-fit-cover post-image" :alt="post.title" />
    <div class="card-body d-flex flex-column justify-content-between gap-3">
      <div>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text text-truncate" v-html="post.content"></p>
      </div>
      <div class="ms-auto">
        <a href="#" class="btn btn-sm btn-warning">Go somewhere</a>
      </div>
    </div>
  </div>
</template>
