<template>
    <div id="admin">
        <Sidebar/>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Sidebar from '../components/Sidebar';

    export default {
        components: {
            Sidebar,
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
            if (!this.getStatusLogin || !this.getCurrentUser || this.getCurrentUser.type_user != 1) {
                this.$router.replace('/')
            }
        }
    };
</script>

<style>
    #admin {
        min-height: 100%;
    }

    @media only screen and (min-width: 1264px) {
        #admin {
            margin-left: 256px;
        }
    }
</style>