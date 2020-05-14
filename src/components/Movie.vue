<template>
    <v-container>
        <v-row align="stretch" class="px-2">
            <v-col cols="6" v-for="(movie, index) in getMovies" :key="index" :xs="6" :sm="4" :md="3" :lg="2">
                <v-card class="movie" style="height: 100%;" @click="showMovie(index)" :items="getMovies">
                    <v-img v-bind:src="'./images/movies/' + movie.id_movies + '.jpg'" />
                    <v-card-title class="pt-3 pb-0 name">
                        <span class="d-inline-block text-truncate" v-text="movie.name"/>
                    </v-card-title>
                    <v-card-text class="pt-0">
                        <v-rating :value="movie.appreciation" dense half-increments readonly size="20" background-color="#52bd95" color="#52bd95" class="pb-1"/>
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
                    </v-card-text>
                </v-card>
            </v-col>
            <v-snackbar class="alert" v-model="snackbarLogged" color="#52bd95">
                <span>Debes iniciar sesión</span>
                <v-btn color="white" @click="snackbarLogged = false">
                    Close
                </v-btn>
            </v-snackbar>
        </v-row>
        <v-row>
            <v-dialog v-model="dialog" max-width="600" persistent>
                <v-card color="#211e32" dark class="card-movie">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <v-img
                            :src="'./images/movies/' + movieToShow.id_movies + '.jpg'"
                            aspect-ratio="0.6"
                            height="360"
                            max-width="240"
                        />
                        <div class="card-content">
                            <v-card-text>
                                <v-card-title class="headline pb-1" v-text="movieToShow.name" />
                                <v-rating :value="movieToShow.appreciation" dense half-increments readonly size="20" background-color="#52bd95" color="#52bd95" class="pl-3"/>
                                <v-card-subtitle class="pt-1">{{ '$' + movieToShow.price }}</v-card-subtitle>
                                <v-divider class="mx-4 pb-5"></v-divider>
                                <div class="px-4">
                                    <h3>SELECCIONE HORARIO</h3>
                                    <v-chip-group column mandatory>
                                        <v-chip
                                            v-for="schedule in getSchedules"
                                            v-text="schedule.schedule"
                                            :key="schedule"
                                            label
                                            class="mr-1 mt-1"
                                            color="#211e32"
                                            text-color="#fff"
                                        />
                                    </v-chip-group>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn dark color="#52bd95" class="ml-2">Reservar</v-btn>
                                <v-spacer></v-spacer>
                                <v-tooltip content-class="tooltip-modal" color="#323042" left>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon @click="closeDialog" v-on="on">
                                            <v-icon>mdi-close</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Cerrar ventana</span>
                                </v-tooltip>
                            </v-card-actions>
                        </div>
                    </div>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Movie',
        data: () => ({
            dialog: false,
            isLogged: false,
            snackbarLogged: false,
            movieToShow: [],
            scheduleToShow: [],
            scheduleSelected: null
        }),
        methods: {
            closeDialog() {
                this.dialog = false
            },
            search: function(searchText){
                console.log(searchText);
            },
            showMovie(index) {
                if (this.$store.getters.getStatusLogin) {
                    this.movieToShow = this.$store.getters.getMovies[index];
                    this.$store.dispatch('scheduleMovie', this.movieToShow.id_movies);
                    this.scheduleToShow = this.$store.getters.getSchedules;
                    this.dialog = true;
                } else {
                    this.snackbarLogged = true
                }
            }
        },
        computed: {
            getMovies() {
                return this.$store.getters.getMovies
            },
            getSchedules() {
                return this.$store.getters.getSchedules
            }
        },
        mounted () {
            this.$store.dispatch('allMovies')
            this.$store.dispatch('getStatusLogin')
        },
        props: ['busqueda'],
    }
</script>

<style>
    html {
        overflow-y: auto
    }

    .movie .name {
        font-size: 0.9rem;
        line-height: 1rem;
        max-width: 100%;
        font-family: 'Geogrotesque';
        text-transform: uppercase;
        font-weight: 700;
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
        .movie .v-card__subtitle, .movie .v-card__text, .movie .v-card__title {
            padding: 5px;
        }
    }

    @media screen and (max-width: 800px) {
        .movie .name {
            font-size: 0.7rem;
            line-height: 0.9rem;
        }
    }
</style>