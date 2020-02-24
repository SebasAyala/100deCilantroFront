<template>
    <v-row class="text-center">
        <v-col cols="12">
            <h2 class="font-weight-bold white-text" style="color: #52bd95;">CARTELERA</h2>
        </v-col>
        <v-col class="py-0" cols="8" offset="2">
            <v-text-field class="search" label="Buscar película" prepend-inner-icon="mdi-magnify" outlined clearable dark />
        </v-col>
    </v-row>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data: () => ({
    }),
  }
</script>

<style>
    .search .v-text-field__details {
        display: none;
    }
</style>
