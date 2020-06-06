<template>
    <v-container id="bookings">
        <v-row class="text-center">
            <v-col cols="12">
                <h2 class="font-weight-bold white-text" style="color: #52bd95;">RESERVAS</h2>
            </v-col>
            <!--v-col class="py-0" cols="8" offset="2">
                <v-text-field
                    class="search"
                    label="Buscar por Nombre"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    clearable
                    dark
                />
            </v-col-->
        </v-row>
        <v-row>
            <v-col cols="12" sm="8" offset-sm="2">
                <v-list two-line dense subheader dark color="transparent" width="100%">
                    <v-divider/>
                    <div v-for="(movie, index) in getUserBookings" :key="index">
                        <v-list-item>
                            <v-list-item-content>
                                <div class="booking-data">
                                    <div class="booking-image">
                                        <img :src="mediaUrl + movie.picture" :alt="movie.name" style="max-width: 60px">
                                    </div>
                                    <div class="booking-content">
                                        <div class="booking-info">
                                            <v-list-item-title v-text="movie.name"/>
                                            <v-list-item-subtitle v-text="movie.created_at"/>
                                        </div>
                                        <div class="booking-actions">
                                            <v-btn icon class="ml-1" @click="showMovie(index)">
                                                <v-icon color="#52bd95">mdi-star</v-icon>
                                            </v-btn>
                                            <v-btn icon class="ml-1">
                                                <v-icon color="#52bd95">mdi-delete</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider/>
                    </div>
                    <div class="announcament" v-if="!this.getUserBookings.length">
                        <v-list-item>
                            <v-list-item-content>
                                <div class="booking-data text-center justify-content-center">
                                    <div class="booking-content justify-content-center">
                                        <div class="booking-info justify-content-center">
                                            <v-list-item-title>NO HAS HECHO RESERVAS</v-list-item-title>
                                            <v-list-item-subtitle>PARA LAS PELÍCULAS EN CARTELERA</v-list-item-subtitle>
                                        </div>
                                    </div>
                                </div>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider/>
                    </div>
                </v-list>
            </v-col>
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
                                <v-card-subtitle class="pt-1">{{ '$' + movieToShow.price + ' - ' + movieToShow.max_num + ' ' }}<i class="v-icon mdi mdi-seat theme--dark"></i></v-card-subtitle>
                                <div class="px-3">
                                    <v-simple-table color="gray">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Horario</th>
                                                <th class="text-center">Vendidos</th>
                                                <th class="text-center">Disponibles</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(schedule, index) in getSchedules" :key="index">
                                                <td v-text="schedule.schedule"></td>
                                                <td class="text-center" v-text="schedule.sold"></td>
                                                <td class="text-center" v-text="schedule.available"></td>
                                            </tr>
                                        </tbody>
                                    </v-simple-table>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn icon>
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                                <v-btn icon>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
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
        name: 'Bookings',
        data: () => ({
            bookings: [],
            rating: 3,
            dialog: false,
            sidebarWidth: '',
            mediaUrl: '',
            movieToShow: [],
            scheduleSelected: '',
            scheduleToShow: {
                sold: '',
                available: ''
            }
        }),
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
            },
            getUserBookings() {
                return this.$store.getters.getUserBookings
            }
        },
        mounted () {
            if (!this.getStatusLogin) {
                this.$router.replace('/')
            }
            this.$store.dispatch('currentBookings', this.getCurrentUser.id_user);
            this.mediaUrl = process.env.VUE_APP_MEDIA_URL
        },
        methods: {
            closeDialog() {
                this.dialog = false
            },
            getSeats(index) {
                this.scheduleToShow = this.$store.getters.getSchedules[index]
            },
            showMovie(index) {
                this.movieToShow = this.$store.getters.getMovies[index];
                this.$store.dispatch('scheduleMovie', this.movieToShow.id_movies);
                this.scheduleToShow = this.$store.getters.getSchedules;
                this.dialog = true;
            }
        }
    }
</script>

<style>
    .justify-content-center {
        justify-content: center!important;
    }

    #bookings .booking-data {
        display: flex;
        align-items: center;
    }

    #bookings .booking-data .booking-image {
        align-items: center;
        display: flex;
        width: 20%
    }

    #bookings .booking-data .booking-image img {
        max-width: 60px;
    }

    #bookings .booking-data .booking-content {
        width: 80%;
        display: flex;
        align-items: center;
    }

    #bookings .booking-data .booking-info {
        display: inline-block;
        width: calc(100% - 80px);
    }

    #bookings .booking-data .booking-info div {
        font-family: 'Geogrotesque';
        text-transform: uppercase;
    }

    #bookings .booking-data .booking-info div.v-list-item__title {
        font-size: 1.4rem;
        font-weight: 700;
        line-height: 1.4rem;
    }

    #bookings .booking-data .booking-actions {
        display: none;
        min-width: 80px;
    }

    #bookings .v-list-item:hover .booking-data .booking-actions {
        display: inline-block;
    }
</style>