<template>
    <v-row align="stretch" class="px-2">
        <v-col cols="6" v-for="movie in movies" v-show="movie.show" :key="movie.id" :xs="6" :sm="4" :md="3" :lg="2">
            <v-card class="movie" style="height: 100%;">
                <v-img v-bind:src="movie.image" />
                <v-card-title class="pt-2 pb-0 name" v-text="movie.name" />
                <v-card-text>
                    <v-rating :value="movie.rating" dense half-increments readonly size="20" background-color="#52bd95" color="#52bd95" class="pb-1"/>
                    <v-chip
                        v-for="time in movie.times"
                        :key="time.id"
                        x-small
                        label
                        v-text="time"
                        class="mr-1 mt-1"
                        color="#211e32"
                        text-color="#fff"
                    />
                    <p v-text="busqueda"></p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Movie',
        data: () => ({
            movies: [
                {
                    id: 1,
                    show: true,
                    name: 'Avengers End-Game',
                    rating: 5,
                    image: './images/movies/1.jpg',
                    times: [
                        '5:30 PM',
                        '6:45 PM',
                    ],
                },
                {
                    id: 2,
                    show: true,
                    name: 'Bumblebee',
                    rating: 4.5,
                    image: './images/movies/2.jpg',
                    times: [
                        '6:45 PM',
                        '8:00 PM',
                        '9:00 PM',
                    ],
                },
                {
                    id: 3,
                    show: true,
                    name: 'El Irlandés',
                    rating: 4,
                    image: './images/movies/3.jpg',
                    times: [
                        '5:00 PM',
                    ],
                },
                {
                    id: 4,
                    show: true,
                    name: 'Aves de Presa',
                    rating: 3.5,
                    image: './images/movies/4.jpg',
                    times: [
                        '8:30 PM',
                        '10:45 PM',
                    ],
                },
                {
                    id: 5,
                    show: true,
                    name: 'Bad Boys II',
                    rating: 3,
                    image: './images/movies/5.jpg',
                    times: [
                        '6:10 PM',
                        '7:20 PM',
                        '9:00 PM',
                    ],
                },
                {
                    id: 6,
                    show: true,
                    name: 'Sonic',
                    rating: 4,
                    image: './images/movies/6.jpg',
                    times: [
                        '4:30 PM',
                        '6:25 PM',
                        '8:00 PM',
                        '10:00 PM',
                    ],
                },
            ],
        }),
        methods: {
            search: function(searchText){
                console.log(searchText);
            }
        },
        mounted () {
            this.$emit('viewMovies', this.movies);
        },
        props: ['busqueda'],
    }
</script>

<style>
    .movie .name {
        font-size: 0.8rem;
        line-height: 1rem;
    }

    .movie {
        cursor: pointer;
    }

    .movie .v-image__image {
        transition: 0.3s;
    }

    .movie:hover .v-image__image {
        transform: scale(1.1);
    }

    .movie:hover .v-responsive__content {
        background-color: rgba(82, 189, 149, 0.6);
    }

    @media screen and (max-width: 1080px) {
        .movie .name {
            font-size: 0.6rem;
            line-height: 0.8rem;
        }
    }
</style>