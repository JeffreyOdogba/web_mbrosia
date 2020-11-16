import Vue from "vue";
import Vuex from "vuex";
import recipes from "./modules/recipes";
import contributor from "./modules/contributor";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    recipes,
    contributor,
  },
});
