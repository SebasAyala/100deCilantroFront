<template>
    <v-container id="list-users">
        <v-row>
            <v-col cols="8" offset="2">
                <v-row>
                    <v-col cols="12" sm="7" lg="8">
                        <div class="v-align-center">
                            <h2 class="section-title white-text" style="color: #52bd95;">LISTADO DE USUARIOS</h2>
                        </div>
                    </v-col>
                    <v-col cols="12" sm="5" lg="4" class="text-right">
                        <v-text-field
                            v-model="userSearched"
                            :clear-icon-cb="showUsers()"
                            class="search"
                            label="Buscar por Nombre"
                            prepend-inner-icon="mdi-magnify"
                            clearable
                            dark
                            dense
                            outlined
                            @keyup="searchText()"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8" offset="2">
                <v-list two-line dense subheader dark color="transparent" width="100%">
                    <v-divider/>
                    <div v-for="(user, i) in getUsers" :key="i">
                        <v-list-item @click.stop="viewUser(i)">
                            <v-list-item-avatar>
                                <v-img :src="'images/avatars/' + user.picture"/>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title  v-text="user.name + ' ' + user.lastname"/>
                                <v-list-item-subtitle v-text="user.email"/>
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
            <v-tooltip content-class="tooltip" color="#323042" left>
                <template v-slot:activator="{ on }">
                    <v-btn class="btn-add-element" absolute fixed fab color="#52bd95" v-on="on">
                        <v-icon>mdi-account-plus</v-icon>
                    </v-btn>
                </template>
                <span>Añadir Usuario</span>
            </v-tooltip>
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
</template>

<script>
    export default {
        name: 'Users',
        data: () => ({
            info: null,
            errored: false,
            userSearched: '',
            sidebarWidth: '',
            userToShow: '',
            dialog: false
        }),
        computed: {
            getUsers() {
                return this.$store.getters.getUsers
            }
        },
        mounted() {
            this.$store.dispatch('currentUser')
            this.$store.dispatch('allUsers')
        },
        methods: {
            searchText: function(){
                /*
                this.getUsers.forEach(user => {
                    if (!user.name.toLowerCase().includes(this.userSearched.toLowerCase())){
                        return user.show = false;
                    } else {
                        return user.show = true;
                    }
                });
                */
            },
            showUsers() {
                /*
                if(this.userSearched === null){
                    this.getUsers.forEach(user => {
                        return user.show = true;
                    });
                } else {
                    this.searchText();
                }
                */
            },
            viewUser: function(i){
                this.dialog = true;
                this.userToShow = this.getUsers[i];
                console.log(this.userToShow);
            },
        }
    }
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