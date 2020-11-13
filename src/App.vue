<template>
  <v-app>
    <v-app-bar app color="#c23616" dark>
      <div class="d-flex align-center">
        <a href="/">
          <v-img
            alt="Mbrosia Logo"
            class="shrink mr-2"
            contain
            src="./assets/logo.png"
            transition="scale-transition"
            width="40"
          />
        </a>

        <v-img
          alt="Mbrosia Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/logoName.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Mbrosia</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view>
        <Home />
        <Dashboard />
      </router-view>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    Home,
    Footer,
    Dashboard,
  },

  data: () => ({
    //
  }),
};
</script>
