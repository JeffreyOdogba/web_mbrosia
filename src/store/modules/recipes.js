/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import axios from "axios";

import Axios from "axios";
const API_URL = "http://10.0.0.11:5050/api";
// const API_URL = "http://10.0.0.9:5050/api";

const state = {
  recipes: [
    {
      // _id: "",
      // recipeTitle: "",
      // description: "",
      // cookTime: 0,
      // serving: 0,
      // kcal: 0,
      // country: "",
      // photo: "",
      // ingredients: [],
      // procedures: [],
    },
  ],

  loading: false,
  msg: null,
};

const getters = {
  // eslint-disable-next-line prettier/prettier
  allRecipes: (state) => state.recipes,
  isLoading: (state) => state.loading,
  msg: (state) => state.msg,
};

const actions = {
  async fetchRecipe({ commit }) {
    commit("making_request");
    const token = localStorage.getItem("token");

    if (token) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await Axios.get(`${API_URL}/contributor/recipe`, config);

      commit("setRecipes", res.data);
      commit("request_completed");
    } else {
      commit("unAuth_token", "Unauthorization to access this page!");
    }
  },

  async addRecipe({ commit }, form) {
    // console.log("form for addR", form);
    commit("making_request");

    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          // Accept: "application/json",
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      await Axios.post(`${API_URL}/recipe/addrecipe`, form, config).then(
        (res) => {
          // console.log(res.data);
          commit("createRecipe", res.data);
          commit("request_completed");
        }
      );
    }
  },
};

const mutations = {
  making_request(state) {
    state.loading = true;
  },
  request_completed(state) {
    state.loading = false;
  },
  unAuth_token(state, msg) {
    state.msg = msg;
  },
  setRecipes: (state, recipes) => {
    state.recipes = recipes;
  },
  createRecipe: (state, recipes) => {
    state.msg = recipes.msg;
    state.recipes.unshift(recipes.recipes);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
