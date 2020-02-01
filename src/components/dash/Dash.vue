<template>
  <div id="dashboard">
    <div class="wrapper">
    <app-header />
      <app-sidebar :key="componentKey" />
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <!-- <app-breadcumb /> -->
        <!-- Main content -->
        <section class="content">
          <transition name="fade">
            <router-view  ></router-view>
          </transition>
        </section>
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->
      <app-footer></app-footer>
      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
      </aside>
      <!-- /.control-sidebar -->
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Footer from "./Footer.vue";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: "dashboard",
  data() {
    return {
      componentKey: 0,
      role: null
    }
  },
  created(){
    let self = this
    self.forceRerender();
    self.role = VueJwtDecode.decode(localStorage.getItem("authToken")).Role
    console.log("seft.role")
    console.log(self.role)
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;  
    }
  },
  components: {
    AppSidebar: Sidebar,
    AppFooter: Footer,
    AppBreadcumb: Breadcrumb,
    AppHeader:Header
  }
};
</script>

<style lang="scss" scoped></style>
