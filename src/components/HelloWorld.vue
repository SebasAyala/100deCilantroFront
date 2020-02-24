<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h2 class="font-weight-bold white-text" style="color: #52bd95;">
          CARTELERA
        </h2>
      </v-col>
      <v-col
        cols="8"
        offset="2"
      >
        <v-text-field
          label="Buscar película"
          prepend-inner-icon="mdi-magnify"
          outlined
          clearable
          dark
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/layout/pre-defined',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  }
</script>
