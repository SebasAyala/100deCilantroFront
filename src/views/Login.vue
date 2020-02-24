<template>
    <div id="login">
        <v-container class="login">
            <v-card class="mx-auto" max-width="350">
                <v-card-text class="py-0 px-10">
                    <div class="py-8">
                        <v-img class="mx-auto" src="images/logo-normal.png" max-width="200" />
                    </div>
                    <v-text-field label="Correo electrónico" outlined clearable/>
                    <v-text-field 
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        label="Contraseña"
                        outlined
                        @click:append="show1 = !show1"
                    />
                </v-card-text>
                <v-card-actions class="px-10 pb-10">
                    <v-btn class="mx-auto" color="#52bd95">
                        INICIAR SESIÓN
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data: () => ({
            login: true,
            show1: false,
        }),
    }
</script>

<style>
    #login {
        background: linear-gradient(235deg, rgba(28, 28, 54, 0.7) 25%, rgba(82, 189, 149, 0.7)), url(../../public/images/backgrounds/login.jpg);
        background-position: center;
        background-size: cover;
        height: 100%;
    }

    .container.login {
        min-height: 100%;
        display: flex;
        align-items: center;
    }
</style>