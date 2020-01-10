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
            <li class="breadcrumb-item active">OC Category KPI</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="callout bg-yellow-gradient" style="border-color:#c57901">
        <h3>6. OC Category KPI</h3>
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
      
      <!-- <modal-oc></modal-oc> -->

      <!-- categorylist -->
      <div class="box" id="boxCategory">
        <div class="box-header with-border kpi-name">
          <h3 style="font-size:18px" class="box-title pull-left">Category lists</h3>
          <span class="id" style="display:none"></span>
          <span class="code" style="display:none"></span>
          <span class="level" style="display:none"></span>
          <input type="text" class="form-control levelID" style="display:none" />
          <!-- <select class="form-control pull-right" style="width:50%"></select> -->
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
              <tbody v-for="(item,key,index) in events" :key="index" class="tbody" id="tblCategory">
                <tr tabindex="0" :data-id="item.ID">
                  <td class="text-center">{{key+1}}</td>
                  <td>{{item.Name}}</td>
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
      <!-- endcategorylist -->

      <hr>

      <!-- kpilevellist -->
      <div class="box " id="box" style="display:none">
        <div class="box-header with-border kpi-name">
            <h3 class="box-title pull-left">KPI OC </h3>
            <span class="id" style="display:none"></span>
            <span class="code" style="display:none"></span>
            <span class="level" style="display:none"></span>
            <input type="text" class="form-control catid" value="" style="display:none" />
            <input type="text" class="form-control levelid" value="" style="display:none" />
        </div>
        <div class="box-body">

          <div class="box-body">
            <table class="table table-striped">
              <thead>
                  <tr>
                    <th>#</th>
                    <th>KPI Organization Chart</th>
                    <th>Period</th>
                  </tr>
              </thead>
              <tbody v-for="(item,key,index) in dataKPILV" :key="index" class="tbody" id="tblkpilevel">
                <tr :data-id="item.ID" >
                  <td>{{key+1}}</td>
                  <td>
                    <div class="tooltip-css ">
                      <div class="pretty p-icon p-rotate ">
                        <input v-if="item.CheckCategory == true" type="checkbox"  class="checkbox kpilevelID" name="checkbox" checked />
                        <input v-else type="checkbox"  class="checkbox kpilevelID" name="checkbox"  />
                        <div class="state p-success textOverflow">
                            <i class="icon fa fa-check"></i>
                            <label class="black labelOverflow">{{item.KPIName}}</label>
                        </div>
                      </div>
                      <div class="top"> {{item.KPIName}}<i></i></div>
                    </div>
                  </td>
                  <td>
                    <!-- button Weekly -->

                    <button v-if="item.WeeklyChecked === true && (item.StatusUploadDataW === true && item.StatusEmptyDataW === true)" :data-kpilevelcode="item.KPILevelCode" data-period="W" :class='item.WeeklyChecked === true ? (item.StatusUploadDataW === true ? "btn btn-sm btn-success week" : (item.StatusEmptyDataW === true ? "btn btn-sm btn-warning week" : "btn btn-sm btn-success week")) : "btn btn-sm bg-navy week"'   ><i class="fas fa-chart-bar"></i> Weekly</button>
                    <button v-if="item.WeeklyChecked === true && item.StatusUploadDataW === false " :data-kpilevelcode="item.KPILevelCode" data-period="W" :class='item.WeeklyChecked === true ? (item.StatusUploadDataW === true ? "btn btn-sm btn-success week" : (item.StatusEmptyDataW === true ? "btn btn-sm btn-warning week" : "btn btn-sm btn-success week")) : "btn btn-sm bg-navy week"'   ><i class="fas fa-chart-bar"></i> Weekly</button>
                    <button v-else :data-kpilevelcode="item.KPILevelCode" data-period="W"  disabled class="btn btn-sm bg-navy  week" ><i class="fas fa-chart-bar"></i> Weekly</button>                  
                    <!-- button Monthly -->
                    <button v-if="item.MonthlyChecked === true && (item.StatusUploadDataM === true && item.StatusEmptyDataM === true)" :data-kpilevelcode="item.KPILevelCode" data-period="M" :class='item.MonthlyChecked === true ? (item.StatusUploadDataM === true ? "btn btn-sm btn-success month" : (item.StatusEmptyDataM === true ? "btn btn-sm btn-warning month" : "btn btn-sm btn-success month")) : "btn btn-sm bg-navy month"' ><i class="fas fa-chart-bar"></i> Monthly</button>
                    <button v-else-if="item.MonthlyChecked === true && item.StatusUploadDataM === false " :data-kpilevelcode="item.KPILevelCode" data-period="M"  :class='item.MonthlyChecked === true ? (item.StatusUploadDataM === true ? "btn btn-sm btn-success month" : (item.StatusEmptyDataM === true ? "btn btn-sm btn-warning month" : "btn btn-sm btn-success month")) : "btn btn-sm bg-navy month"' ><i class="fas fa-chart-bar"></i> Monthly</button>
                    <button v-else :data-kpilevelcode="item.KPILevelCode" data-period="M" disabled   class="btn btn-sm bg-navy month"><i class="fas fa-chart-bar"></i> Monthly</button>

                    <!-- button Quarterly -->
                    <button v-if="item.QuarterlyChecked === true && (item.StatusUploadDataQ === true && item.StatusEmptyDataQ === true)" :data-kpilevelcode="item.KPILevelCode" data-period="Q" :class='item.MonthlyChecked === true ? (item.StatusUploadDataM === true ? "btn btn-sm btn-success month" : (item.StatusEmptyDataM === true ? "btn btn-sm btn-warning quarter" : "btn btn-sm btn-success quarter")) : "btn btn-sm bg-navy quarter"' ><i class="fas fa-chart-bar"></i> Quarterly</button>
                    <button v-else-if="item.QuarterlyChecked === true && item.StatusUploadDataQ === false " :data-kpilevelcode="item.KPILevelCode" data-period="Q"  :class='item.QuarterlyChecked === true ? (item.StatusUploadDataQ === true ? "btn btn-sm btn-success month" : (item.StatusEmptyDataQ === true ? "btn btn-sm btn-warning month" : "btn btn-sm btn-success quarter")) : "btn btn-sm bg-navy quarter"' ><i class="fas fa-chart-bar"></i> Quarterly</button>
                    <button v-else :data-kpilevelcode="item.KPILevelCode" data-period="Q" disabled   class="btn btn-sm bg-navy quarter"><i class="fas fa-chart-bar"></i> Quarterly</button>
                    <!-- button Yearly -->

                    <button v-if="item.YearlyChecked === true && (item.StatusUploadDataY === true && item.StatusEmptyDataY=== true)" :data-kpilevelcode="item.KPILevelCode" data-period="Y" :class='item.MonthlyChecked === true ? (item.StatusUploadDataM === true ? "btn btn-sm btn-success year" : (item.StatusEmptyDataM === true ? "btn btn-sm btn-warning year" : "btn btn-sm btn-success year")) : "btn btn-sm bg-navy year"' ><i class="fas fa-chart-bar"></i> Yearly</button>
                    <button v-else-if="item.YearlyChecked === true && item.StatusUploadDataY === false " :data-kpilevelcode="item.KPILevelCode" data-period="Y"  :class='item.YearlyChecked === true ? (item.StatusUploadDataY === true ? "btn btn-sm btn-success year" : (item.StatusEmptyDataY === true ? "btn btn-sm btn-warning year" : "btn btn-sm btn-success year")) : "btn btn-sm bg-navy year"' ><i class="fas fa-chart-bar"></i> Yearly</button>
                    <button v-else :data-kpilevelcode="item.KPILevelCode" data-period="Y" disabled   class="btn btn-sm bg-navy year"><i class="fas fa-chart-bar"></i> Yearly</button>
                </td>
              </tr>
            </tbody> 
          </table>
        </div>
            <!-- /.box-body -->
        </div>
        <div class="box-footer clearfix">
            <ul id="paginationKPILevel" class="pagination pagination-sm no-margin pull-right">
                <li><a href="#">«</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">»</a></li>
            </ul>
        </div>
      </div>
      <!-- endkpilevellist -->

      <!-- modal -->
      <listoc></listoc>
      <!-- endmodal -->
    </div>
  </div>
