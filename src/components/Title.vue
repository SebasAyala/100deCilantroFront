<template>
    <div>
        <v-row class="text-center">
            <v-col cols="12">
                <h2 class="font-weight-bold white-text" style="color: #52bd95;">CARTELERA</h2>
            </v-col>
            <v-col class="py-0" cols="6">
                <v-text-field
                    v-model="message"
                    class="search"
                    label="Buscar película"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    clearable
                    :clear-icon-cb="showAll()"
                    dark
                    @keyup="searchText()"
                />
            </v-col>
            <v-col class="py-0" cols="6">
                <!--v-btn outlined dark x-large class="mx-2" @click="orderByName()">ORDENAR X NOMBRE</v-btn>
                <v-btn outlined dark x-large class="mx-2" @click="orderByRating()">ORDENAR X RATING</v-btn-->
                <v-select
                    :items="orderTypes"
                    item-text="orderType"
                    item-value="val"
                    label="Ordenar por"
                    dark
                    outlined
                    v-model="val"
                    @change="onChange(val)"
                />
            </v-col>
        </v-row>
        <Movie
            @viewMovies="movies = $event"
        />
    </div>
</template>

<script>
    import Movie from './Movie';
    export default {
        components: {
            Movie,
        },
        name: 'HelloWorld',
        data: () => ({
            val: '',
            message: '',
            movies: [],
            orderTypes: [
                { orderType: 'Nombre (A - Z)', val: 1 },
                { orderType: 'Nombre (Z - A)', val: 2 },
                { orderType: 'Rating (Mayor a menor)', val: 3 },
                { orderType: 'Rating (Menor a mayor)', val: 4 },
            ],
        }),
        methods: {
            searchText: function(){
                this.movies.forEach(movie => {
                    if (!movie.name.toLowerCase().includes(this.message.toLowerCase())){
                        return movie.show = false;
                    } else {
                        return movie.show = true;
                    }
                });
            },
            showAll() {
                if(this.message === null){
                    this.movies.forEach(movie => {
                        return movie.show = true;
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
                this.movies.sort((a, b) => (a.name > b.name) ? 1 : -1);
            },
            orderByNameDesc: function(){
                this.movies.sort((a, b) => (a.name < b.name) ? 1 : -1);
            },
            orderByRatingAsc: function(){
                this.movies.sort((a, b) => (a.rating > b.rating) ? 1 : (a.rating === b.rating) ? ((a.name > b.name) ? 1 : -1) : -1 );
            },
            orderByRatingDesc: function(){
                this.movies.sort((a, b) => (a.rating < b.rating) ? 1 : (a.rating === b.rating) ? ((a.name > b.name) ? 1 : -1) : -1 );
            },
        }
    }
</script>

<style>
    .search .v-text-field__details {
        display: none;
    }
</style>
