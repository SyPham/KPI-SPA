<template>
  <div>
    <div class="row">
      <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6"></div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <a href="#/home">Dashboard</a>
            </li>
            <li class="breadcrumb-item active">Home</li>
          </ol>
        </div>
      </div>
    </div>
      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/adminLevel" style="text-decoration:none">
          <div class="info-box">
            <span class="info-box-icon bg-orange elevation-1"
              ><i class="fas fa-list-ol"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">OC</span>
              <span class="info-box-number">
                (1) 
              </span>
            </div>
            <!-- /.info-box-content -->
          </div>
          </a>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/adminKPI" style="text-decoration:none">
          <div class="info-box mb-3">
            <span class="info-box-icon bg-aqua "
              ><i class="fas fa-money-bill-alt"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">KPI</span>
              <span class="info-box-number">(2) </span>
            </div>
            <!-- /.info-box-content -->
          </div>
        </a>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->

      <!-- fix for small devices only -->
      <div class="clearfix hidden-md-up"></div>

      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/adminCategory" style="text-decoration:none">
          <div class="info-box mb-3">
            <span class="info-box-icon bg-success elevation-1"
              ><i class="fab fa-gg-circle"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">Category</span>
              <span class="info-box-number">(3)</span>
            </div>
            <!-- /.info-box-content -->
          </div>
        </a>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/OCCategories" style="text-decoration:none">
          <div class="info-box mb-3">
            <span class="info-box-icon bg-warning elevation-1"
              ><i class="far fa-gem"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">OC Category</span>
              <span class="info-box-number">(4)</span>
            </div>
            <!-- /.info-box-content -->
          </div>
        </a>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/adminOC" style="text-decoration:none">
          <div class="info-box mb-3">
            <span class="info-box-icon bg-warning elevation-1"
              ><i class="fas fa-book"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">OC KPI</span>
              <span class="info-box-number">(5)</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </a>
      </div>
      <!-- /.col -->
      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/CategoryKPILevelAdmin" style="text-decoration:none">
          <div class="info-box mb-3">
            <span class="info-box-icon bg-warning elevation-1"
              ><i class="far fa-gem"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">Category KPI OC</span>
              <span class="info-box-number">(6)</span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </a>
      </div>
      <!-- /.col -->
      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/adminUser" style="text-decoration:none">
          <div class="info-box mb-3">
            <span class="info-box-icon bg-warning elevation-1"
              ><i class="fas fa-user-circle"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">User</span>
              <span class="info-box-number"></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </a>
      </div>
      <!-- /.col -->
      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/AddUserToLevel" style="text-decoration:none">
          <div class="info-box mb-3">
            <span class="info-box-icon bg-warning elevation-1"
              ><i class="fas fa-leaf"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">Add User Of OC</span>
              <span class="info-box-number"></span>
            </div>
            <!-- /.info-box-content -->
          </div>
        </a>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/adminLevel" style="text-decoration:none">
          <div class="info-box mb-3">
            <span class="info-box-icon bg-warning elevation-1"
              ><i class="fas fa-cogs"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">Setting</span>
              <span class="info-box-number"></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </a>
      </div>
      <!-- /.col -->
      <div class="col-12 col-sm-6 col-md-3">
        <a href="#/adminLevel" style="text-decoration:none">
          <div class="info-box mb-3">
            <span class="info-box-icon bg-warning elevation-1"
              ><i class="fas fa-bars"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">Menu</span>
              <span class="info-box-number"></span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
 data() {
    return {
     menus: []
    }
  },

  created(){
    let seft = this;
    seft.loadmenu();
  }, 

  methods: {
    loadmenu(){
        let seft = this;
        seft.menus = JSON.parse(localStorage.getItem("menus"));
        console.log(seft.menus)
    }
  }
};
</script>

<style lang="scss" scoped></style>
