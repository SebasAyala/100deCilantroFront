<template>
    <v-container>
        <Title/>
        <Movie/>
    </v-container>
</template>

<script>
    import Title from '../components/Title';
    import Movie from '../components/Movie';

    export default {
        components: {
            Title,
            Movie,
        },
        data: () => ({
            login: false,
        }),
    };
</script>