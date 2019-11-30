import Vue from "vue";
import App from "./App.vue";
import Router from "./routes.js";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router: Router,
  template: "<App/>",
  components: { App }
});
