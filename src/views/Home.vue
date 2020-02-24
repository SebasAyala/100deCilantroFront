<template>
    <v-container>
        <Title/>
    </v-container>
</template>

<script>
    import Title from '../components/Title';

    export default {
        components: {
            Title,
        },
        data: () => ({
            login: false,
        }),
    };
</script>