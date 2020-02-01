<template>
  <div class="row">
    <!-- left column -->
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Update Category</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form @submit.prevent="update" role="form">
          <div class="card-body">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="Name"
                placeholder="Enter Name"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Code</label>
              <input v-model="Code" type="text" class="form-control" placeholder="Enter Code" />
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Level</label>
              <input v-model="Level" type="text" class="form-control" placeholder="Enter Level" />
            </div>
          </div>
          <!-- /.card-body -->

          <div class="card-footer">
            <button  type="submit" class="btn btn-success">Save</button>
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
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "UpdateCategory",
  data() {
    return {
      data: [],
      ID: 0,
      Name: null,
      Level: 0,
      Code: null,
      submitted: false
    }
  },
  validations: {
    Name: { required },
    Level: { required },
    Code: { required }
  },
  created() {
    this.get(this.$route.params.id);
    this.ID = this.$route.params.id;
    // console.log(this.ID);
  },
  methods: {
    resetForm() {
      this.$router.go(-1);
    },
    get(id) {
      if (id == undefined) return;
      axios.get("adminCategory/GetbyID/" + id,{
        headers:{
          Authorization: 'Bearer '+ localStorage.getItem("authToken")
        }
      })
        .then(r => {
          // seft.loading = false;
          this.Name = r.data.Name;
          this.Level = r.data.LevelID;
          this.Code = r.data.Code;
          // this.$router.push("/adminKPI");
          // alertify.success("Success");
          // console.log(r.data);
        })
        .catch(r => {});
    },
    update() {
      axios.post("adminCategory/Update", {
        ID: this.ID,
        Name: this.Name,
        LevelID: this.Level,
        Code: this.Code,
        headers:{
          Authorization: 'Bearer '+ localStorage.getItem("authToken")
        }
      })
        .then(r => {
          this.$router.push("/adminCategory");
          success("success!");
          // console.log(r);
        })
        .catch(e => {
          alertify.error("Erro");
        });
    }
  }
}
</script>