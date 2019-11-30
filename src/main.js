import Vue from "vue";
import App from "./App.vue";
import Router from "./routes.js";
import Auth from './plugins/Auth.js';

Vue.use(Auth);
/* eslint-disable no-new */


//configure route guards
Router.beforeEach(function (to, from, next) {
  //prevent access to 'requiresGuest' routes;
  if (to.matched.some(function (record) { return record.meta.requiresGuest })
    && Vue.auth.loggedIn()) {
    next({
      path: '/home'
    });
  }
  else if (to.matched.some(function (record) { return record.meta.requiresAuth })
    && !Vue.auth.loggedIn()) {
    next({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    });
  }
  else {
    next(); // make sure to always call next()!
  }
});
new Vue({
  el: "#app",
  router: Router,
  template: "<App/>",
  components: { App }
});
