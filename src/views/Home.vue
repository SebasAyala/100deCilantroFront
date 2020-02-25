<template>
    <v-container>
        <v-app-bar app color="#211e32" height="84">
            <div class="d-flex align-center">
                <v-img src="images/logo-invertido.png" transition="scale-transition" width="200" />
            </div>
            <v-btn outlined absolute color="#52bd95" right href="#/login">
                <span class="mr-2">INICIAR SESIÓN</span>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
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