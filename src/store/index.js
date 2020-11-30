import Vue from "vue";
import Vuex from "vuex";
import recipes from "./modules/recipes";
import contributor from "./modules/contributor";
import videoSet from "./modules/videoSet";

Vue.use(Vuex);

export default new Vuex.Store({
  /* eslint-disable */
  state: {},
  mutations: {},
  actions: {},
  modules: {
    recipes,
    contributor,
    videoSet,
  },
});
