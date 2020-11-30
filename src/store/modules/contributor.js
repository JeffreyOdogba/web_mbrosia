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
  token: localStorage.getItem("token") || null,
  isLoggedIn: false,
};

const getters = {
  // eslint-disable-next-line prettier/prettier
  getContributor: (state) => state.contributor,
  getMsg: (state) => state.msg,
  loading: (state) => state.loading,
  loggedIn: (state) => !!state.token,
};

const actions = {
  async fetchContributor({ commit }) {
    const res = await Axios.get(`${API_URL}/contributor/createContributor`);
    commit("setContributor", res.data);
  },

  async createContributor({ commit }, form) {
    await Axios.post(`${API_URL}/contributor/createContributor`, {
      form,
    }).then((res) => {
      //console.log(res.data);
      commit("createContributor", res.data);
    });
  },

  async verify_contributor({ commit }, form) {
    commit("making_request");

    await Axios.post(
      `${API_URL}/contributor/confirmation/${form.token}`,
      form
    ).then((res) => {
      commit("verify_contributor", res.data);
      commit("request_completed");
    });
  },

  async loginContributor({ commit }, form) {
    await Axios.post(`${API_URL}/contributor/login`, {
      form,
    })
      .then((res) => {
        const token = res.data.authorizationToken;
        localStorage.setItem("token", token);
        Axios.defaults.headers.common["Authorization"] = token;
        commit("loginContributor", res.data);
        commit("set_login");
      })
      .catch((err) => {
        commit("auth_error", "Opps, something went wrong");
        localStorage.removeItem("token");
        delete Axios.defaults.headers.common["Authorization"];
      });
  },
  async logOut({ commit }) {
    commit("making_request");
    localStorage.removeItem("token");
    delete Axios.defaults.headers.common["Authorization"];
    commit("logOut", "You logged out!");
    commit("request_completed");
    commit("set_login");
  },
};

const mutations = {
  making_request(state) {
    state.loading = true;
  },
  request_completed(state) {
    state.loading = false;
  },
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
  verify_contributor: (state, msg) => {
    state.msg = msg;
  },
  set_login: (state) => {
    state.isLoggedIn = true;
  },
  logOut: (state, msg) => {
    state.isLoggedIn = false;
    state.token = "";
    state.msg = msg;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
