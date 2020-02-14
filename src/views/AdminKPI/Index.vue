<template>
  <div class="row" v-if="role == 1">
    <div class="col-md-12 my-3">
      <button @click="$router.push(`/adminKPI/create`)" class="btn btn-success float-right">
        <i class="fa fa-plus"></i> {{$t('Add_btn')}}
      </button>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-md-4">
              <h3 class="card-title">List KPIs</h3>
            </div>
            <div class="col-md-4">
            <div class="form-group">

            <div class="input-group">
             <input v-model="searchname" type="text" class="form-control" placeholder="Search name"/>
              <div class="input-group-append" data-target="#timepicker" data-toggle="datetimepicker">
                <button class="input-group-text btn-success" @click="searchname = ' '"> <i class="fas fa-remove"></i> Clear</button>
              </div>
            </div>
            <!-- /.input group -->
          </div>
            </div>
            <div class="col-md-4"></div>
          </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>{{$t('Name')}}</th>
                <th>{{$t('Code')}}</th>
                <th>{{$t('Units')}}</th>
                <th>{{$t('AddEditDelete')}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(kpi, key, index) in data" :key="index">
                <td>{{ key + 1 }}</td>
                <td>{{ kpi.Names.join(" - ") || kpi.Name }}</td>
                <td>{{ kpi.Code }}</td>
                <td>{{ kpi.Unit }}</td>
                <td >
                  <div class="btn-group">
                    <div class="btn-group">
                      <button
                        @click="$router.push(`/adminKPI/${kpi.ID}/edit`)"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="fa fa-edit"></i> {{$t('Edit')}}
                      </button>

                      <button
                        @click="remove(kpi.ID)"
                        class="btn btn-danger btn-sm"
                      >
                        <i class="fa fa-trash"></i> {{$t('Delete')}}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer clearfix">
          <Paginate
            v-model="page"
            :page-count="totalPage "
            :prev-text="'Prev'"
            :next-text="'Next'"
            :page-range="3"
            :margin-pages="2"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :prev-class="'page-item'"
            :next-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-link-class="'page-link'"
            :next-link-class="'page-link'"
            :click-handler="changePage"
          ></Paginate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../../http-constants";
import Paginate from "vuejs-paginate";
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: "IndexKpi",
  data() {
    return {
      role: null,
      data: [],
      ID: 0,
      DID: 0,
      totalPage: 0,
      page: 1,
      pageSize: 10,
      catID: 0,
      name: " ",
      searchname: "",
      locale: $cookies.get("Lang"),

    };
  },
  components: {
    Paginate
  },
  watch: {
    searchname: function(newOld, oldVal) {
      console.log(newOld)
      console.log(oldVal)
      this.name = newOld;
      this.LoadData();
    }
  },
  created() {

    let seft = this;
    // seft.getAll();
    seft.LoadData();
    seft.role = VueJwtDecode.decode(localStorage.getItem("authToken")).Role
    console.log("seft.role")
    console.log(seft.role)
    seft.ID = seft.$route.params.id;
  },
  methods: {
    LoadData() {
      // debugger
      let seft = this
      axios.post(`http://10.4.4.92:991/AdminKPI/LoadData/${seft.page}/${seft.pageSize}/${seft.name}/${seft.locale}`,{
        headers:{
          Authorization: 'Bearer '+ localStorage.getItem("authToken")
        }
      }).then(res => {
        console.log(res);
        seft.totalPage = res.data.pageCount;
        seft.page = res.data.page;
        seft.data = res.data.data;
        seft.pageSize = res.data.pageSize;
      });
    },
    changePage(pageNum) {
      this.LoadData(this.name, pageNum);
    },
    getAll() {
      axios.get("AdminKPI/getall",{
        headers:{
          Authorization: 'Bearer '+ localStorage.getItem("authToken")
        }
      })
        .then(r => {
          this.data = r.data;
          console.log(r);
        })
        .catch(r => {
          // console.log(r);
        });
    },
    remove(id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons
        .fire({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false,
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            axios.get(`AdminKPI/delete/${id}`,{
              headers:{
                Authorization: 'Bearer '+ localStorage.getItem("authToken")
              }
            })
              .then(r => {
                this.LoadData();
                $("#RemoveModal").modal("hide");
                // alertify.success("Success");
              })
              .catch(r => {
                console.log(r);
              });
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your imaginary file is safe :)",
              "error"
            );
          }
        });
      // console.log(id);
    },
    showRemoveModal: function(kpi) {
      $("#RemoveModal").modal("show");
    }
  },
  
};
</script>
