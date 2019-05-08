<template>

  <div id="app">
    <app-modal />

    <header>
    <h1>IMDB filmu meklētājs</h1>
      <input type="search" placeholder="Ievadi nosaukumu..."   v-model="searchTerm" @keyup.enter="searchFilm(searchTerm)" tabindex="1"/>
        <button v-on:click="searchFilm(searchTerm)" tabindex="2">Meklēt</button>

    </header>

    <div class="content">
    <router-view/>
    </div>

  </div>
</template>



<script>
  import axios from "axios";
  import { serverBus } from './main';
  import  store  from "./store.js";

  export default {
    data: function() {
      return {
      movies: [],
      searchTerm: '',
      favoriteMovies: [],
      totalResults: []
      }
    },


    methods: {
      searchFilm(value) {
        console.log('meklēju ' + value);
        store.state.queryURL = '';
        store.state.pageNum = 2;
        store.state.queryURL = 'https://www.omdbapi.com/?apikey=4a6cd2f&s=' + value;
        axios({ method: "GET", "url": store.state.queryURL}).then(result => {
          serverBus.$emit('searching', result.data);
        }, error => {
          console.error(error);
        });

      },




    }
  }

</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  body {
    background: #f4f4f4;
    margin: 0;
  }
  header {
    background: #F5C518;
    padding: 10px;
    color: black;
    height: 190px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    border-top: 2px solid black;
    border-bottom: 2px solid black;

    h1 {
      margin: 20px 0 20px 0;
      @media (max-width: 360px) {
        font-size: 28px;
      }
    }

    p {
      margin: 10px 0 15px 0;
    }

    input {
      width: calc(100% - 130px);
      max-width: 360px;
      padding: 15px 10px;
      font-size: 18px;
      border: 2px solid black;
      transition: all 0.2s ease-in-out;
      margin-right: 10px;

      &:focus, &:hover {
        outline: none;
        box-shadow: 2px 2px 0 #000000;
      }

      @media (max-width: 360px) {
        font-size: 14px;
      }
    }


  }

    button {
      background: #F5C518;
      border: 2px solid black;
      padding: 15px 25px;
      font-size: 18px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s ease-in-out;

      @media (max-width: 360px) {
        font-size: 14px;
      }

      &:hover, &:focus {
        outline: none;
        box-shadow: 2px 2px 0 #000000;
        background: #ffcf18;
      }
    }

  .actions {
    flex-basis: 100%;
    padding: 15px 0;

    .results {
      margin-bottom: 15px;
    }

  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  display: flex;
  justify-content: flex-end;
  a {
    text-transform: uppercase;
    color: black;

    padding: 0 5px;
    margin: 0 5px;
    text-decoration: none;


    &.router-link-exact-active {
      font-weight: bold;
      border-bottom: 2px solid black;
    }

    &:hover {
      border-bottom: 2px solid black;
    }
  }
}

  .content {
    //max-width: 1180px;
    margin: 210px auto 15px auto;
  }

  .movies {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
  }
  .movie {
    width: 17%;
    max-width: 360px;
    position: relative;
    margin: 15px;
    background: white;
    padding: 15px;
    border: 2px solid black;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;

    &:hover {
      box-shadow: 5px 5px 0 0 #ffcf18;
    }


    @media (max-width: 1024px) {
      width: 50%;
    }

    @media (max-width: 768px) {
      width: 100%;
    }

  }

  .movie-name {
    font-size: 20px;
    margin: 10px 0 5px 0;
  }

  .movie-mask {
    height: 100%;
  }

  h2 {
    font-size: 16px;
    margin: 0;
  }

  .movie-image img {
    height: auto;
    max-width: 70%;
  }

  .favorite {
    position: absolute;
    right: 5px;
    top: -10px;
    font-size: 40px;
    &::after {
      content: '☆';
    }

    &:hover, &.favorited {
      &::after {
        content: '★';
        color: #ffcf18;
      }
    }
  }
</style>
