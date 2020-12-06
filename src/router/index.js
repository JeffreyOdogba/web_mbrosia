/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import store from "../store/modules/contributor.js";
import Dashboard from "../views/Contributor/Dashboard.vue";
import Signup_contributor from "../views/Contributor/Signup.contributor.vue";
import Confirmation from "../views/Contributor/Confirmation.vue";
import Recipe_Item from "../views/Contributor/Recipe_Item.vue";
import Recipe_Video from "../views/Contributor/Recipe_Video.vue";
import Account from "../views/Contributor/Account.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      // console.log("token", token);
      if (!token) {
        next({
          path: "/",
          query: {
            redirectFrom: to.fullPath,
          },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/register_contributor",
    name: "Signup_contributor",
    component: Signup_contributor,
  },
  {
    path: "/account_comfirmation/:token",
    name: "Confirmation",
    component: Confirmation,
  },
  {
    path: "/recipe/:id",
    name: "recipe",
    component: Recipe_Item,
    props: true,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      // console.log("token", token);
      if (!token) {
        next({
          path: "/",
          query: {
            redirectFrom: to.fullPath,
          },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/recipe_videos",
    name: "recipe_videos",
    component: Recipe_Video,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      // console.log("token", token);
      if (!token) {
        next({
          path: "/",
          query: {
            redirectFrom: to.fullPath,
          },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/account",
    name: "account",
    component: Account,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token");
      // console.log("token", token);
      if (!token) {
        next({
          path: "/",
        });
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
