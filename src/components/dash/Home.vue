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
            <li class="breadcrumb-item active">{{$t("home")}}</li>
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
              <span class="info-box-text">{{item.Name}}</span>
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
import axios from 'axios';
import Sidebar from './Sidebar.vue';
import { HTTP } from "../../http-constants";
import VueJwtDecode from "vue-jwt-decode";
import i18n from "../../lang/i18n";
import signal from "../../hub";
import EventBus from "../../utils/EventBus.js";
export default {
  name: "home",
 data() {
    return {
     menus: [],
     menuSidebar:'',
     loggedIn: this.$auth.loggedIn(),
     arrayID: [],
     data: [],
     listdata: [],
     userid: 0,
     locale: $cookies.get("Lang")
    }
  },
   components: {
    AppSidebar: Sidebar,
  },
  mounted(){
    let seft = this;
    seft.userid = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid;
    seft.getall2();
    seft.getAllNotifications();
  },
  watch:{
    locale : function(newOld,oldVal){
      this.locale = newOld
      this.getall2()
    }
  },
  created(){
    let seft = this;
    EventBus.$on('flag', locale =>{
      seft.locale = locale
    });
    seft.locale = $cookies.get("Lang")
    console.log("Lang")
    console.log(seft.locale) 
    // seft.getall2();
    seft.menuSidebar = JSON.parse(localStorage.getItem('Menus'))
    // seft.menus = JSON.parse(localStorage.getItem('Menus'))
    // console.log(seft.menus)
    //seft.loadmenu();
    setTimeout(function(){
      seft.getAllNotifications();
    },500)
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://10.4.4.224:98/henry-hub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
    connection.start().then(function () {
      console.log("connected");
    });
    connection.on("ReceiveMessage", (user, message) => {
      console.log("ReceiveMessage");
    seft.getAllNotifications();
    });
  }, 
  destroyed() {
    // Stop listening the event hello with handler
    EventBus.$off('flag', this.locale);
  },
  computed: {
    user: function() {
      return this.$store.state.currentUser;
    }
  },

  methods: {
    getall2(){
    let seft = this
    axios.get(`http://10.4.4.92:91/Menus/Getall2/${seft.locale}`).then(r=>{
        seft.menus = r.data
        console.log("menus")
        console.log(seft.menus)
      })
    },
    getAllNotifications() {
      let seft = this;

      axios.get("http://10.4.4.224:98/Home/GetNotifications").then(r=>{
         seft.arrayID = r.data.arrayID;
        seft.data = r.data.data;
        seft.listdata = r.data;
        seft.userid = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid;
       
      })
    },
    loadmenu(){
        let seft = this
        axios.get('http://10.4.4.92:91/Menus/Getall').then(r=>{
          seft.menus = r.data
          console.log(seft.menus)
        })
        // seft.menus = JSON.parse(localStorage.getItem('Menus'))
        // console.log(seft.menus)
        // seft.$forceUpdate()
    }
  }
};
</script>

<style lang="scss" scoped></style>
