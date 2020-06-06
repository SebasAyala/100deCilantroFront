<template>
    <v-container id="list-movies">
        <v-row class="text-center">
            <v-col cols="12">
                <h2 class="font-weight-bold white-text" style="color: #52bd95;">CARTELERA</h2>
            </v-col>
            <v-col class="py-0" cols="6">
                <v-text-field
                    v-model="search"
                    :clear-icon-cb="showAll()"
                    class="search"
                    label="Buscar película"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    clearable
                    dark
                    @keyup="searchText()"
                />
            </v-col>
            <v-col class="py-0" cols="6">
                <v-select
                    v-model="order"
                    :items="orderTypes"
                    item-text="orderType"
                    item-value="val"
                    label="Ordenar por"
                    dark
                    outlined
                    @change="onChange(order)"
                />
            </v-col>
        </v-row>
        <v-row align="stretch">
            <v-col cols="6" v-for="(movie, index) in getMovies" :key="index" :xs="6" :sm="4" :md="3" :lg="2" v-show="!movie.show_vue">
                <v-card class="movie" style="height: 100%;" @click="showMovie(index)" :items="getMovies">
                    <v-img v-bind:src="mediaUrl + movie.picture" />
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
                            :src="mediaUrl + movieToShow.picture"
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
                                <div class="px-4" v-if="!bookingDone">
                                    <h3>SELECCIONE HORARIO</h3>
                                    <v-chip-group column mandatory v-model="scheduleSelected">
                                        <v-chip
                                            v-for="(schedule, index) in getSchedules"
                                            v-text="schedule.schedule"
                                            :key="index"
                                            label
                                            class="mr-1 mt-1"
                                            color="#211e32"
                                            text-color="#fff"
                                            :value="index"
                                        />
                                    </v-chip-group>
                                </div>
                                <div class="booking-msg" v-else>
                                    <v-card-title class="headline text-center" v-text="bookingMsg" style="word-break: break-word;"/>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn dark color="#52bd95" class="ml-2" @click="reserve()">Reservar</v-btn>
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
    import axios from '../axios'

    export default {
        name: 'Movie',
        data: () => ({
            bookingDone: false,
            bookingMsg: '',
            search: '',
            order: '',
            dialog: false,
            snackbarLogged: false,
            movieToShow: [],
            scheduleSelected: null,
            mediaUrl: '',
            orderTypes: [
                { orderType: 'Nombre (A - Z)', val: 1 },
                { orderType: 'Nombre (Z - A)', val: 2 },
                { orderType: 'Rating (Mayor a menor)', val: 3 },
                { orderType: 'Rating (Menor a mayor)', val: 4 },
            ]
        }),
        methods: {
            searchText: function(){
                this.getMovies.forEach(movie => {
                    if (!movie.name.toLowerCase().includes(this.search.toLowerCase())){
                        return movie.show_vue = true;
                    } else {
                        return movie.show_vue = false;
                    }
                });
            },
            showAll() {
                if(this.search === null){
                    this.getMovies.forEach(movie => {
                        return movie.show_vue = false;
                    });
                } else {
                    this.searchText();
                }
            },
            onChange(val) {
                console.log(val);
                switch (val){
                    case 1:
                        this.orderByNameAsc();
                        break;
                    case 2:
                        this.orderByNameDesc();
                        break;
                    case 3:
                        this.orderByRatingDesc();
                        break;
                    case 4:
                        this.orderByRatingAsc();
                        break;
                    default:
                        this.orderByNameAsc();
                        break;
                }
            },
            orderByNameAsc: function(){
                this.getMovies.sort((a, b) => (a.name > b.name) ? 1 : -1);
            },
            orderByNameDesc: function(){
                this.getMovies.sort((a, b) => (a.name < b.name) ? 1 : -1);
            },
            orderByRatingAsc: function(){
                this.getMovies.sort((a, b) => (a.appreciation > b.appreciation) ? 1 : (a.appreciation === b.appreciation) ? ((a.name > b.name) ? 1 : -1) : -1 );
            },
            orderByRatingDesc: function(){
                this.getMovies.sort((a, b) => (a.appreciation < b.appreciation) ? 1 : (a.appreciation === b.appreciation) ? ((a.name > b.name) ? 1 : -1) : -1 );
            },
            closeDialog() {
                this.bookingDone = false
                this.dialog = false
            },
            showMovie(index) {
                if (this.getStatusLogin) {
                    this.movieToShow = this.getMovies[index];
                    this.$store.dispatch('scheduleMovie', this.movieToShow.id_movies);
                    this.dialog = true;
                } else {
                    this.snackbarLogged = true
                }
            },
            reserve() {
                let formData = new FormData()
                formData.append('id_movie', this.movieToShow.id_movies)
                formData.append('id_user', this.getCurrentUser.id_user)
                formData.append('id_schedule', this.getSchedules[this.scheduleSelected].id_schedule)
                axios.post('storeReserve', formData)
                    .then(() => {
                        this.bookingMsg = 'Se ha reservado "' + this.movieToShow.name + '" a las ' + this.getSchedules[this.scheduleSelected].schedule
                        this.bookingDone = true
                        this.$store.dispatch('currentBookings', this.getCurrentUser.id_user)
                    })
                    .catch((err) => {
                        console.log(err.config);
                        if (err.response) {
                            console.log(err.response.data);
                            console.log(err.response.status);
                            console.log(err.response.headers);
                        } else if (err.request) {
                            console.log(err.request);
                        } else {
                            console.log('Error', err.message);
                        }
                    })
            }
        },
        computed: {
            getMovies() {
                return this.$store.getters.getMovies
            },
            getSchedules() {
                return this.$store.getters.getSchedules
            },
            getStatusLogin() {
                return this.$store.getters.getStatusLogin
            },
            getCurrentUser() {
                return this.$store.getters.getCurrentUser
            }
        },
        mounted () {
            this.$store.dispatch('allMovies')
            this.mediaUrl = process.env.VUE_APP_MEDIA_URL
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

    .booking-msg {
        min-height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
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