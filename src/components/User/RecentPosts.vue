<script>
import PostCard from '@/components/post-card.vue'
import NoDataFound from '@/assets/img/no-data-found.webp'

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
      posts: [
        {
          id: 1,
          title: 'Post 1',
          image: 'https://placehold.co/600x400',
          content: 'Post 1 content',
          createdAt: new Date().toLocaleString(),
          published: false,
        },
        {
          id: 2,
          title: 'Post 2',
          image: 'https://placehold.co/600x400',
          content: 'Post 2 content',
          createdAt: new Date().toLocaleString(),
          published: false,
        },
        {
          id: 3,
          title: 'Post 3',
          image: 'https://placehold.co/600x400',
          content: 'Post 3 content',
          createdAt: new Date().toLocaleString(),
          published: false,
        },
      ],
    }
  },
  computed: {
    // publishedPosts() {
    //   return this.posts.filter((post) => post.published).length
    // },
  },
  watch: {
    postFormVisible(newValue, oldValue) {
      console.table({
        old: oldValue,
        new: newValue,
      })
    },
  },
  methods: {
    togglePostForm() {
      this.postFormVisible = !this.postFormVisible
    },
    addPost() {
      this.posts.unshift({
        id: this.posts.length + 1,
        title: this.newPost.title,
        image: 'https://placehold.co/600x400',
        content: this.newPost.content,
        createdAt: new Date().toLocaleString(),
        published: false,
      })
      this.newPost.title = ''
      this.newPost.content = ''
      this.togglePostForm()
    },

    deletePost(index) {
      this.posts.splice(index, 1)
    },
    publishedPosts() {
      return this.posts.filter((post) => post.published).length
    },
  },
}
</script>

<template>
  <div class="row g-3">
    <div class="col-12 d-flex justify-content-between">
      <h2>Recent Posts</h2>
      <div>
        <span class="me-3">{{ publishedPosts() }} published</span>
        <button class="btn btn-primary" @click="togglePostForm">
          <template v-if="!postFormVisible">+ New Post</template>
          <template v-else>Hide Form</template>
        </button>
      </div>
    </div>

    <div class="col-12" v-show="postFormVisible">
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
      <div class="col-md-6 col-lg-4" v-for="(post, index) in posts" :key="post.id">
        <!-- <button class="btn btn-danger btn-sm" @click="deletePost(index)">Delete</button> -->
        <PostCard @deletePost="deletePost" :post="post" :index="index" />
      </div>
    </template>

    <template v-else>
      <div class="col-12 text-center">
        <img :src="noDataFound" class="img-thumbnail w-25" alt="No post found." />
      </div>
    </template>
  </div>
</template>
