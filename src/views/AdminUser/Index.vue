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
            <li class="breadcrumb-item active">Admin User</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="col-md-12 my3">
      <button @click="$router.push(`/adminUser/create`)" class="btn btn-success float-right">
        <i class="fa fa-plus"></i> {{$t('Add_btn')}}  
      </button>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-md-4">
              <h3 class="card-title">{{$t('User_List')}}</h3>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <!-- <div class="input-group">
                  <input v-model="searchname" type="text" class="form-control" placeholder="Search name"/>
                  <div class="input-group-append" data-target="#timepicker" data-toggle="datetimepicker">
                    <button class="input-group-text btn-success" @click="searchname = ' '"> <i class="fas fa-remove"></i> Clear</button>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>{{$t('Username')}}</th>
                <th>{{$t('Email')}}</th>
                <th>{{$t('Alias')}}</th>
                <th>{{$t('FullName')}}</th>
                <th>{{$t('Code')}}</th>
                <th>{{$t('Skype')}}</th>
                <th>{{$t('State')}}</th>
                <th>{{$t('Permission')}}</th>
                <th>{{$t('AddEditDelete')}}</th>
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
      axios.post(`http://10.4.4.92:91/AdminUser/LoadData/${seft.page}/${seft.pageSize}/${seft.search}`).then(res => {
        console.log(res);
        seft.skip = res.data.skip;
        seft.totalPage = res.data.totalPage;
        seft.page = res.data.page;
        seft.data = res.data.data;
      });
    },
    LockUser(Id=1){
      axios.get(`AdminUser/LockUser/${Id}`)
        .then(r => {
          // success('Successfully');
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
          text: "Are you sure to delete this user?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            axios.post("http://10.4.4.92:91/AdminUser/Delete/" + id)
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
              "User has been deleted.",
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