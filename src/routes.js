import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "./components/auth/Auth.vue";
import Login from "./components/auth/Login.vue";
// import Register from "./components/auth/Register.vue";
import AdminKPI from "./components/dash/AdminKPI.vue";
import Dash from "./components/dash/Dash.vue";
// import Profile from "./components/dash/Profile.vue";
// import Settings from "./components/dash/Settings.vue";
import Home from "./components/dash/Home.vue";
Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Dash,
      redirect: "/home",
      children: [
        {
          path: "home",
          component: Home
        }
      ]
    },
    {
      path: "/auth",
      component: Auth,
      redirect: "/auth/login",
      children: [
        {
          path: "login",
          component: Login
        }
      ]
    }
  ]
});

export default router;
