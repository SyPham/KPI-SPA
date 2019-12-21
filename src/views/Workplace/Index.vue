<template>
  <div>
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#/home">Home</a>
      </li>
      <li class="breadcrumb-item active">KPI OC</li>
    </ol>

    <div class="row" style="display:none">
      <div class="col-md-12">
        <div class="box box-widget">
          <div class="box-header with-border">
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal-group"
              class="btn pull-right btn-microsoft btn-upload"
            >
              <i class="fa fa-upload"></i> Upload File
            </button>
            <h3 class="box-title font-weight-bold">To do list</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body table-responsive no-padding">
            <table class="table table-hover table-bordered" id="tableWorkplace">
              <thead>
                <tr>
                  <th style="width: 10px">#</th>
                  <th>KPI Name</th>
                  <th class="text-center">State Upload Week</th>
                  <th class="text-center">State Upload Month</th>
                  <th class="text-center">State Upload Quarter</th>
                  <th class="text-center">State Upload Year</th>
                </tr>
              </thead>
              <tbody class="tbody"></tbody>
            </table>
            <script id="tableWorkplace-template" type="text/template">
                <tr 1>
                    <td>1</td>
                    <td>
                        <strong>1</strong>
                    </td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            </script>
          </div>
          <!-- /.box-body -->
          <div class="box-footer clearfix">
            <p class="pull-left total"></p>
            <ul id="paginationWorkplace" class="pagination pagination-sm no-margin pull-right">
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

    <div class="row">
      <div class="col-md-12">
        <div class="box box-widget" id="boxActionPlan">
          <div class="box-header with-border kpi-name">
            <h3
              class="box-title pull-left font-weight-bold"
              style="margin-right: 10px;"
            >To Do List&#32;&#32;</h3>
            <div class="form-group">
              <select id="role" class="form-control role" style="width:200px">
                <option value>N/A</option>
                <option value="Man">Manager</option>
                <option value="Own">Owners</option>
                <option value="Upd">Updater</option>
                <option value="Spo">Sponsor</option>
                <option value="Par">Participant</option>
              </select>
            </div>
          </div>
          <div class="box-body">
            <div class="box-body">
              <table class="table table-condensed table-bordered">
                <thead>
                  <tr>
                    <th style="width: 10px">No.</th>
                    <th>KPI name</th>
                    <th>Task name</th>
                    <th>PIC</th>
                    <th>Descriptions</th>
                    <th>Due date</th>
                    <th>Update shedule date</th>
                    <th>Actual finish date</th>
                    <th>Status</th>
                    <th class="Approval" style="width: 100px">Approve</th>
                  </tr>
                </thead>
                <tbody
                  v-for="(item,key,index) in list1"
                  :key="index"
                  class="tblActionPlan"
                  id="tblActionPlan"
                >
                  <tr>
                    <td>{{key+1}}</td>
                    <td class="text-center">{{item.KPIName}}</td>
                    <td class="text-center">{{item.TaskName}}</td>
                    <td class="text-center">{{item.PIC}}</td>
                    <td class="text-center">{{item.Description}}</td>
                    <td class="text-center">{{item.DueDate}}</td>
                    <td
                      class="text-center"
                    >{{item.UpdateSheduleDate.length === 0 ? "#N/A" : item.UpdateSheduleDate}}</td>
                    <td
                      class="text-center"
                    >{{item.ActualFinishDate.length === 0 ? "#N/A" : item.ActualFinishDate}}</td>
                    <td class="text-center">
                      <span v-if="item.Status == true" class="badge bg-green">Finished</span>
                      <span v-else class="badge bg-red">Not Finished</span>
                    </td>
                    <td class="text-center">
                      <span v-if="item.Approved == true" class="badge bg-green">Approved</span>
                      <span v-else class="badge bg-red">Not Approved</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix">
              <ul id="paginationActionPlan" class="pagination pagination-sm no-margin pull-right">
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
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="box box-widget" id="boxActionPlan">
          <div class="box-header with-border kpi-name">
            <button
              type="button"
              data-toggle="modal"
              data-target="#modal-group"
              class="btn pull-right btn-microsoft btn-upload"
            >
              <i class="fa fa-upload"></i> Upload File
            </button>

            <h3
              style="margin-right: 10px;"
              class="box-title pull-left font-weight-bold"
            >To Do List&#32;&#32;</h3>
            <div class="form-group">
              <select id="role" class="form-control task" style="width:200px">
                <option value>N/A</option>
                <option value="Upd">Updater</option>
              </select>
            </div>
          </div>

          <div class="box-body">
            <table class="table table-condensed table-bordered">
              <thead>
                <tr>
                  <th style="width: 10px">No.</th>
                  <th>KPI name</th>
                  <th>Status Weekly</th>
                  <th>Status Monthly</th>
                  <th>Status Quarterly</th>
                  <th>Status Yearly</th>
                </tr>
              </thead>
              <tbody v-for="(item2,key,index) in list2" :key="index" class="tblKPIUpload" id="tblKPIUpload" >
                <tr>
                  <td>{{key+1}}</td>
                  <td >{{item2.KPIName}}</td>
                  <td class="text-center">
                      <span v-if="item2.StateDataW == true && item2.StateW == true" class="badge bg-green" >on time</span>
                      <span v-else-if="item2.StateDataW == true && item2.StateW == false" class="badge bg-red" >late</span>
                      <span v-else class="badge bg-gray" >N/A</span>
                  </td>
                  <td class="text-center">
                      <span v-if="item2.StateDataM == true && item2.StateM == true" class="badge bg-green" >on time</span>
                      <span v-else-if="item2.StateDataM == true && item2.StateM == false" class="badge bg-red">late</span>
                      <span v-else class="badge bg-gray" >N/A</span>
                  </td>
                  <td >
                      <span v-if="item2.StateDataQ == true && item2.StateQ == true" class="badge bg-green" >on time</span>
                      <span v-else-if="item2.StateDataQ == true && item2.StateQ == false" class="badge bg-red" >late</span>
                      <span v-else class="badge bg-gray" >N/A</span>
                  </td>
                  <td >
                      <span v-if="item2.StateDataY == true && item2.StateY == true" class="badge bg-green" >on time</span>
                      <span v-else-if="item2.StateDataY == true && item2.StateY == false" class="badge bg-red" >late</span>
                      <span v-else class="badge bg-gray" >N/A</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
          <div class="box-footer clearfix">
            <ul id="paginationKPIUpload" class="pagination pagination-sm no-margin pull-right">
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

    <div class="row">
      <div class="col-md-4">
        <div class="box box-widget">
          <div class="box-header">
            <span style="font-size:18px;font-weight:bold">Organization Chart</span>

            <div class="pull-right box-tools">
              <!-- button with a dropdown -->
              <button type="button" class="btn btn-warning btn-sm fancy-collapse">
                <i class="fa fa-compress"></i> Collapse
              </button>
              <button type="button" class="btn btn-info btn-sm fancy-expand">
                <i class="fa fa-expand"></i> Expand
              </button>
            </div>
          </div>
          <div class="box-body">
            <table
              id="treetable"
              class="table table-condensed table-hover table-striped fancytree-fade-expander fancytree-colorize-selected"
            >
              <thead>
                <tr>
                  <th>Level Number</th>
                  <th class="text-right">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center"></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="box box-widget" id="box">
          <div class="box-header with-border kpi-name">
            <h3 class="box-title pull-left font-weight-bold">Performance</h3>
            <span class="id" style="display:none"></span>
            <span class="code" style="display:none"></span>
            <span class="level" style="display:none"></span>
            <input
              class="form-control pull-right"
              autocomplete="off"
              placeholder="search here..."
              style="width:50%"
            />
          </div>
          <div class="box-body">
            <div class="box-body">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>KPI Name</th>
                    <th>State Upload Week</th>
                    <th>State Upload Month</th>
                    <th>State Upload Quarter</th>
                    <th>State Upload Year</th>
                  </tr>
                </thead>
                <tbody
                  v-for="(item,key,index) in data"
                  :key="index"
                  class="tbody-tbluser"
                  id="tbluser"
                >
                  <tr>
                    <td>{{key+1}}</td>
                    <td class="text-center">{{item.KPIName}}</td>
                    <td class="text-center">
                      <span v-if="item.StateDataW == true && item.StateW == true" class="badge bg-green" >on time</span>
                      <span v-if="item.StateDataW == true && item.StateW == false" class="badge bg-red" >late</span>
                      <span v-if="item.StateDataW == false && item.StateW == false" class="badge bg-gray" >N/A</span>
                    </td>
                    <td class="text-center">
                      <span v-if="item.StateDataM == true && item.StateM == true" class="badge bg-green" >on time</span>
                      <span v-if="item.StateDataM == true && item.StateM == false" class="badge bg-red">late</span>
                      <span v-if="item.StateDataM == false && item.StateM == false" class="badge bg-gray" >N/A</span>
                    </td>
                    <td class="text-center">
                      <span v-if="item.StateDataQ == true && item.StateQ == true" class="badge bg-green" >on time</span>
                      <span v-if="item.StateDataQ == true && item.StateQ == false" class="badge bg-red" >late</span>
                      <span v-if="item.StateDataQ == false && item.StateQ == false" class="badge bg-gray" >N/A</span>
                    </td>
                    <td class="text-center">
                      <span v-if="item.StateDataY == true && item.StateY == true" class="badge bg-green" >on time</span>
                      <span v-if="item.StateDataY == true && item.StateY == false" class="badge bg-red" >late</span>
                      <span v-if="item.StateDataY == false && item.StateY == false" class="badge bg-gray" >N/A</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal fade" id="modal-group" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Upload </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="box-body" id="Upload">
                        <p class="text-red">*Notice: Excel file must be followed a system template. If you do not have a template, please <a @click="downloadExcel" class="download btn btn-sm bg-success">click here </a>to download. Thank you!</p>
                        <form @submit.prevent="uploadExcel" id="upload" method="post" enctype="multipart/form-data">
                            <div class="form-group">
                                <label for="Upload">Upload file: </label>

                                <div class="input-group">
                                    <input type="file" class="form-control UploadedFile" name="UploadedFile" id="UploadedFile" placeholder="Upload file">
                                    <span class="input-group-btn">
                                        <button  type="submit" class="btn btn-success btn-flat btnUpload" id="btnUpload"><i class="fa fa-upload"></i> Upload file</button>
                                    </span>
                                </div>
                                <!-- /.input group -->
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>

    <!-- endmodal -->
  </div>
