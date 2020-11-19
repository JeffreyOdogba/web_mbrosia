/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import axios from "axios";

import Axios from "axios";
// const API_URL = "http://35.182.246.245/api";

const API_URL = "http://10.0.0.7:5000/api";

const state = {
  recipes: [
    {
      _id: "",
      recipeTitle: "",
      description: "",
      cookTime: 0,
      serving: 0,
      kcal: 0,
      country: "",
      photo: "",
      ingredients: [],
      procedures: [],
    },
  ],
  loading: false,
};

const getters = {
  // eslint-disable-next-line prettier/prettier
  allRecipes: (state) => state.recipes,
  isLoading: (state) => state.loading,
};

const actions = {
  async fetchRecipe({ commit }) {
    commit("making_request");
    console.log(localStorage.getItem("token"));
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await Axios.get(`${API_URL}/contributor/recipe`, {
      config,
    });
    commit("setRecipes", res.data);
    commit("request_completed");
  },

  async addRecipe({ commit }, form) {
    console.log(form);

    const res = await Axios.post(`${API_URL}/addrecipe`, { form });

    commit("createRecipe", res.data);
  },
};

const mutations = {
  making_request(state) {
    state.loading = true;
  },
  request_completed(state) {
    state.loading = false;
  },
  setRecipes: (state, recipes) => {
    state.recipes = recipes;
  },
  createRecipe: (state, recipes) => {
    state.recipes.unshift(recipes);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
