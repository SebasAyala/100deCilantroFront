<template>
    <div id="admin">
        <Sidebar ref="sidebar" class="sidebar"/>
        <div class="content" v-bind:style="{ 'margin-left': sidebarWidth + 'px' }">
            <v-container>
                <v-row class="text-center">
                    <v-col cols="12">
                        <h2 class="font-weight-bold white-text" style="color: #52bd95;">USUARIOS</h2>
                    </v-col>
                    <v-col class="py-0" cols="8" offset="2">
                        <v-text-field
                            v-model="userSearched"
                            class="search"
                            label="Buscar por Nombre"
                            prepend-inner-icon="mdi-magnify"
                            outlined
                            clearable
                            :clear-icon-cb="showUsers()"
                            dark
                            @keyup="searchText()"
                        />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="8" offset="2">
                        <v-list two-line dense subheader dark color="transparent" width="100%">
                                <v-divider/>
                            <div v-for="(user, i) in users" v-show="user.show" :key="i">
                                <v-list-item @click.stop="viewUser(i)">
                                    <v-list-item-avatar>
                                        <v-img :src="user.avatar"/>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title  v-text="user.name + ' ' + user.lastname"/>
                                        <v-list-item-subtitle v-text="user.mail"/>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-btn icon>
                                            <v-icon color="#52bd95">mdi-pencil</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                    <v-list-item-action>
                                        <v-btn icon>
                                            <v-icon color="#52bd95">mdi-delete</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                                <v-divider/>
                            </div>
                        </v-list>
                    </v-col>
                </v-row>
                <v-row>
                    <v-dialog v-model="dialog" max-width="350">
                        <v-card class="user" v-model="userToShow">
                            <div class="pt-8">
                                <v-img :src="userToShow.avatar" max-width="120" class="mx-auto" />
                            </div>
                            <v-card-title class="text-center">
                                <v-col>
                                    <span class="text-center d-inline-block text-truncate full-width" v-text="userToShow.name"/>
                                    <span class="text-center d-inline-block text-truncate full-width" v-text="userToShow.lastname"/>
                                </v-col>
                            </v-card-title>
                            <v-card-text class="py-0">
                                <v-row>
                                    <v-col class="py-0" cols="12">
                                        <v-text-field
                                            label="Correo Electrónico"
                                            prepend-inner-icon="mdi-mail"
                                            outlined
                                            readonly
                                            dense
                                            :value="userToShow.mail"
                                        />
                                    </v-col>
                                    <v-col class="py-0" cols="12">
                                        <v-text-field
                                            label="Número de teléfono"
                                            prepend-inner-icon="mdi-phone"
                                            outlined
                                            readonly
                                            dense
                                            :value="userToShow.phone"
                                        />
                                    </v-col>
                                    <v-col class="py-0" cols="6">
                                        <v-text-field
                                            label="Reservas"
                                            prepend-inner-icon="mdi-ticket"
                                            outlined
                                            readonly
                                            dense
                                            :value="userToShow.bookings"
                                        />
                                    </v-col>
                                    <v-col class="py-0" cols="6">
                                        <v-text-field
                                            label="Calificación"
                                            prepend-inner-icon="mdi-star"
                                            outlined
                                            readonly
                                            dense
                                            :value="userToShow.rating"
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="pb-8">
                                <v-spacer></v-spacer>
                                <v-btn color="#211e32" outlined @click="dialog = false">
                                    Editar
                                </v-btn>
                                <v-btn color="#211e32" dark @click="dialog = false">
                                    Eliminar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    import Sidebar from '../components/Sidebar';
    export default {
        components: {
            Sidebar,
        },
        data: () => ({
            userSearched: '',
            sidebarWidth: '',
            userToShow: '',
            dialog: false,
            users: [
                {
                    name: 'Jhorman Duván',
                    lastname: 'Vacca Manzano',
                    mail: 'jvacca1@udi.edu.co',
                    phone: '3100000000',
                    bookings: 10,
                    rating: 4.5,
                    avatar: './images/avatars/8.svg',
                    show: true,
                },
                {
                    name: 'Geisson Daniel',
                    lastname: 'Jimenez Leal',
                    mail: 'gjimenez1@udi.edu.co',
                    phone: '3100000000',
                    bookings: 8,
                    rating: 5,
                    avatar: './images/avatars/2.svg',
                    show: true,
                },
                {
                    name: 'Jose Luis',
                    lastname: 'Nova Argüello',
                    mail: 'jnova14@udi.edu.co',
                    phone: '3100000000',
                    bookings: 5,
                    rating: 3.5,
                    avatar: './images/avatars/5.svg',
                    show: true,
                },
                {
                    name: 'Argemiro',
                    lastname: 'García López',
                    mail: 'agarcia2@udi.edu.co',
                    phone: '3100000000',
                    bookings: 1,
                    rating: 3,
                    avatar: './images/avatars/4.svg',
                    show: true,
                },
                {
                    name: 'Diego',
                    lastname: 'Rojas Pérez',
                    mail: 'drojas5@udi.edu.co',
                    phone: '3100000000',
                    bookings: 4,
                    rating: 3.5,
                    avatar: './images/avatars/1.svg',
                    show: true,
                },
            ],
        }),
        mounted: function () {
            this.$nextTick(function () {
                var parentElement = document.getElementById('admin');
                this.sidebarWidth = parentElement.querySelector('.sidebar').clientWidth;
            });
        },
        updated: function () {
            this.$nextTick(function () {
                var parentElement = document.getElementById('admin');
                this.sidebarWidth = parentElement.querySelector('.sidebar').clientWidth;
            });
        },
        methods: {
            searchText: function(){
                this.users.forEach(user => {
                    if (!user.name.toLowerCase().includes(this.userSearched.toLowerCase())){
                        return user.show = false;
                    } else {
                        return user.show = true;
                    }
                });
            },
            showUsers() {
                if(this.userSearched === null){
                    this.users.forEach(user => {
                        return user.show = true;
                    });
                } else {
                    this.searchText();
                }
            },
            viewUser: function(i){
                this.dialog = true;
                this.userToShow = this.users[i];
                console.log(this.userToShow);
            },
        },
        computed: {
            computedMargin () {
                return this.sidebarWidth;
            },
        },
    };
</script>

<style>
    #admin {
        min-height: 100%;
    }

    #admin .v-list-item__title {
        text-transform: uppercase;
        font-family: 'Geogrotesque';
        font-weight: 700!important;
        font-size: 1rem;
        line-height: 1.2rem;
    }

    .user .v-card__title {
        line-height: 1.5rem;
        text-transform: uppercase;
        font-family: 'Geogrotesque';
        font-weight: 900!important;
    }

    .user .v-card__title {
        width: 100%;
    }

    .v-dialog .v-card__actions {
        padding-left: 24px;
        padding-right: 24px;
    }
</style>