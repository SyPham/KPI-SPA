<template>
  <div class="row">
    <!-- left column -->
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Update User</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form @submit.prevent="update" role="form">
          <div class="card-body">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">UserName</label>
              <span style="color:red">(*)</span>
              <input
                type="text"
                class="form-control"
                v-model="UserName"
                placeholder="Enter UserName"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Email</label>
              <span style="color:red">(*)</span>
              <input
                type="text"
                class="form-control"
                v-model="Email"
                placeholder="Enter Email"
              />
              
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Alilas</label>
              <span style="color:red">(*)</span>
              <input
                type="text"
                class="form-control"
                v-model="Alilas"
                placeholder="Enter Alilas"
              />
           
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">FullName</label>
              <span style="color:red">(*)</span>
              <input
                type="text"
                class="form-control"
                v-model="FullName"
                placeholder="Enter FullName"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Skype</label>
              <input
                type="text"
                class="form-control"
                v-model="Skype"
                placeholder="Enter Skype"
              />
            </div>

            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Code</label>
              <input
                type="text"
                class="form-control"
                v-model="Code"
                placeholder="Enter Code"
              />
              
            </div>

            <div class="form-group col-md-6">
              <label>Permission</label>
              <span style="color:red">(*)</span>
              <select
                class="form-control select2bs4 select2-hidden-accessible"
                style="width: 100%;"
                data-select2-id="17"
                tabindex="-1"
                v-model="Permission"
                aria-hidden="true"
              >
                <option v-for="item in data" :key="item.value" :label="item.Name" :value="item.ID"></option>

                <!-- <option data-select2-id="61">2</option> -->
              </select>
            </div>
          </div>
          <!-- /.card-body -->

          <div class="card-footer">
            <button type="submit" class="btn btn-success">Save</button>
            <button @click="resetForm()" type="submit" class="btn btn-danger">Close</button>
          </div>
        </form>
      </div>
      <!-- /.card -->
    </div>
    <!--/.col (left) -->
  </div>
</template>

<script>
import { HTTP } from "../../http-constants";
export default {
  name: "UpdateUser",
  data() {
    return {
      data: [],
      Userid: 0,
      UserName: null,
      Password: null,
      Email: "",
      Alilas: "",
      FullName: "",
      Skype: "",
      Code:"",
      Permission: "",
    };
  },
  created() {
    this.GetListAllPermissions();
    this.get(this.$route.params.id);
    this.ID = this.$route.params.id;
    console.log(this.ID);
  },
  methods: {
    GetListAllPermissions(Userid = 0) {
      axios.get(`http://10.4.4.92:991/AdminUser/GetListAllPermissions/${this.Userid}`)
        .then(r => {
          this.data = r.data;
          console.log(r.data);
        })
        .catch(r => {
          // console.log(r);
        });
    },
    resetForm() {
      this.$router.push("/adminUser");
    },
    get(id) {
      if (id == undefined) return;
        axios.get("http://10.4.4.92:991/AdminUser/GetbyID/"+ id)
        .then(r => {
          console.log(r)
          // seft.loading = false;
          this.UserName = r.data.Username
          this.Email = r.data.Email
          this.Alilas = r.data.Alias
          this.FullName = r.data.FullName
          this.Skype = r.data.Skype
          this.Code = r.data.Code
          this.Permission = r.data.Permission
          // this.$router.push("/adminKPI");
          // alertify.success("Success");
          // console.log(r.data);
        })
        .catch(r => {
          
        });
    },
    update() {
      axios.post("http://10.4.4.92:991/AdminUser/Update",{
          ID: this.ID,
          Username: this.UserName,
          Email: this.Email,
          Alias: this.Alilas,
          FullName: this.FullName,
          Skype: this.Skype,
          Code: this.Code,
          Permission: this.Permission,
          Role: this.Permission
      })
        .then(r => {
          this.$router.push("/adminUser");
          success("success!");
          // console.log(r)
        })
        .catch(e => {
          alertify.error("Erro");
        });
    }
  }
};
</script>