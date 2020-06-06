<template>
    <div>
        <v-btn id="btn-sidebar" absolute fab fixed color="#52bd95" @click.stop="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-navigation-drawer v-model="drawer" absolute dark class="sidebar" id="sidebar">
            <v-list nav class="py-0">
                <v-list-item two-line :class="'px-0'">
                    <v-list-item-avatar>
                        <img :src="'images/avatars/' + getCurrentUser.picture">
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-text="getCurrentUser.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="getCurrentUser.lastname"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider style="margin-bottom: 8px;" />
                <v-list-item v-for="item in items" :key="item.title" link @click="redirect(item.route)" :class="route == item.route ? 'active' : ''">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"/>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link class="logout" @click="logout()">
                    <v-list-item-icon>
                        <v-icon>mdi-power</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>CERRAR SESIÓN</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    import axios from '../axios'

    export default {
        data () {
            return {
                drawer: null,
                route: '',
                items: [
                    { title: 'Dashboard', icon: 'mdi-view-dashboard', route: 'dashboard' },
                    { title: 'Películas', icon: 'mdi-video', route: 'movies' },
                    { title: 'Usuarios', icon: 'mdi-account-group', route: 'users' },
                    { title: 'Ir al home', icon: 'mdi-home', route: 'home' }
                ],
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
            redirect(route) {
                console.log(this.route + ' y ' + route)
                if(this.route != route) {
                    switch (route) {
                        case 'dashboard':
                            this.route = 'dashboard'
                            this.$router.replace('/admin')
                            break;
                        case 'movies':
                            this.route = 'movies'
                            this.$router.replace('/admin/movies')
                            break;
                        case 'users':
                            this.route = 'users'
                            this.$router.replace('/admin/users')
                            break;
                        case 'home':
                            this.route = 'home'
                            this.$router.replace('/')
                            break;
                        default:
                            this.route = 'dashboard'
                            this.$router.replace('/admin')
                            break;
                    }
                }
            }
        },
        mounted() {
            this.route = this.$route.name
            console.log(this.route)
        }
    }
</script>

<style scoped>
    #sidebar .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).active {
        background-color: #211e32;
    }

    #sidebar .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).active:hover:before {
        opacity: 0;
    }

    #sidebar .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled).logout:hover {
        background-color: #790707;
    }

    #btn-sidebar {
        top: 32px;
        right: 32px;
    }

    #btn-sidebar:hover {
        opacity: 0.8;
    }

    @media only screen and (min-width: 1264px) {
        #btn-sidebar {
            display: none!important;
        }
    }

    @media only screen and (max-width: 768px) {
        #btn-sidebar {
            right: 22px;
        }
    }
</style>