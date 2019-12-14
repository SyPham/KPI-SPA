<template>
  <div class="row">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6"></div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <a href="#/home">Home</a>
            </li>
            <li class="breadcrumb-item active">Add User Of List Each Levels</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="callout bg-yellow-gradient" style="border-color:#c57901">
        <h3> Add User Of List Each Levels</h3>
      </div>
    </div>
    <div class="col-md-4">
      <hierarchy></hierarchy>
      <table
        id="treetable"
        class="table table-condensed table-hover table-striped fancytree-fade-expander fancytree-colorize-selected"
      >
        <thead>
          <tr>
            <th>Level</th>
            <th class="text-right">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-8">
      <listoc></listoc>
      <!-- <modal-oc></modal-oc> -->
      <div class="box" id="box">
        <div class="box-header with-border kpi-name"> 
          <h3 style="font-size:18px" class="box-title pull-left">User List</h3>
          <span class="id" style="display:none"></span>
          <span class="code" style="display:none"></span>
          <span class="level" style="display:none"></span>
          <input class="form-control pull-right searchUser" autocomplete="off" placeholder="search here..." style="width:50%" />
        </div>
        <div class="box-body">
          <div class="box-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Alias</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody v-for="(item,key,index) in events" :key="index" class="tbody" id="tbluser">
                <tr :data-id="item.ID">
                  <td class="text-center">{{key+1}}</td>
                  <td>
                    <div class="pretty p-icon p-rotate">
                      <input v-if="item.Status == true" checked type="checkbox" class="checkbox"  name="name" />
                      <input v-else type="checkbox" class="checkbox"  name="name" />
                      <div class="state p-success">
                        <i class="icon fa fa-check"></i>
                        <label class="black username">{{item.Username}}</label>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">{{item.FullName}}</td>
                  <td class="text-center">{{item.LevelID}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="box-footer clearfix">
          <ul id="paginationKPILevel" class="pagination pagination-sm no-margin pull-right">
            <li>
              <a href="#">«</a>
            </li>
            <li>
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">»</a>
            </li>
          </ul>
          <!-- <Paginate
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
          ></Paginate> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../../http-constants";
// import listoc from "../../components/adminOC/List"
import Hierarchy from "../../components/adminOC/Hierarchy";
import listoc from "../../components/adminOC/Modal";
import Paginate from "vuejs-paginate";

export default {
  name: "IndexKpi",
  data() {
    return {
      events: [],
      // test: "A",
      id: 0,
      levelid: 0,
      totalPage: 0,
      page: 1,
      skip: 0,
      pageSize: 6,
      code: ""
    };
  },
  components: {
    listoc,
    Hierarchy,
    Paginate
  },
  created() {
    let seft = this;
    seft.loadAll();
  },
  methods: {
    loadAll() {
      let self = this;

      let glyph_opts = {
        preset: "bootstrap3",
        map: {}
      };
      function logEvent(event, data, msg) {
        // var args = $.isArray(args) ? args.join(", ") :
        msg = msg ? ": " + msg : "";
        $.ui.fancytree.info(
          "Event('" + event.type + "', node=" + data.node + ")" + msg
        );
      }

      $(function () {

        AddUserToLevelController.init();

        $("#treetable").fancytree({
          extensions: ["glyph", "table"],
          checkbox: false,
          selectMode: 2,
          dnd5: {
            preventVoidMoves: true,
            preventRecursion: true,
            autoExpandMS: 400,
            dragStart: function (node, data) {
                return true;
            },
            dragEnter: function (node, data) {
                // return ["before", "after"];
                return true;
            },
            dragDrop: function (node, data) {
                data.otherNode.moveTo(node, data.hitMode);
            }
          },
          glyph: glyph_opts,
          source: { url: "https://localhost:44309/AdminKPILevel/GetListTree", debugDelay: 1000 },
          table: {
            indentation: 20,
            nodeColumnIdx: 1,
            //checkboxColumnIdx: 0
          },
          gridnav: {
            autofocusInput: false,
            handleCursorKeys: true
          },
          focus: function (event, data) {

            logEvent(event, data, ", targetType=" + data.targetType);

            $('#box .kpi-name h3').text('User List - ' + data.node.title);
            $('#box .kpi-name .code').text(data.node.key);
            //$('#tbluser tr td:nth-child(2)').data('teamid',data.node.title);
            
            AddUserToLevelController.LoadDataUser(true, "", Number(data.node.key),true,true);


            $('html, body').animate({
                scrollTop: $("#box").offset().top
            }, 500)
            // return false to prevent default behavior (i.e. activation, ...)
            //return false;
          },
          lazyLoad: function (event, data) {
            //data.result = { url: "/GetListTree", debugDelay: 1000 };
          },
          renderColumns: function (event, data) {
            var node = data.node,
            $tdList = $(node.tr).find(">td");

            // (Index #0 is rendered by fancytree by adding the checkbox)
            // Set column #1 info from node data:
            // (Index #2 is rendered by fancytree)
            // Set column #3 info from node data:

            $tdList.eq(0).addClass('text-bold').text(node.data.levelnumber);
            $tdList.eq(1).find('span.fancytree-icon').removeClass('fancytree-icon').addClass('fa fa-book')
            $tdList.eq(1).addClass('text-bold');
            $tdList.eq(1).addClass('text-bold');
            // Static markup (more efficiently defined as html row template):
            // $tdList.eq(3).html("<input type='input' value='" + "" + "'>");
            // ...
          }
        });

        $('.fancy-collapse').off('click').on('click', function () {
            $("#treetable").fancytree("getTree").expandAll(false);
        });
        $('.fancy-expand').off('click').on('click', function () {
            $("#treetable").fancytree("getTree").expandAll();
        });

      });
      let config = {
        pageSize: 6,
        pageIndex: 1
      };
      let AddUserToLevelController = {
        init: function() {
          AddUserToLevelController.registerEvent();
        },
        registerEvent: function() {
          $('#box .searchUser').off('keypress').on('keypress', function (e) {
            if (e.which === 13) {
              var code = $(this).val();
              var levelid = Number($('#box .code').text());
              AddUserToLevelController.LoadDataUser(true, code,levelid);
            }
          });

          $('#tbluser tr td:nth-child(2) input').change(function () {
            var id = $(this).closest('tr').data('id');
            var levelid = Number($('#box .kpi-name .code').text());

            if (levelid === 0) {
              Toast.fire({
                type: 'error',
                title: 'Please choose team!',
              });
            }
            else {
              let username = $(this).next().children('label').text();
              AddUserToLevelController.updateUser(id,levelid);
              AddUserToLevelController.LoadDataUser("",username,levelid);
              $('#box .searchUser').val(username)
            }
          });
        },
        LoadDataUser: function (changePageSize, code, levelID) {
           let seft = this;
          //  debugger
            // HTTP.post("AddUserToLevel/LoadDataUser", {
            //   levelid: levelID,
            //   code: code,
            //   page: page,
            //   pageSize: pageSize
            // }).then(res => {
            //   // console.log(res)
            //   if(res.status) {
            //   seft.skip = res.data.skip;
            //   seft.totalPage = res.data.totalPage;
            //   seft.page = res.data.page;
            //   seft.events = res.data;
            //   // console.log(seft.page);
            //   console.log(seft.events);
            //   AddUserToLevelController.registerEvent();
            //   }
            // });
          $.ajax({
            url: 'https://localhost:44309/AddUserToLevel/LoadDataUser',
            type: "GET",
            data: {
              levelid: levelID,
              code: code,
              page: config.pageIndex,
              pageSize: config.pageSize
            },
            dataType: "json",
            success: function (response) {
              // console.log(response)
              if (response.status) {
                var count;
                var data = response.data;
                var page = response.page;
                var pageSize = response.pageSize;
                if (page === 1)
                count = page;
                else count = (page - 1) * pageSize + 1;
                self.events = response.data;
                // console.log(self.events)

                AddUserToLevelController.pagingKPILevel(response.total, function () {
                  AddUserToLevelController.LoadDataUser("", code, levelID);
                }, changePageSize);
                AddUserToLevelController.registerEvent();
              }
            },
            error: function (err) {
              // console.log(err);
            }
          });
        },
        pagingKPILevel: function (totalRow, callback, changePageSize) {
          var totalPage = Math.ceil(totalRow / config.pageSize);
          //Unbind pagination if it existed or click change pagesize
          if ($('#paginationKPILevel a').length === 0 || changePageSize === true) {
            $('#paginationKPILevel').empty();
            $('#paginationKPILevel').removeData("twbs-pagination");
            $('#paginationKPILevel').unbind("page");
          }

          $('#paginationKPILevel').twbsPagination({
            totalPages: totalPage === 0 ? 1 : totalPage,
            first: "First",
            next: "Next",
            last: "Last",
            prev: "Previous",
            visiblePages: 10,
            onPageClick: function (event, page) {
              config.pageIndex = page;
              setTimeout(callback, 500);
            }
          });
        },
        loadTree: function () {
          $.ui.fancytree.getTree("#treetable").reload().done();
        },
        updateUser: function(id = 0,levelid = 0) {
          
          // var mObj = {
          //   id: id,
          //   levelid: levelid,
          // };
          HTTP.post("AddUserToLevel/AddUserToLevel", {
            id: id,
            levelid: levelid
          }).then(r => {
            console.log(r);
            if (r) {
              swal.fire({
                title: "Success!",
                text: "Update successfully!",
                type: "success"
              });
            }
          });
          // $.ajax({
          //   url: "https://localhost:44309/AddUserToLevel/AddUserToLevel",
          //   data: JSON.stringify(mObj),
          //   type: "POST",
          //   contentType: "application/json;charset=utf-8",
          //   dataType: "json",
          //   success: function (result) {
          //     if (result) {
          //       swal.fire({
          //         title: "Success!",
          //         text: "Update successfully!",
          //         type: "success"
          //       });
          //     }
          //   },
          //   error: function (errormessage) {
          //     // console.log(errormessage);
          //   }
          // });
        },
      }
    }
  }
};
</script>