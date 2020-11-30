import Vue from "vue";
// import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import Axios from "axios";

Vue.prototype.$http = Axios;

// const token = localStorage.getItem("token");

// if (!token) {
// Vue.prototype.$http.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${token}`;
//   this.$http.router.push("/");
// }

Vue.config.productionTip = false;

Vue.use(Vuelidate);
// Vue.use(Vuex);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
