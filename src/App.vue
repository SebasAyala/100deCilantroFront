<template>
    <v-app dark>
        <v-app-bar v-if="this.$router.currentRoute.name != 'login'" app color="#211e32" height="84">
            <div class="d-flex align-center">
                <v-img src="images/logo-invertido.png" transition="scale-transition" width="200" />
            </div>
            <v-btn outlined absolute color="#52bd95" right href="#/login">
                <span class="mr-2">INICIAR SESIÓN</span>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content color="#211e32" style="background-color: #211e32;">
            <router-view/>
        </v-content>
    </v-app>
    
</template>

<script>
    export default {
        data: () => ({
            //
        })
    };
</script>
