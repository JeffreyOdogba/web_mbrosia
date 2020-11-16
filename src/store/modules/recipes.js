/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import axios from "axios";

import Axios from "axios";
const API_URL = "http://35.182.246.245/api";

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
};

const actions = {
  async fetchRecipe({ commit }) {
    const res = await Axios.get(`${API_URL}/recipe`);

    commit("setRecipes", res.data);
  },

  async addRecipe({ commit }, form) {
    console.log(form);

    const res = await Axios.post(`${API_URL}/addrecipe`, { form });

    commit("createRecipe", res.data);
  },
};

const mutations = {
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
