/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import axios from "axios";

import Axios from "axios";
// const API_URL = "http://10.88.111.14:5050/api";
const API_URL = "http://10.0.0.9:5050/api";

const state = {
  video_set: [
    // {
    //   _id: null,
    //   videoTitle: null,
    //   videoSummary: null,
    //   video: null,
    // },
  ],
  video_set_loading: false,
  videoSet_msg: null,
};

const getters = {
  isVideoSetLoading: (state) => state.video_set_loading,
  videoSet_msg: (state) => state.videoSet_msg,
  get_all_video_set: (state) => state.video_set,
};

const actions = {
  async getVideoSet({ commit }) {
    commit("making_request");

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await Axios.get(`${API_URL}/videoSet`, config)
      .then((res) => {
        commit("setVideoSet", res.data);
        commit("request_completed");
      })
      .catch((err) => {
        commit("videoSet_msg", err.msg);
      });
  },

  // upload VideoSet VideoSet is a Short Video (about meals/Health)
  async add_Recipe_Video({ commit }, form) {
    commit("making_request");

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await Axios.post(`${API_URL}/videoSet/uploadVideoSet`, form, config).then(
      (res) => {
        commit("add_recipe_video", res.data.recipe_video);
        commit("videoSet_msg", res.data.msg);
        commit("request_completed");
      }
    );
  },
};

const mutations = {
  making_request(state) {
    state.video_set_loading = true;
  },
  request_completed(state) {
    state.video_set_loading = false;
  },
  setVideoSet: (state, video_set) => {
    state.video_set = video_set;
  },
  add_recipe_video: (state, recipe_video) => {
    state.video_set.unshift(recipe_video);
  },
  videoSet_msg: (state, msg) => {
    state.videoSet_msg = msg;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