</template>

<script>
// import { HTTP } from "../../http-constants";
// import listoc from "../../components/adminOC/List"
import Hierarchy from "../../components/adminOC/Hierarchy";
import listoc from "../../components/AdminOCCategoryKpi/Modal";
export default {
  name: "IndexKpi",
  data() {
    return {
      events: [],
      dataKPILV:[]
      // test: "A"
    };
  },
  components: {
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

      $("#box").hide();

      $(function() {
        let seft = this;
        categoryKPILevelAdmin.init();
        setTimeout(function(){
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
            source: { url: "http://10.4.4.224:98/AdminKPILevel/GetListTree", debugDelay: 1000 },
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
              // event.preventDefault();
              $("#box").hide();
              $('#boxCategory tr').off('focus').on('focus', function () {
                  $('#boxCategory tr').removeClass('trfocus');
              })
              logEvent(event, data, ", targetType=" + data.targetType);
              var node = data.node,
              $tdList = $(node.tr).find(">td");
              var level = $tdList.eq(0).text();
              var name = $tdList.eq(1).text();
              $('#boxCategory .kpi-name h3').text('Category list - ' + name);
              categoryKPILevelAdmin.getAllCategories(true, level,data.node.key)
              logEvent(event, data, ", targetType=" + data.targetType);
                //categoryKPILevelAdmin.loadDataKPILevel(true,data.node.key)
                //$('#box .kpi-name h3').text('KPI - ' + data.node.title);
                //$('#box .kpi-name .code').text(data.node.key);
                // categoryKPILevelAdmin.loadDataKPILevel(true, data.node.key)
                // return false to prevent default behavior (i.e. activation, ...)
                //return false;
  
              $('#boxCategory .levelID').val(data.node.key);
              $("html, body").animate(
              {
                scrollTop: $("#box").offset().top
              },
              500
              );
            },
            // lazyLoad: function (event, data) {
            //     data.result = { url: "/GetListTree", debugDelay: 1000 };
            // },
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
        },500)
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

      let categoryKPILevelAdmin = {
        init: function() {
          categoryKPILevelAdmin.registerEvent();
          categoryKPILevelAdmin.getAllUser();
        },
        registerEvent: function () {
          $('#modal-group-general .btnSaveGeneral').off('click').on('click', function () {
            var entity = {
              kpilevel: $('#modal-group-general .kpilevelInputHidden').val(),
              category: $('#box .catid').val(),
              pic: $('#modal-group-general .PIC .KPILevelSelect2').val().replace(/\@@/g, ",").trim(),
              owner: $('#modal-group-general .Owner .KPILevelSelect2').val().replace(/\@@/g, ",").trim(),
              manager: $('#modal-group-general .ownerManager .KPILevelSelect2').val().replace(/\@@/g, ",").trim(),
              sponsor: $('#modal-group-general .Sponsor .KPILevelSelect2').val().replace(/\@@/g, ",").trim(),
              participant: $('#modal-group-general .Participant .KPILevelSelect2').val().replace(/\@@/g, ",").trim()
            }
            categoryKPILevelAdmin.addGeneral(entity);
          });

          $('#box .kpilevelID').off('click').on('click', function () {
            var kpilevel = $(this).closest('tr').data('id');
            $('#modal-group-general .kpilevelInputHidden').val(kpilevel);
          });

          $('#boxCategory tr').off('click').on('click', function () {
            $('#box .levelid').val("");
            $('#box .catid').val("")
            var key = $('#boxCategory .levelID').val();
            $('#box .levelid').val(key);
            var catName = $(this).find('td:eq(1)').text();
            $('#box .kpi-name h3').text("OC - " + catName);
            var catID = $(this).data('id');
            $('#box .catid').val(catID)
            $('#box').fadeIn();

            categoryKPILevelAdmin.loadDataKPILevel(true, Number($('#boxCategory .levelID').val()),catID)
          });

          //Focus tr category list
          $('#boxCategory tr').off('focus').on('focus', function () {
            $('#boxCategory tr').removeClass('trfocus');
            $(this).addClass('trfocus');
          })
      

          $('#tbluser tr td:nth-child(2) input').change(function () {
            var id = $(this).parent().parent('td:nth-child(2)').children('div').children('span.level').data('id');
            var levelid = Number($('#box .kpi-name .code').text());
            if (levelid === 0) {
              warning('Please choose team!');
            }
            else {
              categoryKPILevelAdmin.updateUser(id, levelid);
              categoryKPILevelAdmin.loadTree();
            }

          });
          $('.kpilevelID').off('change').on('change', function () {
            var levelID = Number($('#box .levelid').val());
            var entity = {
                KPILevelID: $(this).closest('tr').data('id'),
                CategoryID: Number($('#box .catid').val()),
            };
            categoryKPILevelAdmin.getUserByCategoryIDAndKPILevelID(entity);
            categoryKPILevelAdmin.addCategoryLevel(entity);
            config.pageIndex = Number($('#paginationKPILevel li.active a').text());
              var catid = $('#box .catid').val();
                categoryKPILevelAdmin.loadDataKPILevel(false, levelID,catid);
            if ($(this).is(':checked')) {
                $('#modal-group-general').modal('show').fadeIn(1000);
            }
          })
        },
        updateUser: function (id, levelid) {
          var mObj = {
            id: id,
            levelid: levelid,
          };
          $.ajax({
            url: "https://localhost:44309/AddUserToLevel/AddUserToLevel",
            data: JSON.stringify(mObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
              if (result) {
                Swal.fire({
                  title: 'Success!',
                  text: 'Update successfully!',
                  type: 'success'
                });

              }
            },
            error: function (errormessage) {
              console.log(errormessage);
            }
          });
        },
        addCategoryLevel: function (entity) {
          var entity = {
              KPILevelID: entity.KPILevelID,
              CategoryID: entity.CategoryID
          };
          $.ajax({
              url: "https://localhost:44309//CategoryKPILevelAdmin/Add",
              data: JSON.stringify(entity),
              type: "POST",
              contentType: "application/json;charset=utf-8",
              dataType: "json",
              success: function (result) {
                  console.log(result)
                  if (result) {
                    swal.fire({
                      title: "Success!",
                      text: "Update successfully!",
                      type: "success"
                    });
                  }
              },
              error: function (errormessage) {
                  console.log(errormessage.responseText);
              }
          });
        },
        loadTree: function () {
          $.ui.fancytree.getTree("#treetable").reload().done();
        },
        getAllCategories: function(changePageSize, level, OCID) {
          console.log("getAllCategories");
          $.ajax({
            url: "https://localhost:44309/CategoryKPILevelAdmin/GetAllCategories",
            type: "GET",
            data: {
              OCID: OCID,
              level: level,
              page: config.pageIndex,
              pageSize: config.pageSize
            },
            dataType: "json",
            success: function(r) {
              console.log(r);
              if (r.status) {
                var count = 1;
                var data = r.data;
                var page = r.page;
                var pageSize = r.pageSize;
                if (page === 1) count = page;
                else count = (page - 1) * pageSize;
                self.events = r.data;
                console.log(self.events);
                categoryKPILevelAdmin.pagingCategoryKPILevel(
                  r.total,
                  function() {
                    categoryKPILevelAdmin.getAllCategories("", level, OCID);
                  },
                  changePageSize
                );
                categoryKPILevelAdmin.registerEvent();
              }
            },
            error: function(err) {
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
        loadDataKPILevel: function (changePageSize, level, catid) {
          // debugger
          var category = catid || 0;
          var levelid = level || 0;

          console.log(category)
          console.log(levelid)

          $.ajax({
          url: 'https://localhost:44309/CategoryKPILevelAdmin/LoadDataKPILevel',
          type: "GET",
          data: {
            level: levelid,
            category: category,
            page: config.pageIndex,
            pageSize: config.pageSize
          },
          dataType: "json",
          success: function (r) {
            console.log(r);
            if (r.status) {
                var count = 1;
                var data = r.data;
                var page = r.page;
                var pageSize = r.pageSize;
                if (page === 1) count = page;
                else count = (page - 1) * pageSize + 1;
                self.dataKPILV = r.data;
                console.log(self.dataKPILV);
                categoryKPILevelAdmin.pagingKPILevel(r.total, function () {
                    categoryKPILevelAdmin.loadDataKPILevel(false, level, category);
                }, changePageSize);
                categoryKPILevelAdmin.registerEvent();
              }
            },
            error: function (err) {
                console.log(err);
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
        getAllUser() {
          $.post("https://localhost:44309/AdminKPILevel/GetListAllUser", function (data) {
            var users = [], username, fullname;
            var arrays = data;
            $.each(arrays, function (i, item) {
              users.push({
                username: item.Username,
                fullname: item.FullName
              })
            })

            $('.KPILevelSelect2').suggest('@@', {
              data: users,
              map: function (user) {
                return {
                  value: user.username + '\f',
                  text: '<strong>' + user.username + '  </strong> <small>' + user.fullname + '</small>'
                }
              },
              get: function (index) {
                // console.log(index)
              }

            });
          });
        },
        addGeneral: function (entity) {
          var res = categoryKPILevelAdmin.validate();
          if (res === false) {
            return false;
          }
          var entity = {
            kpilevel: entity.kpilevel,
            category: entity.category,
            pic: entity.pic,
            owner: entity.owner,
            manager: entity.manager,
            sponsor: entity.sponsor,
            participant: entity.participant
          };
          $.ajax({
            url: "https://localhost:44309/CategoryKPILevelAdmin/AddGeneral",
            data: JSON.stringify(entity),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
              console.log(result)
              if (result) {
                swal.fire({
                  title: "Success!",
                  text: "Update successfully!",
                  type: "success"
                });
                categoryKPILevelAdmin.clearForm();
                var key = $('#box .levelid').val();
                var catid = $('#box .catid').val();
                config.pageIndex = Number($('#paginationKPILevel li.active a').text());

                categoryKPILevelAdmin.loadDataKPILevel(false, key, catid);
                $('#modal-group-general').modal('hide');
              }
            },
            error: function (errormessage) {
                console.log(errormessage);
            }
          });
        },
        clearForm() {
          $('#modal-group-general .PIC .KPILevelSelect2').val("");
          $('#modal-group-general .Owner .KPILevelSelect2').val("");
          $('#modal-group-general .ownerManager .KPILevelSelect2').val("");
          $('#modal-group-general .Sponsor .KPILevelSelect2').val("");
          $('#modal-group-general .Participant .KPILevelSelect2').val("");
        },
        validate: function () {
          var isValid = true;
          if ($('#modal-group-general .PIC .KPILevelSelect2').val().trim() === "") {
            $('#modal-group-general .PIC .KPILevelSelect2').css('border-color', 'Red');
            isValid = false;
          }
          else {
            $('#modal-group-general .PIC .KPILevelSelect2').css('border-color', 'lightgrey');
          }

          if ($('#modal-group-general .Owner .KPILevelSelect2').val().trim() === "") {
            $('#modal-group-general .Owner .KPILevelSelect2').css('border-color', 'Red');
            isValid = false;
          }
          else {
            $('#modal-group-general .Owner .KPILevelSelect2').css('border-color', 'lightgrey');
          }

          if ($('#modal-group-general .ownerManager .KPILevelSelect2').val().trim() === "") {
            $('#modal-group-general .ownerManager .KPILevelSelect2').css('border-color', 'Red');
            isValid = false;
          }
          else {
            $('#modal-group-general .ownerManager .KPILevelSelect2').css('border-color', 'lightgrey');
          }

          //if ($('#modal-group-general .Sponsor .KPILevelSelect2').val().trim() === "") {
          //    $('#modal-group-general .Sponsor .KPILevelSelect2').css('border-color', 'Red');
          //    isValid = false;
          //}
          //else {
          //    $('#modal-group-general .Sponsor .KPILevelSelect2').css('border-color', 'lightgrey');
          //}

          //if ($('#modal-group-general .Participant .KPILevelSelect2').val().trim() === "") {
          //    $('#modal-group-general .Participant .KPILevelSelect2').css('border-color', 'Red');
          //    isValid = false;
          //}
          //else {
          //    $('#modal-group-general .Participant .KPILevelSelect2').css('border-color', 'lightgrey');
          //}
          return isValid;
        },
        getUserByCategoryIDAndKPILevelID(entity) {
          $.ajax({
            url: "https://localhost:44309/CategoryKPILevelAdmin/GetUserByCategoryIDAndKPILevelID",
            data: {
                KPILevelID: entity.KPILevelID,
                CategoryID: entity.CategoryID

            },
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (res) {
                console.log(res)
                $('#modal-group-general .PIC .KPILevelSelect2').val(res.Updater);
                $('#modal-group-general .Owner .KPILevelSelect2').val(res.Owner);
                $('#modal-group-general .ownerManager .KPILevelSelect2').val(res.Manager);
                $('#modal-group-general .Sponsor .KPILevelSelect2').val(res.Sponsor);
                $('#modal-group-general .Participant .KPILevelSelect2').val(res.Participant);
            },
            error: function (errormessage) {
                console.log(errormessage.responseText);
            }
          });

        }
      }
    }
  }
};
</script>