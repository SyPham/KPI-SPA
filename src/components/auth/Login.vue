<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="../../index2.html"><b>KPI</b>System</a>
    </div>
    <!-- /.login-logo -->
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Sign in to start your session</p>

     
          <div class="input-group mb-3">
            <input type="text" v-model="user.username" class="form-control" placeholder="Username" />
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-user"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control"
              v-model="user.password"
              placeholder="Password"
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
                  Remember Me
                </label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-4">
              <button @click="login" class="btn btn-primary btn-block">Sign In</button>
            </div>
            <!-- /.col -->
          </div>
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>
</template>

<script>
export default {
   data() {
    return {
      user: {
        username: '',
        password: ''
      } 
    }
  },
  created(){

  },
  methods: {
    login(){
      this.$http.post("http://10.4.4.224:98/api/auth/login", this.user)
        .then(function(res) {
          console.log(res)
          // localStorage.setItem('menus', res.user.menus);
          // console.log( localStorage.getItem('menus'));
          this.$auth.setToken(res.body.token, Date.now() + 14400000 ,res.body.user.Menus); // + 4 hours
          this.$router.push("/home");
          const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              customClass: {
                  title: 'title-class',
                  icon: 'icon-class'
              }
          });
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
      }).catch((res) => {
          swal.fire({
            title: "Error!",
            text: "Username or password is incorrect ! Please try again",
            type: "Error"
          });
        });
    }
  }
}
</script>


