<template>
  <div class="login-box">

    <!-- <label>Ngon ngu</label>
    <select
      class="form-control select2bs4 select2-hidden-accessible"
      style="width: 100%;"
      data-select2-id="17"
      tabindex="-1"
      aria-hidden="true"
      
    >
      <option  label="Vietnamese" value="Vietnamese"></option>
      <option  label="English" value="English"></option>

    </select> -->
    <!-- <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
      <flag :iso="entry.flag" v-bind:squared=false />
        {{entry.title}}
    </button> -->
    <div class="login-logo">
      <a ><b>KPI</b>System</a>
    </div>
    <!-- /.login-logo -->
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
          <!-- /.col -->
          <div class="col-4">
            <button @click="login" @keyup.enter="login" class="btn btn-primary btn-block">Login</button>
          </div>
          <!-- /.col -->
        </div>
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>
</template>

<script>
import i18n from '../../lang/i18n';
export default {
   data() {
    return {
      user: {
        username: '',
        password: ''
      },
      loggedIn: this.$auth.loggedIn(),
    }
  },
  created(){
    console.log(this.loggedIn)
  },
  methods: {
    login(){
      this.$http.post("http://10.4.4.224:98/api/auth/login", this.user )
        .then(function(res) {
          console.log(res)
          // localStorage.setItem('menus', res.user.menus);
          // console.log( localStorage.getItem('menus'));
          this.$auth.setToken(res.body.token, Date.now() + 14400000 ,res.body.user.Menus ,res.body.user.User.Alias); // + 4 hours
          this.$router.push("/home");
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

