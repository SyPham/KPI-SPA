<template>
  <div id="sidebar">
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="/" class="brand-link">
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
            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Admin
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>KPI</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index2.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>OC</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Category</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>KPI OC</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>OC Category</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Category KPI OC</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>User</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Add User Of OC</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Setting</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="node_modules/admin-lte/index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Menu</p>
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
  name: "sidebar"
};
</script>

<style lang="scss" scoped></style>
