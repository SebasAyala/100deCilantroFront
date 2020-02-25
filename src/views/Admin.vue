<template>
    <div id="admin">
        <Sidebar/>
        <div>
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
        }),
    };
</script>

<style>
    #admin {
        min-height: 100%;
    }
</style>