<template>
    <v-app dark>
        <v-app-bar app color="#211e32" height="84">
            <div class="d-flex align-center">
                <v-img src="images/logo-invertido.png" transition="scale-transition" width="200" />
            </div>
            <v-btn outlined absolute color="#52bd95" right>
                <span class="mr-2">INICIAR SESIÓN</span>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content color="#211e32" style="background-color: #211e32;">
            <HelloWorld/>
            <Movie/>
        </v-content>
    </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Movie from './components/Movie';

export default {
    name: 'App',
    components: {
        HelloWorld,
        Movie,
    },
    data: () => ({
    //
    }),
};
</script>
