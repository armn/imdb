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
    <div class="actions" v-if="!error && results !== ''">
      <div class="results">
        <h2>Atrasts: {{ results }}</h2>
      </div>
      <button class="button" v-if="results > 10 && !noResults" v-on:click="loadMore" tabindex="3">
        Ielādēt vairāk
      </button>
    </div>
  </div>
</template>

<script>
  import { serverBus } from '../main.js';
  import axios from "axios";
  import  store  from "../store.js";

  export default {
  name: 'MoviesList',

    data () {
      return {
        movies: [],
        error: false,
        results: '',
        noResults: false
      }
    },

    created() {
      serverBus.$on('searching', (movies) => {
        if (movies.Search) {
          this.error = false;
          this.movies = movies.Search;
          this.results = movies.totalResults;
          this.noResults = false;
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
      },

      loadMore() {
        axios({ method: "GET", "url": store.state.queryURL + '&page=' + store.state.pageNum}).then(result => {

          if (result.data.Response === "False") {
            this.noResults = true;
          }
          else if (result.data.Search.length < 10) {
            this.noResults = true;
            this.movies.push(...result.data.Search);
          }
          else {
            this.movies.push(...result.data.Search);
          }

        }, error => {
          console.error(error);
        });
        store.state.pageNum++;


      }
    },


}
</script>

