<template>
  <v-app>
    <v-app-bar app color="#c23616" dark>
      <v-snackbar
        v-model="snackbar"
        transition="scroll-y-transition"
        color="#c23616"
        top
        :timeout="4000"
      >
        {{ msg }}
      </v-snackbar>
      <div v-if="loggedIn" class="d-flex align-center">
        <a href="/dashboard">
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
      <div v-else class="d-flex align-center">
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

      <v-btn href="/recipe_videos" text v-if="loggedIn">
        <span class="mr-1">Set</span>
        <v-icon>mdi-video-box</v-icon>
      </v-btn>
      <v-btn href="/account" text v-if="loggedIn">
        <span class="mr-1">You</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn text v-if="loggedIn" @click="logOutBtn">
        <span class="mr-1">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view>
        <Home />
        <Dashboard />
        <Signup_contributor @msg="alert" />
        <Confirmation_contributor />
      </router-view>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
import Home from "./views/Home";
import Dashboard from "./views/Contributor/Dashboard.vue";
import Signup_contributor from "./views/Contributor/Signup.contributor.vue";
import Confirmation_contributor from "./views/Contributor/Confirmation";
import Footer from "./components/Footer";
import { EventBus } from "./utils/event-bus";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Home,
    Footer,
    Dashboard,
    Signup_contributor,
    Confirmation_contributor,
  },
  data: () => ({
    snackbar: false,
    msg: "",
    isLogged: false,
  }),
  computed: {
    ...mapGetters({
      token: "token",
      getMsg: "getMsg",
      loading: "loading",
      loggedIn: "loggedIn",
    }),
  },

  created() {},
  methods: {
    ...mapActions({
      logOut: "logOut",
    }),

    alert(value) {
      this.snackbar = true;
      this.msg = value;
    },
    logOutBtn() {
      this.logOut().then(() => {
        this.isLogged = false;
        this.$router.push("/");
        EventBus.$emit("msg", this.getMsg);
      });
    },
  },

  mounted() {
    EventBus.$on("msg", (payload) => {
      this.alert(payload);
    });
  },
};
</script>
