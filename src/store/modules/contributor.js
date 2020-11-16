/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import axios from "axios";

import Axios from "axios";
const API_URL = "http://35.182.246.245/api";

const state = {
  contributor: {
    _id: "",
    username: "",
    fullname: "",
    email: "",
    location: "",
    photoAvater: "",
    photoBanner: "",
    bio: "",
    dob: "",
    website: "",
  },
  loading: false,
};

const getters = {
  // eslint-disable-next-line prettier/prettier
  getContributor: (state) => state.contributor,
};

const actions = {
  async fetchContributor({ commit }) {
    const res = await Axios.get(`${API_URL}/contributor`);
    commit("setUser", res.data);
  },

  async addContributor({ commit }, form) {
    console.log(form);

    const res = await Axios.post(`${API_URL}/createContributor`, { form });

    commit("createContributor", res.data);
  },
};

const mutations = {
  setContributor: (state, contributor) => {
    state.contributor = contributor;
  },
  createContributor: (state, contributor) => {
    state.contributor = contributor;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
