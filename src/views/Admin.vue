<template>
    <div id="admin">
        <Sidebar/>
        <div>
        </div>
    </div>
</template>

<script>
    import Sidebar from '../components/Sidebar';
    import { mapState } from 'vuex';

    export default {
        components: {
            Sidebar,
        },
        computed () {
            mapState()
        },
        data: () => ({
        }),
    };
</script>

<style>
    #admin {
        min-height: 100%;
    }
</style>