<template>
    <v-container>
        <v-row>
            <v-col cols="8" offset="2">
                <v-row>
                    <v-col cols="12" sm="7" lg="8">
                        <div class="v-align-center">
                            <h2 class="section-title white-text" style="color: #52bd95;">LISTADO DE PELÍCULAS</h2>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="5" lg="4" class="text-right">
                        <v-text-field
                            v-model="search"
                            :clear-icon-cb="showAll()"
                            class="search"
                            label="Buscar película"
                            prepend-inner-icon="mdi-magnify"
                            clearable
                            dark
                            dense
                            outlined
                            @keyup="searchText()"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="8" offset-sm="2">
                <v-list two-line dense subheader dark color="transparent" width="100%">
                    <v-divider/>
                    <div v-for="(movie, index) in getMovies" :key="index" v-show="!movie.show_vue">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title v-text="movie.name"/>
                                <v-list-item-subtitle v-text="'$' + movie.price + ' - ' + movie.max_num + ' Asientos'"/>
                            </v-list-item-content>
                            <div class="actions">
                                <v-list-item-action>
                                    <v-btn icon @click="showMovie(index)">
                                        <v-icon color="#52bd95">mdi-eye</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                                <v-list-item-action>
                                    <v-btn icon>
                                        <v-icon color="#52bd95">mdi-pencil</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                                <v-list-item-action>
                                    <v-btn icon>
                                        <v-icon color="#52bd95">mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </div>
                        </v-list-item>
                        <v-divider/>
                    </div>
                </v-list>
            </v-col>
        </v-row>
        <v-row>
            <v-tooltip content-class="tooltip" color="#323042" left>
                <template v-slot:activator="{ on }">
                    <v-btn class="btn-add-element" absolute fixed fab color="#52bd95" v-on="on" to="/admin/movies/new">
                        <v-icon>mdi-video-plus</v-icon>
                    </v-btn>
                </template>
                <span>Añadir Película</span>
            </v-tooltip>
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
        name: 'Movies',
        data: () => ({
            search: '',
            dialog: false,
            sidebarWidth: '',
            mediaUrl: '',
            movieToShow: [],
            scheduleSelected: '',
        }),
        computed: {
            getMovies() {
                return this.$store.getters.getMovies
            },
            getSchedules() {
                return this.$store.getters.getSchedules
            }
        },
        mounted () {
            this.$store.dispatch('currentUser')
            this.$store.dispatch('allMovies');
            this.mediaUrl = process.env.VUE_APP_MEDIA_URL
        },
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
    #admin {
        min-height: 100%;
    }

    #admin .v-btn {
        font-family: 'Geogrotesque';
        font-weight: 600;
    }

    #admin .v-list-item__title {
        text-transform: uppercase;
        font-family: 'Geogrotesque';
        font-weight: 700!important;
        font-size: 1rem;
        line-height: 1.2rem;
    }

    .card-movie .card-content {
        width: calc(100% - 240px);
        height: 360px;
    }

    .card-movie .card-content .v-card__title {
        text-transform: uppercase;
        font-family: 'Geogrotesque';
        font-weight: 700!important;
    }

    .card-movie .card-content .v-card__subtitle {
        text-transform: uppercase;
        font-family: 'Geogrotesque';
        font-weight: 500!important;
        font-size: 1.2rem;
    }

    .card-movie .card-content .v-card__subtitle > i {
        font-size: 1.2rem;
        vertical-align: unset;
        color: rgba(255,255,255,0.7);
    }

    .card-movie .v-card__actions {
        width: calc(100% - 240px);
        bottom: 0;
        position: absolute;
        right: 0;
    }

    .card-movie .v-data-table td, .card-movie .v-data-table th {
        height: 28px;
        line-height: 28px;
        font-family: 'Geogrotesque';
        font-size: 0.8rem;
        text-transform: uppercase;
    }

    .card-movie .v-data-table th {
        height: 30px;
        line-height: 30px;
        color: rgb(82, 189, 149)!important;
        font-weight: 600;
    }

    .v-application--is-ltr .card-movie .v-card__actions .v-btn {
        margin-left: 8px;
    }

    .tooltip-modal.v-tooltip__content--fixed {
        opacity: 1!important;
    }

    .actions {
        display: none;
    }

    .v-list-item:hover .actions {
        display: inline-flex;
    }

    .v-application--is-ltr .actions .v-list-item__action:first-child, .actions .v-application--is-ltr .v-list-item__icon:first-child {
        margin-right: 0;
    }

    .v-application--is-ltr .actions .v-list-item__action {
        margin-left: 5px!important;
    }
</style>