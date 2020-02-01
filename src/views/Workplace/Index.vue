<template>
  <div>
    <!-- breadcrumb -->
    <ol class="breadcrumb mt-2" >
      <li class="breadcrumb-item">
        <a href="#/home">Home</a>
      </li>
      <li class="breadcrumb-item active">KPI OC</li>
    </ol>

    <!-- listActionPlan -->
    <div class="row">
      <div class="col-md-12">
        <div class="card " id="boxActionPlan">
          <div class="card-header with-border kpi-name">
            <h3 class="card-title float-left font-weight-bold" style="margin-right: 10px;">
              Action Plan&#32;&#32;
            </h3>
            <div class="box-tools float-right toolActionplan">
              <div class="btn-group" >
                <button type="button" value="true" class="btn btn-success btn-sm button-nocolor Finished" >
                  <i class="fa fa-check"></i> Finished
                </button>
              </div>
              <div class="btn-group">
                <button  type="button" value="false" class="btn btn-danger btn-sm button-nocolor NotFinished">
                  <i class="fa fa-close"></i> Not Finished
                </button>
              </div>
            </div>
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
          <div class="card-body">
            <table class="table table-condensed table-bordered">
              <thead>
                <tr>
                  <th style="width: 10px">No.</th>
                  <th>OC</th>
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
              <tbody v-for="(item, key, index) in list1" :key="index" class="tblActionPlan" id="tblActionPlan">
                <tr>
                  <td>{{ key + 1 }}</td>
                  <td class="text-center">{{ item.OC }}</td>
                  <td class="text-center"><a style="text-decoration: none" :href="item.URL">{{item.KPIName}}</a></td>
                  <td class="text-center">{{ item.TaskName }}</td>
                  <td class="text-center">{{ item.PIC }}</td>
                  <td class="text-center">{{ item.Description }}</td>
                  <td class="text-center">{{ item.DueDate }}</td>
                  <td class="text-center">
                    {{ 
                      (item.UpdateSheduleDate || "").length === 0 ? "#N/A" : item.UpdateSheduleDate
                    }}
                  </td>
                  <td class="text-center">
                    {{
                      (item.ActualFinishDate || "").length === 0 ? "#N/A" : item.ActualFinishDate
                    }}
                  </td>
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
            <!-- /.box-body -->

          </div>
          <div class="card-footer clearfix">
            <small class="text-danger">*Note: Please click "KPI Name" to go to the "Action Plan Page".</small>
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
            :click-handler="changePageActionPlan"
          ></Paginate>
          </div>
        </div>
      </div>
    </div>

    <!-- listKPIUpload -->
    <div class="row">
      <div class="col-md-12">
        <div class="card" id="boxActionPlan">
          <div class="card-header with-border kpi-name">
            <h3 style="margin-right: 10px;" class="card-title float-left font-weight-bold">
              To Do List&#32;&#32;
            </h3>
            <div class="card-tool">
              <button type="button" data-toggle="modal" data-target="#modal-group" class="btn float-right btn-primary btn-upload">
                <i class="fa fa-upload"></i> Upload File
              </button>
            </div>
            <div class="form-group">
              <select id="role" class="form-control task" style="width:200px">
                <option value>N/A</option>
                <option value="Upd">Updater</option>
              </select>
            </div>
          </div>

          <div class="card-body">
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
              <tbody
                v-for="(item2, key, index) in list2"
                :key="index"
                class="tblKPIUpload"
                id="tblKPIUpload"
              >
                <tr>
                  <td>{{ key + 1 }}</td>
                  <td>{{ item2.KPIName }}</td>
                  <td class="text-center">
                    <span
                      v-if="item2.StateDataW == true && item2.StateW == true"
                      class="badge bg-green"
                      >on time</span
                    >
                    <span
                      v-else-if="
                        item2.StateDataW == true && item2.StateW == false
                      "
                      class="badge bg-red"
                      >late</span
                    >
                    <span v-else class="badge bg-gray">N/A</span>
                  </td>
                  <td class="text-center">
                    <span
                      v-if="item2.StateDataM == true && item2.StateM == true"
                      class="badge bg-green"
                      >on time</span
                    >
                    <span
                      v-else-if="
                        item2.StateDataM == true && item2.StateM == false
                      "
                      class="badge bg-red"
                      >late</span
                    >
                    <span v-else class="badge bg-gray">N/A</span>
                  </td>
                  <td>
                    <span
                      v-if="item2.StateDataQ == true && item2.StateQ == true"
                      class="badge bg-green"
                      >on time</span
                    >
                    <span
                      v-else-if="
                        item2.StateDataQ == true && item2.StateQ == false
                      "
                      class="badge bg-red"
                      >late</span
                    >
                    <span v-else class="badge bg-gray">N/A</span>
                  </td>
                  <td>
                    <span
                      v-if="item2.StateDataY == true && item2.StateY == true"
                      class="badge bg-green"
                      >on time</span
                    >
                    <span
                      v-else-if="
                        item2.StateDataY == true && item2.StateY == false
                      "
                      class="badge bg-red"
                      >late</span
                    >
                    <span v-else class="badge bg-gray">N/A</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
          <div class="card-footer clearfix">
            <Paginate
            v-model="page2"
            :page-count="totalPage2"
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
            :click-handler="changePageKPIUpload"
          ></Paginate>
          </div>
        </div>
      </div>
    </div>


    <!-- Organization Chart -->
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <span >Organization Chart</span>
            <div class="float-right box-tools">
              <!-- button with a dropdown -->
              <button type="button" class="btn btn-warning btn-sm fancy-collapse">
                <i class="fas fa-compress-arrows-alt"></i> Collapse
              </button>
              <button type="button" class="btn btn-info btn-sm fancy-expand">
                <i class="fas fa-expand-arrows-alt"></i> Expand
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
                  <th style="width:10px">Level Number</th>
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
        <div class="card" id="box">
          <div class="card-header kpi-name">
            <h3 class="card-title font-weight-bold">Performance</h3>
            <span class="id" style="display:none"></span>
            <span class="code" style="display:none"></span>
            <span class="level" style="display:none"></span>
            <div class="card-tool">
              <input
                class="form-control float-right"
                autocomplete="off"
                placeholder="search here..."
                style="width:50%"
              />
            </div>
          </div>
          <div class="card-body">
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
              <tbody class="tbody-tbluser" id="tbluser">
                <tr v-for="(item, key, index) in data" :key="index">
                  <td>{{ key + 1 }}</td>
                  <td class="text-center">{{ item.KPIName }}</td>
                  <td class="text-center">
                    <span
                      v-if="item.StateDataW == true && item.StateW == true"
                      class="badge bg-green"
                      >on time</span
                    >
                    <span
                      v-if="item.StateDataW == true && item.StateW == false"
                      class="badge bg-red"
                      >late</span
                    >
                    <span
                      v-if="item.StateDataW == false && item.StateW == false"
                      class="badge bg-gray"
                      >N/A</span
                    >
                  </td>
                  <td class="text-center">
                    <span
                      v-if="item.StateDataM == true && item.StateM == true"
                      class="badge bg-green"
                      >on time</span
                    >
                    <span
                      v-if="item.StateDataM == true && item.StateM == false"
                      class="badge bg-red"
                      >late</span
                    >
                    <span
                      v-if="item.StateDataM == false && item.StateM == false"
                      class="badge bg-gray"
                      >N/A</span
                    >
                  </td>
                  <td class="text-center">
                    <span
                      v-if="item.StateDataQ == true && item.StateQ == true"
                      class="badge bg-green"
                      >on time</span
                    >
                    <span
                      v-if="item.StateDataQ == true && item.StateQ == false"
                      class="badge bg-red"
                      >late</span
                    >
                    <span
                      v-if="item.StateDataQ == false && item.StateQ == false"
                      class="badge bg-gray"
                      >N/A</span
                    >
                  </td>
                  <td class="text-center">
                    <span
                      v-if="item.StateDataY == true && item.StateY == true"
                      class="badge bg-green"
                      >on time</span
                    >
                    <span
                      v-if="item.StateDataY == true && item.StateY == false"
                      class="badge bg-red"
                      >late</span
                    >
                    <span
                      v-if="item.StateDataY == false && item.StateY == false"
                      class="badge bg-gray"
                      >N/A</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- /.box-body -->

          </div>
          <div class="card-footer clearfix">
              <Paginate
            v-model="page3"
            :page-count="totalPage3"
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
            :click-handler="changePageTrackKPI"
          ></Paginate>
            </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div class="modal fade" id="modal-group">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Upload</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="box-body" id="Upload">
              <p class="text-red">
                *Notice: Excel file must be followed a system template. If you
                do not have a template, please
                <vs-button @click="downloadExcel" class="download btn btn-sm bg-success">click here </vs-button> to download. Thank you!
              </p>

              <div class="form-group">
                <label for="Upload">Choose file upload: </label>

                <div class="input-group">
                  <input type="file" class="form-control UploadedFile" name="UploadedFile" id="UploadedFile" placeholder="Upload file"/>
                  <span class="input-group-btn">
                    <vs-button @click="uploadData" color="success"  class="btnUpload" id="btnUpload">
                      <i class="fa fa-upload"></i> Upload file
                    </vs-button>
                  </span>
                </div>
                <!-- /.input group -->
              </div>
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
      asd: '',
      status: false,
      data: [],
      list1: [],
      list2: [],

      totalPage: 0,
      page: 1,
      skip: 0,
      pageSize: 6,

      totalPage2: 0,
      page2: 1,
      skip2: 0,
      pageSize2: 6,

      totalPage3: 0,
      page3: 1,
      skip3: 0,
      pageSize3: 6,
      changePageSize: " ",
      url:"http://10.4.4.224:98/Workplace/ExcelExport/" + VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
    };
  },
  components: {
    Paginate
  },
  mounted() {
    let seft = this;
    //seft.getAllNotifications();
    seft.$henryHub.$on("SendMessage", message => {
      debugger;
      console.log("client on");
      console.log(message);
      seft.LoadAll();
      //seft.getAllNotifications();
    });
  },
  created() {
    let seft = this;
    seft.LoadAll();
    
  },
  methods: {
    TrackKPI() {
      let self = this
      var levelid = $("#box .kpi-name .code").text();
      console.log("Id of level is " + levelid);
      axios.get(`http://10.4.4.92:91/Workplace/KPIRelated/${levelid}/${self.page3}/${self.pageSize3}`).then(res => {
        console.log(res);
        if (res.status) {
          self.totalPage3 = res.data.totalPage;
          self.page3 = res.data.page;
          self.pageSize3 = res.data.pageSize;
          self.data = res.data.model;
          console.log(self.data);
          self.registerEvent();
        }
      });
    },
    listKPIUpload() {
      let self = this
      axios.get(`http://10.4.4.92:91/Workplace/ListKPIUpload/${self.page2}/${self.pageSize2}`).then(res => {
        if (res.data.status) {
          if (!res.data.isUpdater) {
            warning("You are not an updater!");
          }
          console.log("listKPIUpload");
          console.log(res);
          self.totalPage2 = res.data.totalPage;
          self.page2 = res.data.page;
          // self.data = res.data.data;
          self.pageSize2 = res.data.pageSize;
          self.list2 = res.data.data;
          console.log(self.list2);
          self.registerEvent();
        } else {
        }
      });
    },
    registerEvent() {
      let self = this
      $("#boxActionPlan .role").off("change").on("change", function(e) {
        $(".toolActionplan").show();
        $('.NotFinished').focus();
        self.loadActionPlan(false,false);
      });

      $("#boxActionPlan .task").unbind().on("change", function(e) {
        if ($(this).val() === "Upd") {
          $("#tblKPIUpload").show();
          self.listKPIUpload();
        } else {
          $("#tblKPIUpload").hide();
        }
      });
      
      $("#box input").off("keypress").on("keypress", function(e) {
        if (e.which === 13) {
          var code = $(this).val();
          var teamid = Number($("#box .kpi-name .code").text());
          workplaceController.LoadDataUser(true, code, "");
        }
      });

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

      $('.NotFinished').off('click').on('click', function (e) {
        //console.log(e.toElement.value)
        //self.loadActionPlan(false,false);
        var role = $("#boxActionPlan .role").val();
        var status =  e.toElement.value;
        axios.get(`http://10.4.4.92:91/Workplace/loadActionPlan/${role}/${self.page}/${self.pageSize}/${status}`).then(res => {
        console.log(res);
        if (res.status) {
            // var data = res.data;
            self.totalPage = res.data.totalPage;
            self.page = res.data.page;
            self.data = res.data.data;
            self.pageSize = res.data.pageSize;
            self.list1 = res.data.data;
            console.log("seft.list1");
            console.log(self.list1);
            self.registerEvent();
          }
        });
      });
      $('.Finished').off('click').on('click', function (e) {
        //console.log(e.toElement.value)
        //self.loadActionPlan(true,true);
        var role = $("#boxActionPlan .role").val();
        var status =  e.toElement.value;
        axios.get(`http://10.4.4.92:91/Workplace/loadActionPlan/${role}/${self.page}/${self.pageSize}/${status}`).then(res => {
        console.log(res);
        if (res.status) {
            // var data = res.data;
            self.totalPage = res.data.totalPage;
            self.page = res.data.page;
            self.data = res.data.data;
            self.pageSize = res.data.pageSize;
            self.list1 = res.data.data;
            console.log("seft.list1");
            console.log(self.list1);
            self.registerEvent();
          }
        });
      });
    },
    loadActionPlan() {
      let self = this
      var role = $("#boxActionPlan .role").val();
      var status =  $(".toolActionplan #aaa").val();
      var status2 =  $(".toolActionplan #aaa2").val();
      console.log(status)
      //console.log(status2)
      axios.get(`http://10.4.4.92:91/Workplace/loadActionPlan/${role}/${self.page}/${self.pageSize}/${self.status}`).then(res => {
        console.log(res);
        if (res.status) {
          // var data = res.data;
          self.totalPage = res.data.totalPage;
          self.page = res.data.page;
          self.data = res.data.data;
          self.pageSize = res.data.pageSize;
          self.list1 = res.data.data;
          console.log("seft.list1");
          console.log(self.list1);
          self.registerEvent();
        }
      });
     
    },
    changePageActionPlan(pageNum) {
      this.loadActionPlan(this.name,pageNum);
    },
    changePageKPIUpload(pageNum) {
      this.listKPIUpload(this.name,pageNum);
    },
    changePageTrackKPI(pageNum) {
      this.TrackKPI(this.name,pageNum);
    },
    forceFileDownload(response){
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'DataUpload.xlsx') //or any other extension
      document.body.appendChild(link)
      link.click()
    },
    downloadExcel(){
      this.$vs.loading()
      setTimeout( ()=> {
        this.$vs.loading.close()
      },2000);
      this.$http({
      method: 'get',
      url: this.url,
      responseType: 'arraybuffer'
      })
      .then(response => {
        this.forceFileDownload(response)
        success("Download successfully!");
        $("#modal-group").modal("hide");
      })
      .catch(() => console.log('error occured'))
    },
    uploadData(e) {
     
      var formData = new FormData();
      var fileUpload = document.querySelector("#UploadedFile");
      formData.append("UploadedFile", fileUpload.files[0]);
      axios.post("Workplace/Import", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (res.status) {
          this.$vs.loading()
          setTimeout( ()=> {
            this.$vs.loading.close();
            success("Upload successfully!");
            $("#modal-group").modal("hide");  
          },2000);
          

        }
      });
    },
    LoadAll() {
      let self = this
      var config = {
        pageSize: 6,
        pageIndex: 1
      };
      let seft = this;
      var glyph_opts = {
        preset: "bootstrap3",
        map: {}
      };
      var config = {
        pageSize: 3,
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
        setTimeout(function(){
          $(".toolActionplan").hide();
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
              url:"http://10.4.4.224:98/KPI/GetListTreeClient/" +VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
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
              //console.log("Id of level is " + levelid);
              self.TrackKPI(levelid);
  
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
                url:"http://10.4.4.224:98/KPI/GetListTreeClient/" +
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
        },300)

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
          self.registerEvent();
        },
        
      };

      workplaceController.init();
    }
  }
};
</script>
<style lang="scss" scope>
.vs-button-success.vs-button-filled {
  background: rgba(var(--vs-success),1)!important;
  height: 40px;
}
</style>
