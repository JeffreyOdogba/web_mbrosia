<template>
  <div id="container">
    <v-snackbar v-model="snackbar" top :timeout="5000">
      {{ msg }}

      <!-- <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template> -->
    </v-snackbar>
    <div id="logo-frame">
      <v-hover v-slot:default="{ hover }">
        <v-img
          :elevation="hover ? 24 : 6"
          alt="Vuetify Logo"
          class="shrink mr-2 img"
          contain
          src="../../assets/Mbrosai.png"
          transition="scale-transition"
          width="740"
        />
      </v-hover>
    </div>

    <div id="button">
      <LoginContributor
        btnName="Sign in as a Contributor."
        title="Contributor."
        @msgNote="alert"
      >
      </LoginContributor>
      <!-- <LoginEatery btnName="Sign in as an Eatery." title="Eatery." /> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import LoginContributor from "./LoginContributor.vue";
// import LoginEatery from "../LoginEatery.vue";
export default {
  name: "BannerHome_Mbrosia",
  components: {
    LoginContributor,
    //  LoginEatery,
  },
  computed: {},
  data: () => ({
    snackbar: false,
    msg: "",
  }),
  methods: {
    alert(value) {
      console.log(value);
      this.snackbar = true;
      this.msg = value;
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  flex: 1;
  margin-top: 120px;
}
#container #logo-frame {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}
#logo-frame {
  perspective: 1500px;
  .img {
    transform: rotateX(2deg);
    border-radius: 2.25em;
    transition: 0.3s;
  }
  &:hover .img {
    transform: rotate(0);
  }
}
#text {
  text-align: center;
}
#text span {
  text-transform: capitalize;
  font-size: 20px;
}
#button {
  display: flex;
  align-self: center;
  margin-top: 90px;
  flex: 1;
  padding: 30px;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
#button a {
  flex-direction: column;
  margin: 15px;
  align-items: center;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 20px;
  padding: 5px;
}

#button a.router-link-exact-active {
  color: #c23616;
}
</style>
