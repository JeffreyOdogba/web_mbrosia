/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import axios from "axios";

import Axios from "axios";
const API_URL = "http://10.0.0.9:5050/api";
// const API_URL = "http://10.0.0.9:5050/api";
// const API_URL = process.env.API_URL;

const state = {
  contributor: {
    // _id: "",
    // username: "",
    // fullname: "",
    // email: "",
    // location: "",
    // photoAvater: "",
    // photoBanner: "",
    // bio: "",
    // dob: "",
    // website: "",
  },
  loading: false,
  msg: null,
  token: localStorage.getItem("token"),
  isLog: false,
  totalLikedRecipes: 0,
};

const getters = {
  // eslint-disable-next-line prettier/prettier
  getContributor: (state) => state.contributor,
  getTotalLikedRecipes: (state) => state.totalLikedRecipes,
  getMsg: (state) => state.msg,
  loading: (state) => state.loading,
  loggedIn: (state) => state.token,
  isLoggedIn: (state) => state.isLog,
};

const actions = {
  async fetchContributor({ commit }) {
    commit("making_request");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await Axios.get(`${API_URL}/contributor/contributor`, config);

    commit("setContributor", res.data);
  },

  async getTotalLikedRecipe_Contributor({ commit }) {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await Axios.get(
      `${API_URL}/contributor/getTotalLikedRecipe_Contributor`,
      config
    );

    commit("setTotalLikedRecipes", res.data);
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
    commit("making_request");
    await Axios.post(`${API_URL}/contributor/login`, {
      form,
    })
      .then((res) => {
        const token = res.data.authorizationToken;
        // console.log(res.data);
        if (token) {
          localStorage.setItem("token", token);
          Axios.defaults.headers.common["Authorization"] = token;
          commit("loginContributor", res.data);
          commit("request_completed");
        } else {
          commit("msg_contributor", res.data.msg);
          localStorage.removeItem("token");
          delete Axios.defaults.headers.common["Authorization"];
          commit("request_completed");
        }
      })
      .catch((err) => {
        console.log("err", err);
        commit("msg_contributor", "Opps, something went wrong");
        localStorage.removeItem("token");
        delete Axios.defaults.headers.common["Authorization"];
      });
    console.log(state.isLog);
  },
  async updateProfile({ commit }, form) {
    commit("making_request");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await Axios.put(`${API_URL}/contributor/updateProfile`, form, config)
      .then((res) => {
        commit("update_contributor", res.data.contributor);
        commit("request_completed");
        commit("msg_contributor", res.data.msg);
      })
      .catch((err) => {
        commit("msg_contributor", err.message.msg);
        commit("request_failed");
      });
  },
  async logOut({ commit }) {
    commit("making_request");
    localStorage.removeItem("token");
    delete Axios.defaults.headers.common["Authorization"];
    commit("logOut", "You logged out!");
    commit("request_completed");
    console.log(state.isLog);
  },
};

const mutations = {
  making_request(state) {
    state.loading = true;
  },
  request_completed(state) {
    state.loading = false;
  },
  request_failed(state) {
    state.loading = false;
  },
  setContributor: (state, contributor) => {
    state.contributor = contributor;
  },
  setTotalLikedRecipes: (state, totalLikedRecipes) => {
    state.totalLikedRecipes = totalLikedRecipes;
  },
  createContributor: (state, msg) => {
    state.msg = msg;
  },
  loginContributor: (state, contributor) => {
    state.contributor = contributor;
    if (contributor.authorizationToken) {
      state.isLog = true;
    }
    setTimeout(() => (state.msg = null), 5000);
  },
  verify_contributor: (state, msg) => {
    state.msg = msg;
  },
  update_contributor: (state, contributor) => {
    state.contributor = contributor;
  },
  msg_contributor: (state, msg) => {
    state.msg = msg;
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
