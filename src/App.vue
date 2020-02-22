<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      height="84"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="images/logo-normal.png"
          transition="scale-transition"
          width="200"
        />
      </div>

        <v-text-field
          class="ml-10 mr-10 center mt-8"
          label="Buscar película"
          prepend-inner-icon="mdi-magnify"
          outlined
          clearable
        />

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
      <Movie/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Movie from './components/Movie';

export default {
  name: 'App',

  components: {
    HelloWorld,
    Movie,
  },

  data: () => ({
    //
  }),
};
</script>
