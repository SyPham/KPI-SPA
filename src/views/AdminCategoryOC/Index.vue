<template>
  <div class="row">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#/home">Home</a></li>
                <li class="breadcrumb-item active">OC Category</li>
              </ol>
            </div>
          </div>
        </div>
    <div class="col-md-12">
        <div class="callout bg-yellow-gradient" style="border-color:#c57901">
            <h3>5. OC Category</h3>
        </div>
    </div>
    <div class="col-md-4">
     <hierarchy></hierarchy>
      <table id="treetable"  class="table table-condensed table-hover table-striped fancytree-fade-expander fancytree-colorize-selected" >
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
      <!-- <listoc></listoc> -->
      <!-- <modal-oc></modal-oc> -->
      <div class="box" id="boxCategory">
        <div class="box-header with-border kpi-name">
          <h3 style="font-size:18px" class="box-title pull-left">Category lists</h3>
          <input type="text" class="form-control ocId" style="display:none" />
        </div>
        <div class="box-body">
          <div class="box-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Level Number</th>
                </tr>
              </thead>
              <tbody v-for="(item,key,index) in OCCategory" :key="index" class="tbody" id="tblCategory">
                <tr tabindex="0" :data-id="item.ID">
                  <td class="text-center">{{key+1}}</td>
                  <td>
                    <div class="pretty p-icon p-rotate ">
                      <input v-if="item.Status == true" type="checkbox" class="addOCCategoryCheckbox" name="checkbox" checked />
                      <input v-else type="checkbox" class="addOCCategoryCheckbox" name="checkbox"  />
                      <div class="state p-success">
                          <i class="icon fa fa-check"></i>
                          <label class="black">{{item.Name}}</label>
                      </div>
                    </div>
                      
                  </td>
                  <td class="text-center">{{item.LevelID}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="box-footer clearfix">
          <ul id="paginationCategoryKPILevel" class="pagination pagination-sm no-margin pull-right">
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
        </div>
      </div>
    </div>


  </div>
</template>

<script>
// import { HTTP } from "../../http-constants";
// import listoc from "../../components/adminOC/List"
import Hierarchy from "../../components/adminOC/Hierarchy"
import listoc from "../../components/adminOC/Modal"
export default {
  name: "IndexKpi",
  data() {
    return {
      OCCategory: [],
      // test: "A"
    };
  },
  components:{
    listoc,
    Hierarchy
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
      $(function() {
        let seft = this;
        ocCategoryAdmin.init();
        $("#treetable").fancytree({
          extensions: ["glyph", "table"],
          checkbox: false,
          selectMode: 2,
          dnd5: {
            preventVoidMoves: true,
            preventRecursion: true,
            autoExpandMS: 400,
            dragStart: function(node, data) {
              return true;
            },
            dragEnter: function(node, data) {
              // return ["before", "after"];
              return true;
            },
            dragDrop: function(node, data) {
              data.otherNode.moveTo(node, data.hitMode);
            }
          },
          glyph: glyph_opts,
          source: {
            url: "https://localhost:44309/OCCategories/GetListTree",
            debugDelay: 1000
          },
          table: {
            indentation: 20,
            nodeColumnIdx: 1
            //checkboxColumnIdx: 0
          },
          gridnav: {
            autofocusInput: false,
            handleCursorKeys: true
          },
          focus: function(event, data) {
            $('#boxCategory tr').off('focus').on('focus', function () {
              $('#boxCategory tr').removeClass('trfocus');
                })
              logEvent(event, data, ", targetType=" + data.targetType);
              var node = data.node,
                  $tdList = $(node.tr).find(">td");
              var level = $tdList.eq(0).text();
              var name = $tdList.eq(1).text();
              $('#boxCategory .kpi-name h3').text('Category list - ' + name);
              console.log(data.node.key)
              ocCategoryAdmin.getCategoryByOC(true, level,data.node.key)
              logEvent(event, data, ", targetType=" + data.targetType);
              $('#boxCategory .ocId').val(data.node.key);

            $("html, body").animate(
              {
                scrollTop: $("#boxCategory").offset().top
              },
              500
            );
            // return false to prevent default behavior (i.e. activation, ...)
            //return false;
          },
          // lazyLoad: function (event, data) {
          //     data.result = { url: "https://localhost:44309/AdminKPILevel/GetListTree", debugDelay: 1000 };
          // },
          renderColumns: function(event, data) {
            var node = data.node,
              $tdList = $(node.tr).find(">td");

            // (Index #0 is rendered by fancytree by adding the checkbox)
            // Set column #1 info from node data:
            // (Index #2 is rendered by fancytree)
            // Set column #3 info from node data:

            $tdList
              .eq(0)
              .addClass("text-bold")
              .text(node.data.levelnumber);
            $tdList
              .eq(1)
              .find("span.fancytree-icon")
              .removeClass("fancytree-icon")
              .addClass("fa fa-book");
            $tdList.eq(1).addClass("text-bold");
            // Static markup (more efficiently defined as html row template):
            // $tdList.eq(3).html("<input type='input' value='" + "" + "'>");
            // ...
          }
        });
        $(".fancy-collapse")
          .off("click")
          .on("click", function() {
            $("#treetable")
              .fancytree("getTree")
              .expandAll(false);
          });
        $(".fancy-expand")
          .off("click")
          .on("click", function() {
            $("#treetable")
              .fancytree("getTree")
              .expandAll();
          });
      });
      let config = {
        pageSize: 6,
        pageIndex: 1
      };
      let ocCategoryAdmin = {
        init: function() {
          ocCategoryAdmin.registerEvent();
        },
        registerEvent: function () {
          $('.addOCCategoryCheckbox').off('click').on('click', function () {
              var ocId = Number($('#boxCategory .ocId').val());
              var catId = Number($(this).closest('tr').data('id'));
              ocCategoryAdmin.addOCCategory(ocId,catId);
          })
        },
        getCategoryByOC: function (changePageSize, level, ocID) {
          console.log("GetCategoryByOC")

          $.ajax({
              url: 'https://localhost:44309/OCCategories/GetCategoryByOC',
              type: "GET",
              data: {
                level: level,
                ocID: ocID,
                page: config.pageIndex,
                pageSize: config.pageSize
              },
              dataType: "json",
              success: function (response) {
                console.log(response)
                if (response.status) {
                  var count = 1;
                  var data = response.data;
                  var page = response.page;
                  var pageSize = response.pageSize;
                  if (page === 1)
                      count = page;
                  else count = (page - 1) * pageSize + 1;
                  self.OCCategory = response.data;
                  console.log(self.OCCategory)
                  ocCategoryAdmin.pagingCategoryKPILevel(response.total, function () {
                      ocCategoryAdmin.getCategoryByOC("", level,ocID);
                  }, changePageSize);
                  ocCategoryAdmin.registerEvent();
                }
              },
              error: function (err) {
                  console.log(err);
              }
          });
        },
        pagingCategoryKPILevel: function (totalRow, callback, changePageSize) {
          var totalPage = Math.ceil(totalRow / config.pageSize);

          //Unbind pagination if it existed or click change pagesize
          if ($('#paginationCategoryKPILevel a').length === 0 || changePageSize === true) {
              $('#paginationCategoryKPILevel').empty();
              $('#paginationCategoryKPILevel').removeData("twbs-pagination");
              $('#paginationCategoryKPILevel').unbind("page");
          }

          $('#paginationCategoryKPILevel').twbsPagination({
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
        addOCCategory: function (ocId, catId) {
          //debugger
          var mObj = {
            OCID: ocId,
            CategoryID: catId,
          };
          $.ajax({
              url: "https://localhost:44309/OCCategories/AddOCCategory",
              data: JSON.stringify(mObj),
              type: "POST",
              contentType: "application/json;charset=utf-8",
              dataType: "json",
              success: function (result) {
                if (result) {
                  swal.fire({
                    title: "Success!",
                    text: "Update successfully!",
                    type: "success"
                  });
                }
              },
              error: function (errormessage) {
              }
          });
        },
        loadTree: function () {
          $.ui.fancytree.getTree("#treetable").reload().done();
        },

      };
    },
    
  }
};
</script>