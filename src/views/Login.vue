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
    import axios from '../axios';

    export default {
        data: () => ({
            show1: false,
            email: '',
            password: '',
            error: false
        }),
        methods: {
            login () {
                axios.post('/login', { email: this.email, password: this.password })
                    .then((res) => {
                        if (!res.data.access_token) {
                            this.loginFailed()
                            return
                        }
                        localStorage.access_token = res.data.access_token
                        if (res.data.user.type_user == 1) {
                            this.$router.replace('/admin')
                        } else {
                            this.$router.replace('/')
                        }
                    })
                    .catch(() => this.loginFailed())
            },
            loginFailed() {
                this.error = 'Login failed!'
                localStorage.access_token = ''
            }
        },
        computed: {
            getStatusLogin() {
                return this.$store.getters.getStatusLogin
            },
            getCurrentUser() {
                return this.$store.getters.getCurrentUser
            }
        },
        mounted () {
            if (this.getStatusLogin) {
                if (this.getCurrentUser.type_user == 1) {
                    this.$router.replace('/admin')
                } else {
                    this.$router.replace('/')
                }
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