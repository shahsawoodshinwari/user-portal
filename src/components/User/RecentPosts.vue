<script>
import PostCard from '../post-card.vue'
import NoDataFound from '../../assets/img/no-data-found.webp'

export default {
  components: {
    PostCard,

  },
  data() {
    return {
      noDataFound: NoDataFound,
      newPost: {
        title: '',
        content: '',

      },
      postFormVisible: false,
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
        date: new Date().toLocaleString()



         
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
  <div class="row g-3">
    <div class="col-12 d-flex justify-content-between">
      <h2>Recent Posts</h2>
      <button class="btn btn-primary" @click="togglePostForm">
        <template v-if="!postFormVisible">+ New Post</template>
        <template v-else>Hide Form</template>
      </button>
    </div>

    <div class="col-12" v-show="postFormVisible">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="addPost">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input type="text" v-model="newPost.title" class="form-control" id="title"
                placeholder="e.g. Post of the day" />
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">Content</label>
              <textarea v-model="newPost.content" placeholder="What is on your mind?" class="form-control" id="content"
                rows="3"></textarea>
            </div>
            <div class="mb-3">
              <button type="submit" class="btn btn-success">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <template v-if="posts.length > 0">
      <div class="col-md-6 col-lg-4" :key="`recent-post-${index}`" v-for="(post, index) in posts" :data-index="index">
        <PostCard :post="post" />
      </div>
    </template>
    <template v-else>
      <div class="col-12 text-center">
        <img :src="noDataFound" class="img-thumbnail w-25" alt="No post found." />
      </div>
    </template>
  </div>
</template>
