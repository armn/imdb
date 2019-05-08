<template>
  <div class="home">
    <MoviesList queryURL="queryURL" />
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList.vue'

export default {
  name: 'home',
  components: {
    MoviesList
  }
}
</script>
