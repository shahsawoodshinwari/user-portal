<script>
import PostCard from '../components/post-card.vue'

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      newPost: {
        title: '',
        content: '',
      },
      postFormVisible: false,
      user: {
        id: 1,
        name: 'Shah Sawood Shinwari',
        description:
          'A full stack web developer, specialized in laravel. I have 5+ years of experience.',
      },
      posts: [],
    }
  },
  methods: {
    togglePostForm() {
      this.postFormVisible = !this.postFormVisible
    },
    addPost() {
      // step 1
      this.posts.push({
        id: this.posts.length + 1,
        title: this.newPost.title,
        image: 'https://placehold.co/600x400',
        content: this.newPost.content,
      })

      // step 2
      this.newPost.title = ''
      this.newPost.content = ''

      // step 3
      this.togglePostForm()
    },
  },
}
</script>

<template>
  <main class="container py-3">
    <div class="row row-cols-md-1 row-cols-lg-2 g-3 mb-5">
      <div class="col">
        <div class="card">
          <div class="card-header">User Profile</div>
          <div class="card-body">
            <h5 class="card-title">
              {{ user.name }}
            </h5>
            <p class="card-text">
              {{ user.description }}
            </p>
            <a href="#" class="btn btn-primary">Portfolio</a>
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>
    <div class="row g-3">
      <div class="col-12 d-flex justify-content-between">
        <h2>Recent Posts</h2>
        <button class="btn btn-primary" @click="togglePostForm">
          <template v-if="!postFormVisible">+ New Post</template>
          <template v-else>Hide Form</template>
        </button>
      </div>

      <div class="col-12" v-if="postFormVisible">
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="addPost">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  v-model="newPost.title"
                  class="form-control"
                  id="title"
                  placeholder="e.g. Post of the day"
                />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea
                  v-model="newPost.content"
                  placeholder="What is on your mind?"
                  class="form-control"
                  id="content"
                  rows="3"
                ></textarea>
              </div>
              <div class="mb-3">
                <button type="submit" class="btn btn-success">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <template v-if="posts.length > 0">
        <div class="col-md-6 col-lg-4" v-for="post in posts">
          <PostCard :post="post" />
        </div>
      </template>
      <template v-else>
        <div class="col-12">
          <div class="alert alert-info" role="alert">No posts found. Please create a new post.</div>
        </div>
      </template>
    </div>
  </main>
</template>

<style>
.post-image {
  height: 9.375rem;
}
</style>
