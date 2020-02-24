<template>
    <div>
        <v-row class="text-center">
            <v-col cols="12">
                <h2 class="font-weight-bold white-text" style="color: #52bd95;">CARTELERA</h2>
            </v-col>
            <v-col class="py-0" cols="8" offset="2">
                <v-text-field
                    v-model="message"
                    class="search"
                    label="Buscar película"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    clearable
                    dark
                    @keyup="searchText()"
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
            message: '',
            movies: [],
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
            }
        }
    }
</script>

<style>
    .search .v-text-field__details {
        display: none;
    }
</style>
