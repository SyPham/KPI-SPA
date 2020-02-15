<template>
  <div class="row">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6"></div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <a href="#/home">{{$t('home')}}</a>
            </li>
            <li class="breadcrumb-item active">KPI</li>
          </ol>
        </div>
      </div>
    </div>
    <!-- left column -->
    <div class="col-md-12">
      <!-- general form elements -->
      <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title">Update KPI</h3>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form @submit.prevent="update" role="form">
          <div class="card-body">
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Chinese Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Name" v-model="NameTW"/>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">English Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Name" v-model="NameEn"/>
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Vietnamese Name</label>
              <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Enter Name" v-model="NameVI"/>
            </div>
            <div class="form-group col-md-6">
              <label>Unit</label>
              <select class="form-control select2bs4 select2-hidden-accessible" style="width: 100%;" data-select2-id="17" tabindex="-1" v-model="Unit" aria-hidden="true">
                <option v-for="item in data" :key="item.value" :label="item.Name" :value="item.ID"></option>
                <!-- <option data-select2-id="61">2</option> -->
              </select>
            </div>
          </div>
          <!-- /.card-body -->

          <div class="card-footer">
            <button  type="submit" class="btn btn-success">Save</button>
            <button @click="resetForm"  class="btn btn-danger">Close</button>
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
  name: "UpdateKPI",
  data() {
    return {
      data: [],
      ID:0,
      Name: null,
      NameVI: null,
      NameEn: null,
      NameTW: null,
      LevelID: 0,
      Unit: ""
    };
  },
  created() {
    this.getUnit();
    this.get(this.$route.params.id);
    this.ID = this.$route.params.id;
    console.log(this.ID);
  },
  methods: {
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
      this.$router.go("/AdminKPI");
    },
    get(id) {
      if (id == undefined) return;
        axios.get("http://10.4.4.92:91/AdminKPI/GetbyID/"+ id,{
          headers:{
            Authorization: 'Bearer '+ localStorage.getItem("authToken")
          }
        })
        .then(r => {
          console.log(r)
          this.NameVI = r.data.NameVI
          this.NameEn = r.data.NameEn
          this.NameTW = r.data.NameTW
          this.LevelID = r.data.LevelID
          this.Unit = r.data.Unit
          
        })
        .catch(r => {
          
        });
    },
    update() {
      axios.post("http://10.4.4.92:91/AdminKPI/Update",{
          ID: this.ID,
          NameVI: this.NameVI,
          NameEn: this.NameEn,
          NameTW: this.NameTW,
          LevelID: this.LevelID,
          Unit: this.Unit,
          headers:{
            Authorization: 'Bearer '+ localStorage.getItem("authToken")
          }
      })
        .then(r => {
          this.$router.go(-1);
          success("success!");
          // console.log(r)
        })
        .catch(e => {
          warning("error!");
        });
    }
  }
};
</script>