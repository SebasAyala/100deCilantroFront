<template>
    <div id="login">
        <v-container class="login">
            <v-card class="mx-auto" max-width="350">
                <form @submit.prevent="login">
                    <v-card-text class="py-0 px-10">
                        <div class="py-8">
                            <v-img class="mx-auto" src="images/logo-normal.png" max-width="200" />
                        </div>
                        <v-text-field label="Correo electrónico" outlined clearable v-model="email"/>
                        <v-text-field 
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            label="Contraseña"
                            outlined
                            @click:append="show1 = !show1"
                        />
                    </v-card-text>
                    <div class="card red full-width text-center" v-if="error">{{ error }}</div>
                    <v-card-actions class="px-10 pb-10">
                        <v-btn class="mx-auto" color="#52bd95" @click="login">
                            INICIAR SESIÓN
                        </v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        components: {
        },
        data: () => ({
            show1: false,
            email: '',
            password: '',
            error: false
        }),
        methods: {
            login () {
                console.log(this.email);
                console.log(this.password);
                axios.post('http://127.0.0.1:8000/api/login', { user: this.email, password: this.password })
                    .then(request => this.loginSuccessful(request))
                    .catch(() => this.loginFailed())
            },
            loginSuccessful (req) {
                if (!req.data.token) {
                    this.loginFailed()
                    return
                }
                localStorage.token = req.data.token
                this.error = false
                this.$router.replace('/admin')
            },
            loginFailed () {
                this.error = 'Login failed!'
                delete localStorage.token
            }
        }
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