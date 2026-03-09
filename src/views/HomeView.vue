<script>
import RecentPosts from '../components/User/RecentPosts.vue'

export default {
  components: {
    RecentPosts,
  },
  data() {
    return {
      user: {
        id: 1,
        name: 'Shah Sawood Shinwari',
        description:
          'A full stack web developer, specialized in laravel. I have 5+ years of experience.',
      },
      isFollowing: false,
    }
  },
  methods: {
    follow() {
      this.isFollowing = !this.isFollowing
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
            <div class="d-flex gap-3">
              <a href="#" class="btn btn-primary">Portfolio</a>
              <button
                :class="['btn', 'text-capitalize', isFollowing ? 'btn-danger' : 'btn-info']"
                @click="follow"
              >
                {{ isFollowing ? 'unfollow' : 'follow' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>

    <RecentPosts />
  </main>
</template>

<style>
.post-image {
  height: 9.375rem;
}
</style>
