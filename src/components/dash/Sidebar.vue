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
              <ul v-for="(item,key,index) in menuSidebar" :key="index"  class="nav nav-treeview">
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
import EventBus from "../../utils/EventBus.js";
export default {
  name: "sidebar",
  data() {
    return {
     menuSidebar: [],
     lang: ''
    }
  },
  mounted(){
   EventBus.$on('event-name', function (data) {
      console.log("Receiving events", data);
      //seft.$forceUpdate();
      console.log('aaaaaaaaaaaa')
    });
  },
  destroyed() {
    // Stop listening the event hello with handler
    //EventBus.$off('hello', menuSidebar1);
  },
  beforeMount(){
    let self = this
console.log('Nothing gets called before me!')
self.loadmenuSidebar();
  },
  created(){
    // let seft = this;
    let vm = this;
    // setTimeout(function(){
    //   console.log("refreshing vm..");
    //   vm.$forceUpdate();
    // },2000)
    console.log('Nothing gets called before me1!')
    vm.loadmenuSidebar();
    EventBus.$on('event-name', function (data) {
      console.log("Receiving events", data);
      //seft.$forceUpdate();
      console.log('aaaaaaaaaaaa')
    })
    
  },
  watch:{
    // menuSidebar: function(newOld, oldVal) {
    //   let seft = this;
    //   seft.loadmenuSidebar();
    // },
  },
  methods: {
    loadmenuSidebar(){
      let seft = this;
      axios.get('http://10.4.4.92:91/Menus/Getall').then(r=>{
        seft.menuSidebar = r.data
      })
      // let seft = this;
      // seft.menus = JSON.parse(localStorage.getItem('Menus'));
    }
  }
};
</script>

