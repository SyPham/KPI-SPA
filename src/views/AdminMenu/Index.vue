<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">List Menu</h3>
        </div>
        <div class="card-header">
          <button @click="$router.push(`/Menus/create`)" class="btn btn-success pull-right">
            <i class="fa fa-plus"></i> Add
          </button>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Link</th>
                <th>FontAwesome</th>
                <th>BackgroudColor</th>
                <th>PermissionName</th>
                <th>Position</th>
                <th>Add/Edit/Delete</th>
              </tr>
            </thead>
            <tbody v-for="(item,key,index) in Listmenus " :key ="index">
              <tr>
                <td>{{item.name}}</td>
                <td>{{item.link}}</td>
                <td>{{item.fontAwesome}}</td>
                <td>{{item.backgroudColor}}</td>
                <td>{{item.permission}}</td>
                <td>{{item.position}}</td>
                <td>
                  <div class="btn-group">
                    <div class="btn-group">

                      <button @click="$router.push(`/Menus/${item.id}/edit`)" class="btn btn-primary">
                        <i class="fa fa-edit"></i> Edit
                      </button>

                      <button @click="$router.push(`/Menus/${item.id}/edit`)" class="btn btn-warning">
                        <i class="fa fa-eye"></i> Detail
                      </button>

                      <button @click="remove(item.id)" class="btn btn-danger">
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
        <!-- <div class="card-footer clearfix">
          <ul class="pagination pagination-sm m-0 float-right">
            <li class="page-item">
              <a class="page-link" href="#">«</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">»</a>
            </li>
          </ul>
        </div> -->
      </div>
      <!-- /.card -->
    </div>
    <!-- /.col -->
  </div>
</template>

<script>
export default {
  name: "IndexMenu",
  data() {
    return {
     Listmenus: []
    }
  },

  created(){
    let seft = this;
    seft.loadmenu();
  }, 

  methods: {
    loadmenu(){
        let seft = this;
        this.$http.get("http://10.4.4.224:98/menus/getall")
        .then((r) => {
          seft.Listmenus = r.data
          // console.log(seft.Listmenus);
        }).catch((err) => {
          
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
            this.$http.get("http://10.4.4.224:98/menus/delete/" + id)
            // HTTP.post("AdminCategory/delete/" + id)
              .then(r => {
                this.loadmenu();
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