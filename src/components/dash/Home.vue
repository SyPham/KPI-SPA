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
      <div v-for="(item,key,index) in menus" :key="index" class="col-12 col-sm-6 col-md-3">
        <a :href="'#' + item.Link" style="text-decoration:none">
          <div class="info-box">
            <span :class="'info-box-icon' + ' ' + item.BackgroudColor+ ' ' + 'elevation-1'"
              ><i :class="item.FontAwesome"></i
            ></span>

            <div class="info-box-content">
              <span class="info-box-text">{{$t(item.Code)}}</span>
              <span class="info-box-number " style="color:#fff">
                (1) 
              </span>
            </div>
            <!-- /.info-box-content -->
          </div>
          </a>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      
    </div>
  </div>
</template>

<script>
import { HTTP } from "../../http-constants";
import VueJwtDecode from "vue-jwt-decode";
import i18n from "../../lang/i18n";
import signal from "../../hub";
export default {
  name: "home",
 data() {
    return {
     menus: [],
     loggedIn: this.$auth.loggedIn(),
     arrayID: [],
     data: [],
     listdata: [],
     userid: 0
    }
  },

  created(){
    let seft = this;
    seft.loadmenu();
    seft.getAllNotifications();
  }, 
   computed: {
    user: function() {
      return this.$store.state.currentUser;
    }
    
  },

  methods: {
    getAllNotifications(){
      let seft = this ;
      HTTP.get("Home/GetNotifications")
      .then(r=>{
        seft.arrayID = r.data.arrayID
        //console.log(seft.arrayID)
        seft.data = r.data.data
        console.log(seft.data)
        seft.listdata = r.data
        console.log(seft.listdata)
        seft.userid = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
        // console.log(user)
      })
    },
    loadmenu(){
        let seft = this;
        
        seft.menus = JSON.parse(localStorage.getItem("Menus"));
        // console.log(seft.menus)
    }
  }
};
</script>

<style lang="scss" scoped></style>
