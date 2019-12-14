<template>
  <div class="row">
    <!-- left column -->
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Add Category</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form @submit.prevent="save" role="form">
          <div class="card-body">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Name</label>
              <span style="color:red">(*)</span>
              <input
                type="text"
                class="form-control"
                v-model="Name"
                placeholder="Enter Name"
                :class="{ 'is-invalid': submitted && $v.Name.$error }"
              />
              <div v-if="submitted && !$v.Name.required" class="invalid-feedback">Name is required</div>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Code</label>
              <span style="color:red">(*)</span>
              <input
                :class="{ 'is-invalid': submitted && $v.Code.$error }"
                v-model="Code"
                type="text"
                class="form-control"
                placeholder="Enter Code"
              />
              <div v-if="submitted && !$v.Code.required" class="invalid-feedback">Code is required</div>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Level</label>
              <span style="color:red">(*)</span>
              <input
                :class="{ 'is-invalid': submitted && $v.Level.$error }"
                v-model="Level"
                type="text"
                class="form-control"
                placeholder="Enter Level"
              />
              <div v-if="submitted && !$v.Level.required" class="invalid-feedback">Level is required</div>
            </div>
            <div class="form-group">
              <small
                style="color:red;font-weight:bold;text-align:center;display:block"
              >(*) Require fields not to be blank.</small>
            </div>
          </div>
          <!-- /.card-body -->

          <div class="card-footer">
            <button type="submit" class="btn btn-success">Save</button>
            <button @click="resetForm" type="submit" class="btn btn-danger">Close</button>
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
  name: "CreateCategory",
  data() {
    return {
      Name: null,
      Level: 0,
      Code: null,
      submitted: false
    };
  },
  validations: {
    Name: { required },
    Level: { required },
    Code: { required }
  },
  created() {
    // this.getUnit();
  },
  methods: {
    save() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        HTTP.post("adminCategory/add", {
          Name: this.Name,
          LevelID: this.Level,
          Code: this.Code
        })
          .then(response => {
            this.$router.push("/adminCategory");
            swal.fire({
              title: "Success!",
              text: "Update successfully!",
              type: "success"
            });
            // console.log()
          })
          .catch(e => {
            console.error(e);
          });
      }
    },
    resetForm() {
      this.$router.push("/adminCategory");
    }
    // save() {
    //   HTTP.post("adminCategory/add", {
    //     Name: this.Name,
    //     LevelID: this.Level,
    //     Code: this.Code
    //   })
    //     .then(response => {
    //       this.$router.push("/adminCategory");
    //       alertify.success("Success");
    //       // console.log()
    //     })
    //     .catch(e => {
    //       console.error(e);
    //     });
    // }
  }
};
</script>