import Vue from "vue";
import App from "./App.vue";
import Router from "./routes";
import i18n from './lang/i18n'
import VueResource from 'vue-resource';
import Auth from './plugins/Auth.js';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'
import Vuelidate from 'vuelidate'
import FlagIcon from 'vue-flag-icon'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
// import store from './store'
import HenryHub from './hub'
import VueJwtDecode from 'vue-jwt-decode'
import VuePageTransition from 'vue-page-transition'

import VueApexCharts from 'vue-apexcharts'
Vue.use(VuePageTransition)
Vue.use(Vuesax, {
  // options here
})
Vue.use(HenryHub)
Vue.use(FlagIcon)
// Vue.use(QuestionHub)
Vue.use(VueApexCharts)
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
// import './custom.scss'
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(Auth);
Vue.use(VueResource);

// Vue.use(VueJwtDecode)
// VueJwtDecode.decode(localStorage.getItem("authToken"))

/* eslint-disable no-new */
//configure alertify defaults
// alertify.defaults.notifier.position = 'top-right';
Vue.http.interceptors.push(function (request, next) {
  if (request.url[0] === '/') {
    request.url = process.env.API + request.url;

    var token = Vue.auth.getToken();
    if (token)
      request.headers.set('Authorization', 'Bearer ' + token);
  }

  next(function (response) {
    if (response.status == 422) {
      response.body.errors.forEach(function (e) {
        alertify.error(e);
      });
    }
  });
});
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
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
  else {
    next(); // make sure to always call next()!
  }
});
new Vue({
  // el: "#app",
  router: Router,
  i18n,
  store: store,
  template: "<App/>",
  components: { App },
  render: h => h(App)
}).$mount('#app');

// export default app
