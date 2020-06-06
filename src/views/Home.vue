<template>
    <v-container id="home">
        <Navbar />
        <div class="content" v-bind:style="{ 'margin-left': sidebarWidth + 'px' }">
            <router-view></router-view>
        </div>
    </v-container>
</template>

<script>
    import Navbar from '../components/Navbar';

    export default {
        components: {
            Navbar,
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
            this.$store.dispatch('currentUser')
        },
    };
</script>