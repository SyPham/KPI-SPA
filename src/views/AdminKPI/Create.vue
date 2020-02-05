<template>
  <div class="row">
    <!-- left column -->
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Add KPI</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form @submit.prevent="save" role="form">

          <div class="card-body">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Chinese Name</label>
              <span style="color:red">(*)</span>
              <input type="text" class="form-control" v-model="NameTW" placeholder="Enter Name" :class="{ 'is-invalid': submitted && $v.NameTW.$error }"/>
              <div v-if="submitted && !$v.NameTW.required" class="invalid-feedback">Name is required</div>
            </div>

            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">English Name</label>
              <span style="color:red">(*)</span>
              <input type="text" class="form-control" v-model="NameEn" placeholder="Enter Name" :class="{ 'is-invalid': submitted && $v.NameEn.$error }"/>
              <div v-if="submitted && !$v.NameEn.required" class="invalid-feedback">Name is required</div>
            </div>

            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Vietnamese Name</label>
              <span style="color:red">(*)</span>
              <input type="text" class="form-control" v-model="NameVI" placeholder="Enter Name" :class="{ 'is-invalid': submitted && $v.NameVI.$error }"/>
              <div v-if="submitted && !$v.NameVI.required" class="invalid-feedback">Name is required</div>
            </div>
            <!-- <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Level</label>
              <span style="color:red">(*)</span>
              <input :class="{ 'is-invalid': submitted && $v.LevelID.$error }" type="number" class="form-control" v-model="LevelID" placeholder="Enter Level"/>
              <div v-if="submitted && !$v.LevelID.required" class="invalid-feedback">LevelID is required</div>
            </div> -->

            <div class="form-group col-md-6">
              <label>Unit</label>
              <span style="color:red">(*)</span>
              <select class="form-control select2bs4 select2-hidden-accessible" style="width: 100%;" data-select2-id="17" tabindex="-1" v-model="Unit" aria-hidden="true" :class="{ 'is-invalid': submitted && $v.Unit.$error }">
                <option v-for="item in data" :key="item.value" :label="item.Name" :value="item.ID"></option>
                <!-- <option data-select2-id="61">2</option> -->
              </select>
              <div v-if="submitted && !$v.Unit.required" class="invalid-feedback">Unit is required</div>
            </div>
          </div>
          <!-- /.card-body -->

          <div class="card-footer">
            <button type="submit" class="btn btn-success">Save</button>
            <button @click="$router.go(-1)" type="submit" class="btn btn-danger">Close</button>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  name: "CreateKPI",
  data() {
    return {
      data: [],
      Name: null,
      NameVI: null,
      NameEn: null,
      NameTW: null,
      LevelID: 0,
      Unit: "",
      submitted: false
    };
  },
  validations: {
    NameVI: { required },
    NameEn: { required },
    NameTW: { required },
    LevelID: { required },
    Unit: { required }
  },
  created() {
    this.getUnit();
    console.log('Bearer ' + localStorage.getItem("authToken"))
  },
  methods: {
    save() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else {
        
        axios.post("http://10.4.4.92:91/AdminKPI/add", {
          // Name: this.NameEn,Co
          NameVI: this.NameVI,
          NameEn: this.NameEn,
          NameTW: this.NameTW,
          Unit: this.Unit,
        },{
          headers:{
            Authorization: 'Bearer '+ localStorage.getItem("authToken")
          }
        })
          .then(response => {
            this.$router.push("/adminKPI");
            success("success!");
            // console.log()
          })
          .catch(e => {
            warning("error!");
          });
      }
    },
    getUnit() {
      axios.get("AdminKPI/getallunit",{
        headers:{
          Authorization: 'Bearer '+ localStorage.getItem("authToken")
        }
      })
        .then(r => {
          this.data = r.data;
          // console.log(r.data);
        })
        .catch(r => {
          // console.log(r);
        });
    },
    resetForm() {
      this.$router.go(-1);
    }
  }
};
</script>