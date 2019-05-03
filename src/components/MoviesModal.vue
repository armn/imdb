<template>
    <div class="modal-wrapper movie-modal"  v-if="visible" @keydown.esc="hide" id="moviemodal">
        <div class="close-modal" @click="hide">X</div>
        <div class="movie-info">
            <div v-if="this.selectedMovie.Poster !== 'N/A'">
                <div class="movie-modal-image">
                    <img :src="this.selectedMovie.Poster" :alt="this.selectedMovie.Title" />
                </div>
            </div>
            <h1>{{this.selectedMovie.Title }}</h1>
            <h2>{{this.selectedMovie.Year}}</h2>
            <h3>{{this.selectedMovie.Plot}}</h3>
            <span class="movie-line"></span>
            <p class="movie-properties">
                <strong>Valsts: </strong> <span>{{this.selectedMovie.Country}} </span>
                <strong>Izlaista: </strong> <span>{{this.selectedMovie.Released}} </span>
                <strong>Ilgums: </strong> <span>{{this.selectedMovie.Runtime}} </span>
                <strong>Žanrs: </strong> <span>{{this.selectedMovie.Genre}} </span>
                <strong>Režisors: </strong> <span>{{this.selectedMovie.Director}} </span>
                <strong>Valoda: </strong> <span>{{this.selectedMovie.Language}} </span>

            </p>
            <h1></h1>
            <div class="ratings">
                <ul>
                    <li v-for="rating in this.selectedMovie.Ratings">{{rating.Source}} : {{rating.Value }}
                    </li>
                </ul>
            </div>
            <div style="clear:both;"></div>
        </div>
    </div>
</template>

<script>
  import Modal from '../modal.js';
  import axios from 'axios';
  export default {
    data() {
      return {
        visible: false,
        selectedMovie: {}
      }
    },
    methods: {

      hide() {
        this.visible = false;
      },

      show(movieID) {
        this.visible = true;
        axios({ method: "GET", "url": "http://www.omdbapi.com/?apikey=4a6cd2f&i=" + movieID }).then(result => {
          this.selectedMovie = result.data;
        }, error => {
          console.error(error);
        });


      },
    },

    beforeMount() {
      Modal.EventBus.$on('show', (params) => {
        this.show(params)
      })
    }
  }
</script>

<style scoped lang="scss">
    .modal-wrapper {
        padding: 20px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        max-width: 100%;
        max-height: 90%;
        background: white;
        height: 500px;
        z-index: 1000;
        border:2px solid black;
        color: black;
        overflow: visible;
        transition: all 0.2s ease-in-out;

        &:hover {
            box-shadow: 3px 3px 0 black;

        }

        @media (max-width: 640px) {
            top: 0;
            left: 0;
            transform: none;
            height: 100%;
            width: 100%;
            max-height: 100%;

            .close-modal {
                top: -3px;
                right: -3px;
            }
        }

    }
    .close-modal {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 35px;
        border: 3px solid black;
        width: 40px;
        height: 40px;
        line-height: 1;
        color: black;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        background: white;
        font-weight: bold;
        &:hover {
            color: #ffcf18;
            border-color: #ffcf18;
         }
        }
    .movie-modal-image {
        width: 150px;
        //height: 450px;
        max-width: 100%;
        float: left;
        margin: 0 20px 10px 0;
        text-align: center;
        img {
            max-width: 100%;
            max-height: 300px;
            text-align: center;
        }

        @media (max-width: 640px) {
            width: 100%;
            height: auto;

        }
    }
    .movie-modal {
        h1 {
            color: black;
            margin: 0;
        }
        h2 {
            color: grey;
            font-weight: normal;
            margin: 5px 0 0 0;
            font-size: 18px;
        }
    }
    .movie-info {
        text-align: left;
    }
    .movie-properties {
        color: grey;
    }
    .movie-line {
        width: 100%;
        height: 5px;
        background-color: #ffcf18;
        display: inline-block;
    }
    .movie-description {
        margin-top: 20px;
        color: grey;
    }
    ul {
        list-style-position: inside;
        margin: 5px 0 15px 0;
        padding-left: 15px;
    }
</style>