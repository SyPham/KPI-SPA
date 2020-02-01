<template>

  <!-- <div class="login-box"> -->
    <!-- <div class="login-logo">
      <a ><b>KPI</b>System</a>
    </div>
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">
          Login KPI SYSTEM
        </p>
        <div class="input-group mb-3">
          <input type="text" @keyup.enter="login" v-model="user.username" class="form-control" placeholder="Username" />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input
            @keyup.enter="login"
            type="password"
            class="form-control"
            v-model="user.password"
            placeholder="password"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember" />
              <label for="remember">
                remember me
              </label>
            </div>
          </div>
          <div class="col-4">
            <button @click="login" @keyup.enter="login" class="btn btn-primary btn-block">Login</button>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <canvas class="header__background" width="1272" height="501" style="width: 100%; height: 100%;"></canvas>
    <div class="trees">
      <div class="hover-box">
        <div class="card card-login mx-auto text-center bg-dark">
          <div class="card-header mx-auto bg-dark">
            <span>
            <img class="w-75" src="src/img/logo-login.png">
            </span><br>
            <span class="logo_title mt-5"> Login KPI System </span>
          </div>
          <div class="alert alert-warning alert-dismissible fade show" style="display:none" role="alert">
            <strong>Warning!</strong> "Username or Pasword is wrong!"
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                  <i class="fas fa-user"></i>
                  </span>
                </div>
                <input autocomplete="off" class="form-control" @keyup.enter="login" v-model="user.username"  placeholder="Username" required="True" type="text" value="">
              </div>
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                  <i class="fas fa-key"></i>
                  </span>
                </div>
                <input autocomplete="off" class="form-control"  @keyup.enter="login"  v-model="user.password" placeholder="Password" required="True" type="password">
              </div>
              <div class="form-group">
                <input type="submit"  @click="login" @keyup.enter="login" value="Login" class="btn btn-outline-info float-right ">
              </div>
           
          </div>
        </div>
      </div>
    </div> -->
    <div class="limiter">
      <div class="container-login100">
        <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          
            <span class="login100-form-title p-b-33">
              Login KPI System
            </span>

            <div class="wrap-input100 validate-input" >
              <input @keyup.enter="login" v-model="user.username" class="input100" type="text" name="email" placeholder="Username">
              <span class="focus-input100-1"></span>
              <span class="focus-input100-2"></span>
            </div>

            <div class="wrap-input100 rs1 validate-input" >
              <input class="input100" @keyup.enter="login"  v-model="user.password" type="password" name="pass" placeholder="Password">
              <span class="focus-input100-1"></span>
              <span class="focus-input100-2"></span>
            </div>

            <div class="container-login100-form-btn m-t-20">
              <button class="login100-form-btn" @click="login" @keyup.enter="login">
                Sign in
              </button>
            </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import { HTTP } from "../../http-constants";
// import axios from 'axios';
import i18n from '../../lang/i18n';
import EventBus from "../../utils/EventBus.js";
export default {
   data() {
    return {
      user: {
        username: '',
        password: ''
      },
      menuSidebar: 'aaa',
      loggedIn: this.$auth.loggedIn(),
    }
  },
  created(){
    console.log(window.location.href)
    // this.menuSidebar = JSON.parse(localStorage.getItem('Menus'))
    // console.log(this.menuSidebar)
    console.log(localStorage.getItem('Menus'))
    
  },
  methods: {
    login(){
      let self = this
      //EventBus.$emit('event-name', self.menuSidebarmenuSidebar)
      axios.post("api/auth/login", self.user )
        .then(function(res) {
          console.log(res)
          //self.menuSidebar = res.data.user.Menus
          self.$auth.setToken(res.data.token, Date.now() + 14400000 ,res.data.user.Menus ,res.data.user.User.Alias); // + 4 hours
          console.log("res.data.user.User")
          console.log(res.data.user.User)
          var uri = self.$route.query.redirect || "";
          if(self.$route.query.redirect.length != 0 )
          {
            self.$router.push(uri);    
          }
          else{
            self.$router.push("/home");
            //EventBus.$emit('hello', self.menuSidebar);
            //EventBus.$emit('event-name', data)
          }
          success("success!");
      }).catch((res) => {
          warning("Username and password are incorrect, please try again!")
        });
    }
  }
}
</script>
<style >
  button {
    padding: auto;
    border: 1px solid green;
    font-size: 15px;
    margin: auto;
  }   
</style>