</template>
<script>
import { HTTP } from "../../http-constants";
import VueJwtDecode from "vue-jwt-decode";
import Paginate from "vuejs-paginate";
export default {
  data() {
    return {
      data: [],
      list1: [],
      list2: [],
      totalPage: 0,
      page: 1,
      skip: 0,
      pageSize: 10
    };
  },
  components: {
    Paginate
  },
  created() {
    let seft = this;
    seft.LoadAll();
  },
  methods: {
    uploadExcel(){
        $("form#upload").submit(function (e) {
            console.log(e)
            e.preventDefault();
            console.log("Import data");
            let formData = new FormData(this);
            console.log(formData)
            var upload = function () {
                HTTP.post("https://localhost:44309/Workplace/Import",{
                     data: formData
                }).then(res=>{
                    if (res) {
                        $('#main-loading-delay').hide();
                        success('Upload successfully!');

                    } else {
                        $('#main-loading-delay').hide();
                        error('Upload failed!');
                    }
                })
            }
            upload();
        });
    },
    downloadExcel(){
         $('#Upload .download').click(function () {
             
            console.log("click download");
            // HTTP.get("http://10.4.4.224:98/Workplace/ExcelExport/"+VueJwtDecode.decode(localStorage.getItem("authToken")).nameid)
            window.location.href = "http://10.4.4.224:98/Workplace/ExcelExport/"+VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
           
        });
    },
    LoadAll() {
      let seft = this;

      var glyph_opts = {
        preset: "bootstrap3",
        map: {}
      };
      var config = {
        pageSize: 6,
        pageIndex: 1
      };

      var workplaceConfig = {
        pageSize: 6,
        pageIndex: 1
      };
      var workplaceTrackConfig = {
        pageSize: 6,
        pageIndex: 1
      };
      function logEvent(event, data, msg) {
        msg = msg ? ": " + msg : "";
        $.ui.fancytree.info(
          "Event('" + event.type + "', node=" + data.node + ")" + msg
        );
      }

      $(document).ready(function() {
        workplaceController.init();
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
            url:
              "https://localhost:44309/KPI/GetListTreeClient/" +
              VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
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
            //logEvent(event, data, ", targetType=" + data.targetType);

            $("#box .kpi-name h3").text("Performance - " + data.node.title);
            $("#box .kpi-name .code").text(data.node.key);
            //$('#tbluser tr td:nth-child(2)').data('teamid',data.node.title);
            var levelid = data.node.key;
            console.log("Id of level is " + levelid);
            workplaceController.TrackKPI("", levelid);

            $("html, body").animate(
              {
                scrollTop: $("#box").offset().top
              },
              500
            );
            // return false to prevent default behavior (i.e. activation, ...)
            //return false;
          },
          lazyLoad: function(event, data) {
            data.result = {
              url:
                "https://localhost:44309/KPI/GetListTreeClient/" +
                VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
              debugDelay: 1000
            };
          },
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
      var workplaceController = {
        init() {

          workplaceController.registerEvent();
        },
        registerEvent() {
          $("#boxActionPlan .role")
            .off("change")
            .on("change", function(e) {
              workplaceController.loadActionPlan();
            });
          $("#boxActionPlan .task")
            .unbind()
            .on("change", function(e) {
              if ($(this).val() === "Upd") {
                $("#tblKPIUpload").show();
                workplaceController.listKPIUpload();
              } else {
                $("#tblKPIUpload").hide();
              }
            });

          $("#box input")
            .off("keypress")
            .on("keypress", function(e) {
              if (e.which === 13) {
                var code = $(this).val();
                var teamid = Number($("#box .kpi-name .code").text());
                workplaceController.LoadDataUser(true, code, "");
              }
            });

          //-----------------------------------------------------------------------------------------------------------------
          ////show list kpilevel
          //$('#box select').off('change').on('change', function (e) {
          //    var code = $(this).parent().children('.code').text();
          //    workplaceController.LoadDataUser(true, code);
          //});

          $("#tbluser tr td:nth-child(2) input").change(function() {
            var id = $(this)
              .parent()
              .parent("td:nth-child(2)")
              .children("div")
              .children("span.level")
              .data("id");
            var teamid = Number($("#box .kpi-name .code").text());
            if (teamid === 0) {
              error("Please choose team!");
            } else {
              workplaceController.updateUser(id, teamid);
              workplaceController.loadTree();
            }
          });
        },
        loadActionPlan(changePageSize) {
          var role = $("#boxActionPlan .role").val();
          $.get(
            "https://localhost:44309/Workplace/loadActionPlan",
            {
              role: role,
              page: config.pageIndex,
              pageSize: config.pageSize
            },
            function(res) {
              console.log(res);

              if (res.status) {
                // var data = res.data;
                var total = res.total;
                var page = res.page;
                var count;
                var pageSize = res.pageSize;
                seft.list1 = res.data;
                console.log("seft.list1");
                console.log(seft.list1);
                workplaceController.actionPlanPaging(
                  total,
                  function() {
                    workplaceController.loadActionPlan(true);
                  },
                  changePageSize
                );
                workplaceController.registerEvent();
              } else {
              }
            }
          );
        },
        TrackKPI(changePageSize, levelid) {
          var config = {
            pageSize: 6,
            pageIndex: 1
          };

          $.get(
            "https://localhost:44309/Workplace/KPIRelated",
            {
              levelid: levelid,
              page: config.pageIndex,
              pageSize: config.pageSize
            },
            function(res) {
              if (res.status) {
                var total = res.total;
                var page = res.page;
                var count;
                var pageSize = res.pageSize;
                seft.data = res.model;
                console.log(seft.data);
                workplaceController.TrackKPIPaging(
                  total,
                  function() {
                    workplaceController.TrackKPI("", levelid);
                  },
                  changePageSize
                );
                workplaceController.registerEvent();
              } else {
              }
            }
          );
        },
        TrackKPIPaging(totalRow, callback, changePageSize) {
          var config = {
            pageSize: 6,
            pageIndex: 1
          };
          var totalPage = Math.ceil(totalRow / config.pageSize);
          //Unbind pagination if it existed or click change pagesize
          if (
            $("#paginationKPILevel a").length === 0 ||
            changePageSize === true
          ) {
            $("#paginationKPILevel").empty();
            $("#paginationKPILevel").removeData("twbs-pagination");
            $("#paginationKPILevel").unbind("page");
          }

          $("#paginationKPILevel").twbsPagination({
            totalPages: totalPage === 0 ? 1 : totalPage,
            first: "First",
            next: "Next",
            last: "Last",
            prev: "Previous",
            visiblePages: 10,
            onPageClick: function(event, page) {
              config.pageIndex = page;
              setTimeout(callback, 500);
            }
          });
        },
        actionPlanPaging(totalRow, callback, changePageSize) {
          var totalPage = Math.ceil(totalRow / config.pageSize);

          //Unbind pagination if it existed or click change pagesize
          if (
            $("paginationActionPlan a").length === 0 ||
            changePageSize === true
          ) {
            $("paginationActionPlan").empty();
            $("paginationActionPlan").removeData("twbs-pagination");
            $("paginationActionPlan").unbind("page");
          }

          $("#paginationActionPlan").twbsPagination({
            totalPages: totalPage === 0 ? 1 : totalPage,
            first: "First",
            next: "Next",
            last: "Last",
            prev: "Previous",
            visiblePages: 10,
            onPageClick: function(event, page) {
              config.pageIndex = page;
              setTimeout(callback, 500);
            }
          });
        },
        listKPIUpload(changePageSize) {
          HTTP.get(
            `Workplace/ListKPIUpload/${config.pageIndex}/${config.pageSize}`
          ).then(res => {
            if (res.data.status) {
              if (!res.data.isUpdater) {
                warning("You are not an updater!");
              }
              console.log("listKPIUpload");
              console.log(res);
              var data = res.data.data;
              var total = res.data.total;
              var page = res.data.page;
              console.log(total)
              console.log(page)
              var count;
              var pageSize = res.pageSize;
              seft.list2 = res.data.data
              console.log(seft.list2)
              workplaceController.listKPIUploadPaging(
                total,
                function() {
                  workplaceController.listKPIUpload();
                },
                changePageSize
              );
              workplaceController.registerEvent();
            } else {
            }
          });
        },
        listKPIUploadPaging(totalRow, callback, changePageSize) {
          var totalPage = Math.ceil(totalRow / config.pageSize);

            //Unbind pagination if it existed or click change pagesize
            if ($('paginationKPIUpload a').length === 0 || changePageSize === true) {
                $('paginationKPIUpload').empty();
                $('paginationKPIUpload').removeData("twbs-pagination");
                $('paginationKPIUpload').unbind("page");
            }

            $('#paginationKPIUpload').twbsPagination({
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
        }
      };
   
      workplaceController.init();
    }
  }
};
</script>