<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">List Categories</h3>
        </div>
        <div class="card-header">
          <button @click="$router.push(`/adminCategory/create`)" class="btn btn-success pull-right">
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
                <th>Name</th>
                <th>Code</th>
                <th>Level</th>
                <th>Add/Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cate,key,index) in data" :key="index">
                <td>{{key+1}}</td>
                <td>{{cate.Name}}</td>
                <td>{{cate.Code}}</td>
                <td>{{cate.LevelID}}</td>
                <td>
                  <div class="btn-group">
                    <div class="btn-group">
                      <button
                        @click="$router.push(`/adminCategory/${cate.ID}/edit`)"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="fa fa-edit"></i> Edit
                      </button>

                      <button @click="remove(cate.ID)" class="btn btn-danger btn-sm">
                        <i class="fa fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.card-body -->
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
      <!-- /.card -->
    </div>
    <!-- /.col -->
  </div>
</template>

<script>
import { HTTP } from "../../http-constants";
import Paginate from "vuejs-paginate";
export default {
  name: "IndexCategory",
  data() {
    return {
      data: [],
      ID: 0,
      DID: 0,
      totalPage: 0,
      page: 1,
      skip: 0,
      name: " ",
      pageSize: 10,
      searchname: " ",
    };
  },
  components: {
    Paginate
  },
  created() {

    let seft = this;
    seft.LoadData();
    seft.ID = seft.$route.params.id;
    // console.log(seft.ID);
  },
   watch: {
    searchname: function(newOld, oldVal) {
      this.LoadData(this.name, newOld, 1);
    }
  },
  methods: {
    LoadData() {
      let seft = this;
      HTTP.post(`Admincategory/LoadData2/${seft.page}/${seft.pageSize}/${seft.name}`)
      .then(res => {
        console.log(res);
        seft.skip = res.data.skip;
        seft.totalPage = res.data.pageCount;
        seft.page = res.data.page;
        seft.data = res.data.data;
        seft.pageSize = res.data.pageSize;
      });
    },
    changePage(pageNum) {
      this.LoadData( this.name, pageNum);
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
            HTTP.post("AdminCategory/delete/" + id)
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
    }
  }
};
</script>