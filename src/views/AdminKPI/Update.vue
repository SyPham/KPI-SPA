<template>
  <div class="row">
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
              <label for="exampleInputEmail1">Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Name"
                v-model="Name"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">Level</label>
              <input type="number" class="form-control" v-model="LevelID" placeholder="Enter Level" />
            </div>
            <div class="form-group col-md-6">
              <label>Unit</label>
              <select
                class="form-control select2bs4 select2-hidden-accessible"
                style="width: 100%;"
                data-select2-id="17"
                tabindex="-1"
                v-model="Unit"
                aria-hidden="true"
              >
                <option v-for="item in data" :key="item.value" :label="item.Name" :value="item.ID"></option>
                <!-- <option data-select2-id="61">2</option> -->
              </select>
            </div>
          </div>
          <!-- /.card-body -->

          <div class="card-footer">
            <button  type="submit" class="btn btn-success">Save</button>
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
export default {
  name: "UpdateKPI",
  data() {
    return {
      data: [],
      ID:0,
      Name: null,
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
      HTTP.get("AdminKPI/getallunit")
        .then(r => {
          this.data = r.data;
          // console.log(r.data);
        })
        .catch(r => {
          // console.log(r);
        });
    },
    resetForm() {
      this.$router.push("/adminKPI");
    },
    get(id) {
      if (id == undefined) return;
        HTTP.get("AdminKPI/GetbyID/"+ id)
        .then(r => {
          // seft.loading = false;
          this.Name = r.data.Name
          this.LevelID = r.data.LevelID
          this.Unit = r.data.Unit
          // this.$router.push("/adminKPI");
          // alertify.success("Success");
          // console.log(r.data);
        })
        .catch(r => {
          
        });
    },
    update() {
      HTTP.post("AdminKPI/Update",{
          ID: this.ID,
          Name: this.Name,
          LevelID: this.LevelID,
          Unit: this.Unit
      })
        .then(r => {
          this.$router.push("/adminKPI");
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