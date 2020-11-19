/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import axios from "axios";

import Axios from "axios";
const API_URL = "http://10.0.0.7:5000/api";

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
  msg: null,
  token: localStorage.getItem("token") || "",
};

const getters = {
  // eslint-disable-next-line prettier/prettier
  getContributor: (state) => state.contributor,
  getMsg: (state) => state.msg,
};

console.log("getters.getMsg", getters.getMsg.toString());
const actions = {
  async fetchContributor({ commit }) {
    const res = await Axios.get(`${API_URL}/contributor/createContributor`);
    commit("setContributor", res.data);
  },

  async createContributor({ commit }, form) {
    await Axios.post(`${API_URL}/contributor/createContributor`, {
      form,
    }).then((res) => {
      console.log(res.data);
      commit("createContributor", res.data);
    });
  },
  async loginContributor({ commit }, form) {
    await Axios.post(`${API_URL}/contributor/login`, {
      form,
    }).then((res) => {
      const token = res.data.authorizationToken;
      localStorage.setItem("token", token);
      Axios.defaults.headers.common["Authorization"] = token;
      commit("loginContributor", res.data);
    });
  },
};

const mutations = {
  setContributor: (state, contributor) => {
    state.contributor = contributor;
  },
  createContributor: (state, msg) => {
    state.msg = msg;
  },
  loginContributor: (state, contributor) => {
    state.contributor = contributor;
    setTimeout(() => (state.msg = null), 5000);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
