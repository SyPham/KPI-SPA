<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">KPI Lists</h3>
        </div>
        <div class="card-header">
          
        </div>
    
        <!-- /.card-header -->
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Organization Chart</th>
                <th>Level Number</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(kpi,key,index) in data" :key="index">
                <td>{{key+1}}</td>
                <td>{{kpi.KPIName}}</td>
                <td>{{kpi.Username}}</td>
                <td>{{kpi.TeamName}}</td>
                <td>{{kpi.Level}}</td>
                <td>
                  <div class="btn-group">
                    <div class="btn-group">

                      <button @click="remove(kpi.ID)" class="btn btn-danger btn-sm">
                        <i class="fa fa-trash"></i> Delete
                      </button>

                      <!-- Modal -->
                      <div
                        class="modal fade"
                        id="RemoveModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalCenterTitle"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLongTitle">Delete KPIs</h5>
                              <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div class="modal-body">Are you sure delete this ?</div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-dismiss="modal"
                              >Close</button>
                              <button
                                @click="remove(kpi.ID)"
                                type="button"
                                class="btn btn-danger"
                              >OK</button>
                            </div>
                          </div>
                        </div>
                      </div>
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
            :page-count="totalPage"
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
import axios from 'axios';
import Paginate from "vuejs-paginate";
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: "IndexFavourite",
  data() {
    return {
      data: [],
      ID: 0,
      DID: 0,
      totalPage: 0,
      page: 1,
      skip: 0,
      pageSize: 10,
      catID: 0,
      name: "",
      searchname: ""
    };
  },
  components: {
    Paginate
  },
  watch: {
    searchname: function(newOld, oldVal) {
      this.LoadData(this.searchname, newOld, 1);
    }
  },
  created() {
    let seft = this;
    // seft.getAll();
    console.log(window.location.href)
    console.log(seft.$route.path)  
    seft.LoadData();
    // seft.ID = seft.$route.params.id;
    // console.log(seft.ID);
  },
  methods: {
    LoadData() {
      // debugger
      let seft = this;
      let userid = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
      axios.get(`Favourite/LoadData/${userid}/${seft.page}/${seft.pageSize}`)
        .then(res => {
        console.log(res);
        seft.skip = res.data.skip;
        seft.totalPage = res.data.total;
        seft.page = res.data.page;
        seft.data = res.data.data;
        
      });
    },
    changePage(pageNum) {
      this.LoadData(this.catID, this.name, pageNum);
    },
    getAll() {
      axios.get("AdminKPI/getall")
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
            axios.post("AdminKPI/delete/" + id)
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
  }
};
</script>