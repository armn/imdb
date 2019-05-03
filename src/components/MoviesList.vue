<template>

  <div class="movies">
    <div class="notice" v-if="error">
      <h1>Nekas nav atrasts</h1>
    </div>
    <div v-for="movie in movies" class="movie" :id="movie.imdbID" :key="movie.imdbID" @click="showModal(movie.imdbID)">

      <div v-if="movie.Poster !== 'N/A'">
        <div class="movie-image">
        <img :src="movie.Poster" :alt="movie.Title" />
        </div>
      </div>
      <h1 class="movie-name">{{ movie.Title }}</h1>
        <h2 class="movie-details">{{movie.Type}}, {{ movie.Year }}</h2>

    </div>
  </div>
</template>

<script>
  import { serverBus } from '../main.js';

  export default {
  name: 'MoviesList',

    data () {
      return {
        movies: [],
        error: false
      }
    },

    created() {
      serverBus.$on('searching', (movies) => {
        if (movies.Search) {
          this.error = false;
          this.movies = movies.Search;
        }
        else {
          this.error = true;
          this.movies = []
        }
      });

    },

    methods: {
      showModal(movieID) {
        console.log(movieID);
        this.$modal.show(movieID);
      }
    },


}
</script>

