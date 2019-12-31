<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">List Users</h3>
        </div>
        <div class="card-header">
          <button @click="$router.push(`/adminUser/create`)" class="btn btn-success pull-right">
            <i class="fa fa-plus"></i> Add  
          </button>
        </div>
        <div class="card-header">
          <input
            v-model="searchname"
            type="text"
            class="form-control"
            placeholder="Search name"
          />
          <br>
          <button class="btn btn-success btn-sm" @click="searchname = ''">Cancel Search</button>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Alias</th>
                <th>FullName</th>
                <th>Code</th>
                <th>Skype</th>
                <th>State</th>
                <th>Permission</th>
                <th>Add/Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user,key,index) in data" :key="index">
                <td>{{key+1}}</td>
                <td>{{user.Username}}</td>
                <td>{{user.Email}}</td>
                <td>{{user.Alias}}</td>
                <td>{{user.FullName}}</td>
                <td>{{user.Code}}</td>
                <td>{{user.Skype}}</td>

                <td class="lock">
                  <div class="pretty p-icon p-jelly">
                    <input v-if="user.IsActive === true" type="checkbox" class="lockUser" onchange="return lockUser()" :value="user.ID"  />
                    <input v-else type="checkbox" class="lockUser" @onchange="return this.LockUser()" :value="user.ID" checked  />
                    <div class="state p-info-o">
                      <i class="icon fa fa-lock"></i>
                      <label v-if="user.IsActive === true">Unlocked</label>
                      <label v-else>Locked</label>
                    </div>
                  </div>
                </td>

                <td>{{user.PermissionName}}</td>

                <td>
                  <div class="btn-group">
                    <div class="btn-group">
                      <button
                        @click="$router.push(`/adminUser/${user.ID}/edit`)"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="fa fa-edit"></i> Edit
                      </button>

                      <button @click="remove(user.ID)" class="btn btn-danger btn-sm">
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
                              <h5 class="modal-title" id="exampleModalLongTitle">Delete Users</h5>
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
                                @click="remove(user.ID)"
                                type="button"
                                class="btn btn-danger"
                              >OK</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end Modal -->
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
import Paginate from "vuejs-paginate";
export default {
  name: "IndexKpi",
  data() {
    return {
      data: [],
      totalPage: 0,
      page: 1,
      skip: 0,
      Id: 1,
      searchname: "",
      pageSize: 5,
      search:" "
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
    seft.LoadData();
    seft.LockUser();
    seft.ID = seft.$route.params.id;
    // console.log(seft.ID);
  },
  methods: {
    LoadData() {
      // debugger
      let seft = this;
      HTTP.post(`AdminUser/LoadData/${seft.page}/${seft.pageSize}/${seft.search}`).then(res => {
        // console.log(res);
        seft.skip = res.data.skip;
        seft.totalPage = res.data.pageCount;
        seft.page = res.data.page;
        seft.data = res.data.data;
      });
    },
    LockUser(Id=1){
      HTTP.get(`AdminUser/LockUser/${Id}`)
        .then(r => {
          success('Successfully');
          this.LoadData();
          console.log('success')
        })
        .catch(r => {
          // console.log(r);
        });
    },
    // FilterTable: function() {
    //   this.LoadData(this.search, 1);
    // },
    changePage(pageNum) {
      this.LoadData(this.search, pageNum);
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
            HTTP.post("AdminKPI/delete/" + id)
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