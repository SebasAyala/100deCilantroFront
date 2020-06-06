<template>
    <v-container id="navbar">
        <v-app-bar app color="#211e32" height="84">
            <div class="d-flex align-center">
                <v-img src="images/logo-invertido.png" transition="scale-transition" width="200" />
            </div>
            <div class="d-flex full-width" style="justify-content: flex-end; align-items: center;">
                <div class="user-name pl-5" v-if="getStatusLogin">
                    <p class="mb-0">Bienvenido, <span v-text="getCurrentUser.name"></span></p>
                </div>
                <div class="user-avatar px-2" v-if="getStatusLogin">
                    <v-img :src="'images/avatars/' + getCurrentUser.picture" width="36"></v-img>
                </div>
                <v-btn outlined dark class="ml-3" color="#52bd95" href="#/admin" v-if="getStatusLogin && getCurrentUser.type_user == 1">
                    <span class="mr-2">DASHBOARD</span>
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-btn>
                <v-btn outlined dark class="ml-3" color="#52bd95" :disabled="route == 'home'" @click="redirect('home')">
                    <span class="mr-2">INICIO</span>
                    <v-icon>mdi-home</v-icon>
                </v-btn>
                <v-btn outlined dark class="ml-3" color="#52bd95" href="#/login" v-if="!getStatusLogin">
                    <span class="mr-2">LOGIN</span>
                    <v-icon>mdi-login</v-icon>
                </v-btn>
                <v-btn outlined dark class="ml-3" color="#52bd95" v-if="!getStatusLogin && route != 'register'" @click="redirect('register')">
                    <span class="mr-2">REGISTRO</span>
                    <v-icon>mdi-account-plus</v-icon>
                </v-btn>
                <v-btn outlined dark class="ml-3" color="#52bd95" v-if="getStatusLogin" :disabled="route == 'bookings'" @click="redirect('bookings')">
                    <span class="mr-2">RESERVAS</span>
                    <v-icon>mdi-format-list-bulleted-square</v-icon>
                </v-btn>
                <v-btn outlined dark class="ml-3" color="error" v-if="getStatusLogin" @click="logout()">
                    <span class="mr-2">SALIR</span>
                    <v-icon>mdi-power</v-icon>
                </v-btn>
            </div>
        </v-app-bar>
    </v-container>
</template>

<script>
    import axios from '../axios';

    export default {
        data: () => ({
            route: ''
        }),
        computed: {
            getStatusLogin() {
                return this.$store.getters.getStatusLogin
            },
            getCurrentUser() {
                return this.$store.getters.getCurrentUser
            }
        },
        mounted () {
            this.route = this.$route.name
        },
        methods: {
            logout() {
                axios.post('logout')
                .then(() => {
                    localStorage.access_token = ''
                    this.$store.commit('currentUser', null)
                    this.$store.commit('statusLogin', false)
                    this.$store.commit('userBookings', null)
                    this.route = 'home'
                    this.$router.replace('/')
                })
                .catch(() => {
                    this.$store.dispatch('currentUser')
                })
            },
            redirect(routeSelected) {
                switch (routeSelected) {
                    case 'home':
                        this.route = 'home'
                        this.$router.replace('/')
                        break;
                    case 'bookings':
                        this.route = 'bookings'
                        this.$router.replace('/bookings')
                        break;
                    case 'register':
                        this.route = 'register'
                        this.$router.replace('/register')
                        break;
                    default:
                        this.route = 'home'
                        this.$router.replace('/')
                        break;
                }
            }
        }
    };
</script>

<style scoped>
    #navbar {
        padding: 0;
    }

    .user-name p{
        color: white;
        font-family: 'Geogrotesque';
        font-size: 1.2rem;
        font-weight: 600;
        text-transform: uppercase;
        line-height: 1.65;
    }
</style>