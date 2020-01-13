<template>
  <div id="sidebar">
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="#/home" class="brand-link">
        <img
          src="../../assets/logo-login.png"
          alt="KPI System Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: .8"
        />
        <span class="brand-text font-weight-light">KPI System</span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user (optional) 
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              src="node_modules/admin-lte/dist/img/default-150x150.png"
              class="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div class="info">
            <a href="#" class="d-block">Admin</a>
          </div>
        </div>
      -->
        <!-- Sidebar Menu -->
        <nav class="mt-2">
          
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
            
            >
            <!-- Add icons to the links using the .nav-icon class
                  with font-awesome or any other icon font library -->
            <li   class="nav-item has-treeview">
              <a href="#/home" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Home
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul v-for="(item,key,index) in menus" :key="index"  class="nav nav-treeview">
                <li  class="nav-item">
                  <a :href="'#' + item.Link"  class="nav-link">
                    <i :class="item.FontAwesome"></i>
                    <p>{{$t(item.Code)}}</p>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
     menus: [],
     lang: ''
    }
  },
  mounted(){
    let seft = this;
    seft.loadmenu();
  },
  created(){
    let seft = this;
    seft.loadmenu();
  }, 

  methods: {
    loadmenu(){
        let seft = this;
        seft.menus = JSON.parse(localStorage.getItem("Menus"));
    }
  }
};
</script>

