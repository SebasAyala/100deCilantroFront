<template>
    <v-navigation-drawer v-model="drawer" absolute dark>
        <v-list nav class="py-0">
            <v-list-item two-line :class="'px-0'">
                <v-list-item-avatar>
                    <img src="../../public/images/avatars/3.svg">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>Sebastián Ayala</v-list-item-title>
                    <v-list-item-subtitle>Admin</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.title"/>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        data () {
            return {
                drawer: true,
                items: [
                    { title: 'Dashboard', icon: 'mdi-view-dashboard' },
                    { title: 'Photos', icon: 'mdi-image' },
                    { title: 'About', icon: 'mdi-help-box' },
                ],
            }
        },
    }
</script>