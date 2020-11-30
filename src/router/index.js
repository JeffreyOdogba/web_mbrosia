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
    // meta: { requiresAuth: true },
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
  },
  {
    path: "/recipe_videos",
    name: "recipe_videos",
    component: Recipe_Video,
  },
  {
    path: "/account",
    name: "account",
    component: Account,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     console.log("to,from,next");
//     if (localStorage.getItem("token")) {
//       next();
//       return;
//     }
//     next("/");
//   } else {
//     next();
//   }
// });

export default router;
