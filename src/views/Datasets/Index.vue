<template>
  <div class="row">
    <div class="col-md-12"></div>
    <div class="col-md-12">
      <div class="box boxDataset boxdataset-scrollbar">
        <div class="box-header">
          <h3
            v-if="period == 'w'"
            class="box-title"
            style="font-weight:bold"
          >Category - {{categoryname}} - Weekly</h3>
          <h3
            v-if="period == 'm'"
            class="box-title"
            style="font-weight:bold"
          >Category - {{categoryname}} - Monthly</h3>
          <h3
            v-if="period == 'q'"
            class="box-title"
            style="font-weight:bold"
          >Category - {{categoryname}} - Quarterly</h3>
          <h3
            v-if="period == 'y'"
            class="box-title"
            style="font-weight:bold"
          >Category - {{categoryname}} - Yearly</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding" id="tblDataset">
          <div class="col-md-12">
            <!-- @* month *@ -->
            <div class="form-inline" id="searchMonth">
              <label class="my-1 mr-2" for="startMonth">Year</label>
              <select v-model="searchyear" class="custom-select form-control year my-1 mr-sm-2" id="monthOfYear">
                <option value="0" selected>Choose...</option>
                <option
                  v-for="(n, key, index) in 100"
                  :key="index"
                  :value="2000 + n"
                >Year {{2000 + n}}</option>
              </select>
              <label class="my-1 mr-2" for="startMonth">Start</label>
              <select v-model="vstart" class="custom-select form-control my-1 mr-sm-2" id="startMonth">
                <option value="0" selected>Choose...</option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="3">Mar</option>
                <option value="4">Apr</option>
                <option value="5">May</option>
                <option value="6">Jun</option>
                <option value="7">Jul</option>
                <option value="8">Aug</option>
                <option value="9">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
              <label class="my-1 mr-2" for="endMonth">End</label>
              <select v-model="vend" class="custom-select form-control my-1 mr-sm-2" id="endMonth">
                <option value="0" selected>Choose...</option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="3">Mar</option>
                <option value="4">Apr</option>
                <option value="5">May</option>
                <option value="6">Jun</option>
                <option value="7">Jul</option>
                <option value="8">Aug</option>
                <option value="9">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
              <button type="button" class="btn bg-teal margin btnClearSearch">
                <i class="fa fa-remove"></i> Reset search
              </button>
            </div>

            <!-- @* week *@ -->
            <div class="form-inline" style="display:none" id="searchWeek">
              <label class="my-1 mr-2" for="startMonth">Year</label>
              <select class="custom-select form-control year my-1 mr-sm-2" id="weekOfYear">
                <option value="0" selected>Choose...</option>

                <option value="@i">Year</option>
              </select>
              <label class="my-1 mr-2" for="startWeek">Week Start</label>
              <select class="custom-select form-control my-1 mr-sm-2" id="startWeek">
                <option value="0" selected>Choose...</option>

                <option value="@i">Week</option>
              </select>
              <label class="my-1 mr-2" for="endWeek">Week End</label>
              <select class="custom-select form-control my-1 mr-sm-2" id="endWeek">
                <option value="0" selected>Choose...</option>

                <option value="@i">Week</option>
              </select>
              <button type="button" class="btn bg-teal margin btnClearSearch">
                <i class="fa fa-remove"></i> Reset search
              </button>
            </div>

            <!-- @* Quarter *@ -->
            <div class="form-inline" style="display:none" id="searchQuarter">
              <label class="my-1 mr-2" for="startMonth">Year</label>
              <select class="custom-select form-control year my-1 mr-sm-2" id="quarterOfYear">
                <option value="0" selected>Choose...</option>

                <option value="@i">Year</option>
              </select>
              <label class="my-1 mr-2" for="startMonth">Start</label>
              <select class="custom-select form-control my-1 mr-sm-2" id="startQuarter">
                <option value="0" selected>Choose...</option>

                <option value="@i">Quarter</option>
              </select>
              <label class="my-1 mr-2" for="endMonth">End</label>
              <select class="custom-select form-control my-1 mr-sm-2" id="endQuarter">
                <option value="0" selected>Choose...</option>

                <option value="@i">Quarter</option>
              </select>
              <button type="button" class="btn bg-teal margin btnClearSearch">
                <i class="fa fa-remove"></i> Reset search
              </button>
            </div>

            <!-- @* Year *@ -->
            <div class="form-inline" style="display:none" id="searchYear">
              <label class="my-1 mr-2" for="YearOfYear">Year</label>
              <select class="custom-select form-control my-1 mr-sm-2 YearOfYear" id="YearOfYear">
                <option value="0" selected>Choose...</option>

                <option value="@i">Year</option>
              </select>
              <label class="my-1 mr-2" for="startMonth">Start</label>
              <select class="custom-select form-control my-1 mr-sm-2" id="startYear">
                <option value="0" selected>Choose...</option>

                <option value="@i">Year</option>
              </select>
              <label class="my-1 mr-2" for="endMonth">End</label>
              <select class="custom-select form-control my-1 mr-sm-2" id="endYear">
                <option value="0" selected>Choose...</option>

                <option value="@i">Year</option>
              </select>
              <button type="button" class="btn bg-teal margin btnClearSearch">
                <i class="fa fa-remove"></i> Reset search
              </button>
            </div>
          </div>
        </div>
        <div class="box-body table-responsive no-padding" id="tblDataset">
          <div class="col-md-12">
            <table class="table">
              <thead>
                <th class="text-center">KPI</th>
                <th v-for="(item,key,index) in title" :key="index" class="text-center">{{item }}</th>
              </thead>
              <tbody v-for="(item,key,index) in data" :key="index">
                <tr v-if="item.Datasets.length > 0 " class="warning">
                  <td class="text-center">
                    <div class="tooltip-css">
                      {{item.KPIName}}
                      <div class="right">
                        <h4>Category: {{item.CategoryName}}</h4>
                        <p>Manager: {{item.Manager}}</p>
                        <p>Owner: {{item.Owner}}</p>
                        <p>Updater: {{item.Updater}}</p>
                        <p>Sponsor: {{item.Sponsor}}</p>
                        <p>Participant: {{item.Participant}}</p>
                        <i></i>
                      </div>
                    </div>
                  </td>
                  <td
                    v-for="(item2,key,index) in item.Datasets"
                    :key="index"
                    :class="item2.ValueArray[1] === 'True' ? 'datasetTd text-center active-td2'  : 'datasetTd text-center active-td' "
                    @click="opencomment"
                    :data-id="item2.ID"
                  >
                    <div class="tooltip-css">
                      {{item2.ValueArray[0] == 0 ? "N/A" : item2.ValueArray[0]}}
                      <div class="top">
                        <p>{{item.CategoryName}}</p>
                        <p>{{item.Period.substring(0, item.Period.length - 2)}} : {{item2.Week}}</p>
                        <p>Target : {{item2.ValueArray[2] || "#N/A"}}</p>
                        <i></i>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->

      <!-- <comment> -->
      <div class="modal fade modal" id="modal-group-comment-data">
        <div class="modal-dialog modal-lg" style="width:90%">
          <div class="modal-content">
            <div class="modal-header" style="background-color:#00a65a;color:#fff">
              <h4 class="modal-title">
                <i class="fa fa-tags"></i>&#32;
                <span class="RemarkChart"></span>
              </h4>
              <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                <span class="sr-only">Close</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row bootstrap snippets">
                <div class="col-md-12 col-sm-12">
                  <div class="comment-wrapper">
                    <div class="panel panel-info">
                      <div class="panel-body">
                        <span class="dataid" style="display:none"></span>
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            id="comment"
                            placeholder="write a comment..."
                            rows="6"
                          ></textarea>
                        </div>

                        <button
                          @click="addcomment()"
                          type="button"
                          class="btn btn-info pull-right btnComment"
                        >
                          <i class="far fa-paper-plane"></i> Post
                        </button>
                        <div class="clearfix"></div>
                        <hr />
                        <ul class="media-list" id="media-list"></ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
      </div>

      <div class="modal fade modal-window modal" id="modal-group-comment-data2">
        <div class="modal-dialog modal-lg" style="width:95%;overflow-y:scroll">
          <div class="modal-content">
            <div class="modal-header" style="background-color:#00a65a;color:#fff">
              <span class="commentid" style="display:none"></span>

              <h4 class="modal-title">
                <a
                  href="#modal-group-comment-data"
                  data-toggle="modal"
                  data-dismiss="modal"
                  style="color:#fff;cursor:pointer"
                >
                  <i class="fa fa-reply"></i>
                </a>
                &#32;
                <span class="ActionPlanChart"></span>
              </h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link" id="pills-home-tab" data-toggle="pill" href="#pills-home">List</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pills-profile-tab"
                    data-toggle="pill"
                    href="#pills-profile"
                  >Add</a>
                </li>
              </ul>
              <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade" id="pills-home">
                  <div class="listTask">
                    <table class="table table-condensed table-bordered">
                      <thead>
                        <tr>
                          <th style="width: 10px">No.</th>
                          <th>Task name</th>
                          <th>Descriptions</th>
                          <th>PIC</th>
                          <th>Due date</th>
                          <th>Update shedule date</th>
                          <th>Actual finish date</th>
                          <th>Status</th>
                          <th class="Approval" style="width: 100px">Approve</th>
                          <th class="Option" style="width: 50px">Option</th>
                        </tr>
                      </thead>
                      <tbody class="tblActionPlan">
                        <tr>
                          <td>1.</td>
                          <td>To do list</td>
                          <td>
                            <ul>
                              <li>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum.</li>
                              <li>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum.</li>
                              <li>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum.</li>
                              <li>Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum.</li>
                            </ul>
                          </td>
                          <td>swook, peter, henry</td>
                          <td></td>
                          <td></td>
                          <td>20-10-2019</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="tab-pane fade" id="pills-profile">
                  <div class="addTask">
                    <!-- text input -->
                    <div class="form-group">
                      <label>Task name</label>
                      <input
                        type="text"
                        class="form-control Title"
                        autocomplete="off"
                        placeholder="Enter ..."
                      />
                      <!-- <input type="text" class="form-control ID hidden" placeholder="Enter ..."> -->
                    </div>

                    <!-- textarea -->
                    <div class="form-group">
                      <label>Description</label>
                      <div
                        class="editable Description"
                        style="border:1px solid #d2d6de"
                        contenteditable="true"
                      >
                        <ul style="list-style: decimal;padding-left: 20px;">
                          <li></li>
                        </ul>
                      </div>
                    </div>

                    <!-- input states -->
                    <div class="form-group">
                      <label class="control-label" for="Tag">Assign PIC</label>
                      <textarea
                        type="text"
                        class="form-control Tag"
                        id="Tag"
                        rows="1"
                        placeholder="Require ..."
                      ></textarea>
                    </div>
                    <div class="form-group">
                      <label class="control-label" for="Auditor">Auditor</label>
                      <textarea
                        type="text"
                        class="form-control Auditor"
                        id="Auditor"
                        rows="1"
                        placeholder="Optional ..."
                      ></textarea>
                    </div>
                    <!-- radio -->
                    <div class="form-group">
                      <label>Due date</label>
                      <input
                        autocomplete="off"
                        type="text"
                        class="form-control DueDate datepicker"
                        name="datepicker"
                      />
                    </div>
                    <button type="button" class="btn btn-success btnSaveActionPlan">Save</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <a
                href="#modal-group-comment-data"
                data-toggle="modal"
                data-dismiss="modal"
                class="btn btn-primary"
              >Back to remark</a>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
      </div>
      <!-- </comment> -->
    </div>
  </div>
</template>
<script>
import { HTTP } from "../../http-constants";
import VueJwtDecode from "vue-jwt-decode";
export default {
  data() {
    return {
      data: [],
      data2: [],
      title: [],
      period: "",
      datasets: [],
      categoryname: "",
      kpiname: "",
      KPILevelCode: "",
      searchyear: 0,
      vstart: 0,
      vend: 0
    };
  },
  watch: {
      searchyear: function(newOld, oldVal) {
      let seft = this;
      this.$router.replace({
        name: "dataset",
        params: { year: seft.searchyear }
      });
      seft.LoadDataset();
    },
    vstart: function(newOld, oldVal) {
      let seft = this;
      this.$router.replace({ name: "dataset", params: { start: seft.vstart } });
      seft.LoadDataset();
    },
    vend: function(newOld, oldVal) {
      let seft = this;
      this.$router.replace({ name: "dataset", params: { end: seft.vend } });
      seft.LoadDataset();
    }
  },
  created() {
    let seft = this;
    seft.period = seft.$route.params.period;
    seft.start = seft.$route.params.start;
    seft.end = seft.$route.params.end;
    seft.LoadDataset();
  },
  methods: {
    deleteActionPlan(id) {
      let seft = this
      if (Number(id) > 0) {
        $.post('https://localhost:44309/ChartPeriod/Delete', { id: id }, function (res) {
          if (res) {
            var commentid = Number($('.commentid').text());
            var dataid = Number($('.dataid').text());
            seft.LoadDataActionPlan(dataid, commentid);
            success("Successfully!");
          }
        });
      }
    },  
    approval(id) {
      let seft = this
      var data = {
        id: id,
        approveby: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
        KPILevelCode: seft.$route.params.kpilevelcode,
        CategoryID: Number(seft.$route.params.catid)
      }
      var promise = $post("https://localhost:44309/ChartPeriod/Approval", JSON.stringify(data));
      promise.then(res => {
        success("Successfully!")
        var commentid = Number($('.commentid').text());
        var dataid = Number($('.dataid').text());
        seft.LoadDataActionPlan(dataid, commentid);
      })
    },  
    done(id) {
      let seft = this 
      // debugger
      var data = {
        id: id,
        userid: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
        KPILevelCode: seft.$route.params.kpilevelcode,
        CategoryID: Number(seft.$route.params.catid)
      };

      let promise = $post("https://localhost:44309/ChartPeriod/Done", JSON.stringify(data))
      promise.then(data => {
        success("Successfully!")
        var commentid = Number($('.commentid').text());
        var dataid = Number($('.dataid').text());
        seft.LoadDataActionPlan(dataid, commentid);
        // chartperiodController.resetForm();
      })
    }, 
    addcomment() {
      //   debugger
      if ($("#comment").val() == "") {
        warning("Please enter message!!");
        return;
      }
      var CommentMsg = $("#comment").val();

      var list = [];
      for (let item of CommentMsg.split(" ")) {
        let x = item.match(/[@@].+[\f]/g);
        if (x !== null)
          list.push(
            x
              .toString()
              .replace("@@", " ")
              .trim()
          );
      }
      var Tag = [...new Set(list.map(x => x))].join();

      var mObj = {
        DataID: Number($(".dataid").text()),
        CommentMsg: CommentMsg,
        UserID: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
        Tag: Tag,
        Link: window.location.href,
        Title: $(".RemarkChart").text(),
        KPILevelCode: this.KPILevelCode,
        CategoryID: Number(this.$route.params.catid)
      };

      HTTP.post("ChartPeriod/AddComment", mObj)
        .then(data => {
          var res = data.data;
          // console.log(res.status);

          if (res.status == true && res.isSendmail == true) {
            $("#comment").val("");
            success("success!");
            this.loadDataComment();
          } else if (res.status === true && res.isSendmail === false) {
            $("#comment").val("");
            this.loadDataComment();
            warning("Failed sending mail!");
            console.log("Khong gui duoc mail");
          } else {
            warning("error!");
            console.log("Loi roi");
          }
        })
        .catch(error => {
          // console.log(error)
          //error("error!");
          console.log("Loi comment");
        });
    },
    opencomment(e) {
      console.log(e);
      if (e.toElement.classList[2] == "active-td" && "active-td2") {
        $("#modal-group-comment-data").modal("show");
        var id = e.toElement.dataset.id;
        // var kpiname = $(this).closest('tr').children('td:nth-child(3)').text();
        $(".dataid").text(id);
        $(".RemarkChart").text(e.text);
        $(".RemarkChart").text(
          "Remark - " + this.categoryname + " - " + this.period
        );
        // this.remark(id);
        //Khi tao ra table roi thi moi load data
        this.loadDataComment();
      }
    },
    remark(id) {
      HTTP.post("ChartPeriod/Remark", {
        dataid: id
      }).then(r => {
        console.log(r);
        let result = r.data.model;
        var userid = VueJwtDecode.decode(localStorage.getItem("authToken"))
          .nameid;
        var users = [],
          username,
          fullname;
        var arrays = r.data.users;
        $.each(arrays, function(i, item) {
          users.push({
            username: item.Username,
            fullname: item.FullName
          });
        });

        console.log(userid);
        console.log(users);
        console.log(result);
      });
    },
    LoadDataActionPlan(dataid, commentid) {
      let seft = this;
      HTTP.post("ChartPeriod/getall", {
        DataID: dataid,
        CommentID: commentid,
        UserID: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
      }).then(res => {
        console.log(res);
        //  var res = res.data;
        if (res.data.status) {
          var data = res.data.data;
          console.log(data);
          var html = "";
          // debugger
          $.each(data, function(i, item) {
            $(".listTask .Approval").hide();
            $(".listTask .Option").hide();
            console.log(item);

            if (item.CreatedBy || item.Auditor) {
              html += '<tr data-id="' + item.ID + '">';
              html += "<td>" + (i + 1) + "</td>";
              html +=
                '<td class="text-bold" style="padding-left:15px;"><span style="font-weight: 700;cursor: pointer;"  class="TitleEdit" data-url="https://localhost:44309/ChartPeriod/Update" data-type="text" data-name="Title" data-pk="' +
                item.ID +
                '" data-value="' +
                item.Title +
                '" data-title="Enter your title">' +
                item.Title +
                "</span></td>";
              html +=
                '<td><div class="DescriptionEdit"  style="font-weight: 700;cursor: pointer;"  data-type="textarea"   data-name="Description" data-value="' +
                item.Description +
                '" data-pk="' +
                item.ID +
                '" data-userid ="' +
                item.CreatedBy +
                '" > ' +
                item.Description +
                "</div> ";
              html += "</td>";
              html += "<td>";

              if (item.Tag !== null) {
                var array2 = item.Tag.split(",");

                $.each(array2, function(i, item2) {
                  if (item2.length > 1) {
                    html +=
                      '<span class="badge bg-navy text-bold ">' +
                      item2 +
                      "</span> ";
                  }
                });
              }

              html += "</td>";
              html +=
                '<td><input autocomplete="off" data-id="' +
                item.ID +
                '" type="text" class="datepickerEdit" style="border: none;font-weight: 700;cursor: pointer;" value="' +
                item.Deadline +
                '"></td>';
              html +=
                '<td><input autocomplete="off" data-id="' +
                item.ID +
                '" type="text" class="datepickerEdit" name="UpdateSheduleDate" style="border: none;font-weight: 700;cursor: pointer;" value="' +
                item.UpdateSheduleDate +
                '"></td>';
              html +=
                '<td><input autocomplete="off" data-id="' +
                item.ID +
                '" type="text" class="datepickerEdit" style="border: none;font-weight: 700;cursor: pointer;" value="' +
                item.ActualFinishDate +
                '"></td>';
              html += "<td > ";
              html += '<div class="pretty p-icon p-round p-pulse">';

              if (item.Status) {
                html +=
                  '<input type="checkbox" class="updateStatus" checked  />';
                html += '<div class="state p-success">';
                html += '<i class="icon fa fa-check"></i>';
                html += "<label>Finished</label>";
              } else {
                html += '<input type="checkbox" class="updateStatus" />';
                html += '<div class="state p-danger">';
                html += '<i class="icon fa fa-check"></i>';
                html += "<label>Not finished</label>";
              }

              html += "</div>";
              html += "</div>";
              html += "</td > ";

              $(".listTask .Approval").show();
              $(".listTask .Option").show();
              html += "<td> ";

              if (item.ApprovedStatus) {
                html += '<div class="pretty p-icon p-round p-jelly">';
                html +=
                  '<input type="checkbox" checked class="btnApproveActionPlan" />';
                html += '<div class="state p-success">';
                html += '<i class="icon fa fa-check"></i>';
                html += '<label class="black">Approved</label>';
                html += "</div>";
                html += "</div >";
              } else {
                html += '<div class="pretty p-icon p-round p-jelly">';
                html +=
                  '<input type="checkbox" class="btnApproveActionPlan" />';
                html += '<div class="state p-danger">';
                html += '<i class="icon fa fa-check"></i>';
                html += '<label class="black">Not approved</label>';
                html += "</div>";
                html += "</div >";
              }

              html += "</td > ";
              html += "<td>";
              html += '<div class="btn-group">';
              html +=
                '<button type="button" class="btn btn-warning btn-sm btnDeleteActionPlan"><i class="fas fa-trash-alt"></i></button>';
              html += "</div>";
              html += "</div>";
              html += "</td>";
              html += "</tr>";
            } else {
              if (item.ListUserIDs[0] !== -1)
                html += '<tr data-id="' + item.ID + '">';
              else
                html +=
                  '<tr style="pointer-events: none;" data-id="' +
                  item.ID +
                  '">';
              console.log(item.ListUserIDs);
              html += "<td>" + (i + 1) + "</td>";
              html +=
                '<td class="text-bold" style="padding-left:15px;"><span style="font-weight: 700;cursor: pointer;"  class="TitleEdit" data-url="/ChartPeriod/Update" data-type="text" data-name="Title" data-pk="' +
                item.ID +
                '" data-value="' +
                item.Title +
                '" data-title="Enter your title">' +
                item.Title +
                "</span></td>";
              html +=
                '<td><div class="DescriptionEdit" data-userid ="' +
                item.CreatedBy +
                '" style="font-weight: 700;cursor: pointer;"  data-type="textarea"   data-name="Description" data-value="' +
                item.Description +
                '" data-pk="' +
                item.ID +
                '"> ' +
                item.Description +
                "</div> ";
              html += "</td>";
              html += "<td>";

              if (item.Tag !== null) {
                var array2 = item.Tag.split(",");
                $.each(array2, function(i, item2) {
                  if (item2.length > 1) {
                    html +=
                      '<span class="badge bg-default text-bold ">' +
                      item2 +
                      "</span> ";
                  }
                });
              }

              html += "</td>";
              html +=
                '<td><input autocomplete="off" data-id="' +
                item.ID +
                '" type="text" class="datepickerEdit" style="border: none;font-weight: 700;cursor: pointer;" value="' +
                item.Deadline +
                '"></td>';
              html +=
                '<td><input autocomplete="off" data-id="' +
                item.ID +
                '" type="text" class="datepickerEdit" name="UpdateSheduleDate" style="border: none;font-weight: 700;cursor: pointer;" value="' +
                item.UpdateSheduleDate +
                '"></td>';
              html +=
                '<td><input autocomplete="off" data-id="' +
                item.ID +
                '" type="text" class="datepickerEdit" style="border: none;font-weight: 700;cursor: pointer;" value="' +
                item.ActualFinishDate +
                '"></td>';
              html += "<td > ";
              html += '<div class="pretty p-icon p-round p-pulse">';

              if (item.Status) {
                html +=
                  '<input type="checkbox" class="updateStatus" checked />';
                html += '<div class="state p-success">';
                html += '<i class="icon fa fa-check"></i>';
                html += "<label>Finished</label>";
              } else {
                html += '<input type="checkbox" class="updateStatus" />';
                html += '<div class="state p-danger">';
                html += '<i class="icon fa fa-check"></i>';
                html += "<label>Not finished</label>";
              }
              html += "</div>";
              html += "</div>";
              html += "</td > ";
              html += "</tr>";
            }
          });

          $(".tblActionPlan").empty();
          $(".tblActionPlan").append(html);
          seft.btnSaveActionPlan();

          $(".updateStatus")
            .unbind("click")
            .on("click", function() {
              var id = $(this)
                .closest("tr")
                .data("id");
              seft.done(id);
            });

          $(".btnApproveActionPlan")
            .off("click")
            .on("click", function() {
              var id = $(this)
                .closest("tr")
                .data("id");
              seft.approval(id);
            });

          $(".btnDeleteActionPlan")
            .off("click")
            .on("click", function() {
              var id = $(this)
                .closest("tr")
                .data("id");
              seft.deleteActionPlan(id);
            });

          $("#modal-group-comment-data2 .datepickerEdit").datepicker({
            dateFormat: "mm-dd-yy"
          });
          $("#modal-group-comment-data2 .datepickerEdit")
            .off("change")
            .on("change", function() {
              var id = $(this).data("id"),
                value = $(this).val();

              $.ajax({
                type: "Post",
                url: "https://localhost:44309/ChartPeriod/UpdateSheduleDate/",
                data: {
                  name: "DeadLine",
                  value: value,
                  pk: id,
                  userid: VueJwtDecode.decode(localStorage.getItem("authToken"))
                    .nameid
                },
                success: function(res) {
                  console.log(res);
                  success("Successfully!");
                  var commentid = Number($(".commentid").text()),
                    dataid = Number($(".dataid").text());

                  seft.LoadDataActionPlan(dataid, commentid);
                },
                error: function(error) {
                  console.log(error);
                }
              });
            });
          $.fn.editable.defaults.mode = "inline";

          $("#modal-group-comment-data2 input[name=UpdateSheduleDate]")
            .off("change")
            .on("change", function() {
              var id = $(this).data("id"),
                value = $(this).val(),
                userid = VueJwtDecode.decode(localStorage.getItem("authToken"))
                  .nameid;
              name = $(this).attr("name");
              $.ajax({
                type: "Post",
                url: "https://localhost:44309/ChartPeriod/UpdateSheduleDate/",
                data: {
                  name: name,
                  value: value,
                  pk: id,
                  userid: userid
                },
                success: function(res) {
                  success("Successfully!");
                  var commentid = Number($(".commentid").text());

                  var dataid = Number($(".dataid").text());

                  seft.LoadDataActionPlan(dataid, commentid);
                }
              });
            });

          $("#modal-group-comment-data2 .TitleEdit").editable({
                placement: "right",
                type: "text",
                // pk: $(this).data("item-id"),
                url:
              "https://localhost:44309/ChartPeriod/UpdateSheduleDate/" +
              $(this).params,
            params: function(params) {
              var data = {};
              data["name"] = params.name;
              data["value"] = params.value;
              data["pk"] = params.pk;
              data["userid"] = VueJwtDecode.decode(
                localStorage.getItem("authToken")
              ).nameid;
              //  abc=params;
              data.item = { value: data.value };
              console.log(data);
              return data;
            },
            display: function(value, response) {
              if (response) {
                var commentid = Number($(".commentid").text()),
                  dataid = Number($(".dataid").text());
                seft.LoadDataActionPlan(dataid, commentid);
                $(this).attr("data-value", value);
              }
            },
            ajaxOptions: {
              type: "POST",
              dataType: "json"
            }
          });

          $("#modal-group-comment-data2 .DescriptionEdit").editable({
            type: "text",
            //pk: $(this).data("item-id"),
            url:
              "https://localhost:44309/ChartPeriod/UpdateSheduleDate/" +
              $(this).params,
            params: function(params) {
              // debugger
              var data = {};
              data["name"] = params.name;
              data["value"] = params.value;
              data["pk"] = params.pk;
              data["userid"] = VueJwtDecode.decode(
                localStorage.getItem("authToken")
              ).nameid;
              //  abc=params;
              data.item = { value: data.value };
              console.log(data);
              return data;
            },
            display: function(value, response) {
              if (response) {
                success("Successfully!");
                var commentid = Number($(".commentid").text()),
                  dataid = Number($(".dataid").text());

                seft.LoadDataActionPlan(dataid, commentid);

                $(this).attr("data-value", value);
              }
            },
            ajaxOptions: {
              type: "POST",
              dataType: "json"
            }
          });
        }
      });
    },
    btnSaveActionPlan(){
      let seft = this
       $('.btnSaveActionPlan').unbind('click').on('click', function () {
            seft.addActionPlan();
        });
    },
    validate(){
       var isValid = true;
      if ($('.Title').val().trim() === "") {
        $('.Title').css('border-color', 'Red');
        isValid = false;
      }
      else {
        $('.Title').css('border-color', 'lightgrey');
      }
      //if ($('.Description').val().trim() === "") {
      //    $('.Description').css('border-color', 'Red');
      //    isValid = false;
      //}
      //else {
      //    $('.Description').css('border-color', 'lightgrey');
      //}
      if ($('.DueDate').val().trim() === "") {
        $('.DueDate').css('border-color', 'Red');
        isValid = false;
      }
      else {
        $('.DueDate').css('border-color', 'lightgrey');
      }
      return isValid;
    },
    addActionPlan(){
      // debugger
        let seft = this
        var res = seft.validate();
        if (res === false) {
          return false;
        }
        var KPILevelCodeAndPeriod = seft.$route.params.kpilevelcode + seft.$route.params.period;
        var phrases = new Array();

        $('.Description').each(function () {
          $(this).find('li').each(function () {
            var current = $(this);
            if (current.children().length > 0) { return true; }
            phrases.push($(this).text().trim());
          });
        });
        var Description = phrases.join(';');
        var Tag = $('#Tag').val().trim();
        if (Tag !== null || Tag !== "" || Tag !== undefined)
          Tag = Tag.replace(/\@@/g, '').replace(/\ /g, ',');

        var Auditor = $('#Auditor').val().replace("@@","").trim();
        var obj = {
          // ID: id,
          UserID: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
          DataID: Number($('.dataid').text()),
          CommentID: Number($('.commentid').text()),
          Title: $('.addTask .Title').val(),
          Tag: Tag,
          KPILevelCodeAndPeriod: KPILevelCodeAndPeriod,
          Description: Description,
          Deadline: $('.addTask .datepicker').datepicker({ dateFormat: 'mm-dd-yy' }).val(),
          SubmitDate: convertDate(new Date),
          Link: window.location.href,
          Subject: $('.ActionPlanChart').text(),
          Auditor: Auditor,
          CategoryID: Number(seft.$route.params.catid),
          KPILevelCode: seft.KPILevelCode,
        };
        
        $.post('https://localhost:44309/ChartPeriod/Add', { obj: obj }, function (res) {
        console.log(res);
        if (res.status === true && res.isSendmail === true) {
          var commentid = Number($('.commentid').text());
          var dataid = Number($('.dataid').text());
          seft.LoadDataActionPlan(dataid, commentid);
          // chartperiodController.resetForm();
          activaTab('pills-home');
        }
        else if (res.status === true && res.isSendmail === false) {
          var commentid = Number($('.commentid').text());
          var dataid = Number($('.dataid').text());
          seft.LoadDataActionPlan(dataid, commentid);
          // chartperiodController.resetForm();
          activaTab('pills-home');
          console.log("Can not send email")
        }
        else {
          if (res.message !== "") {
            Toast.fire({
              type: 'warning',
              title: res.message
            })

          } else {
            error( "Failed");
          }
        }
      });
       $("#modal-group-comment-data").on("shown.bs.modal", function (){
            activaTab('pills-home');
        });
    },
    btntabload() {
      let seft = this;
      $('.btnTask').unbind('click').on('click', function () {
        var commentid = $(this).data('commentid');
        $(".commentid").text(commentid);
        var commentid = $(this).data('commentid');
        console.log(commentid)        
        var dataid = Number($('.dataid').text());
        var textRemark = $('.RemarkChart').text();
        textRemark = textRemark.replace("Remark", "Action Plan");
        $('.ActionPlanChart').text('');
        $('.ActionPlanChart').text(textRemark);
        activaTab('pills-home');
        seft.LoadDataActionPlan(dataid, commentid);
        });
    },
    loadDataComment() {
      let seft = this;
      $.ajax({
        url: "https://localhost:44309/ChartPeriod/LoadDataComment",
        //url: '/ChartPeriod/GetAllComments',
        type: "GET",
        data: {
          dataid: Number($(".dataid").text()),
          userid: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
        },
        dataType: "json",
        success: function(res) {
          var data = res.data;
          console.log("Lay ra tat ca comment");
          console.log(res);
          var total = res.total;

          $(".total-comments").text(total);
          var html = "";
          $.each(data, function(i, item) {
            var nowDate = new Date(parseInt(item.CommentedDate.substr(6)));
            var date = new Date(nowDate);
            var result =
              date.getMonth() +
              1 +
              "/" +
              date.getDate() +
              "/" +
              date.getFullYear();
            html += ' <li class="media">';
            html += '<a href="#" class="pull-left">';
            html +=
              '    <img src="src/img/user-icon.png" alt="" class="img-circle">';
            html += "</a>";
            html += '<div class="media-body">';
            html += '<span class="text-muted pull-right">';
            html +=
              '    <small class="text-muted">' +
              JSONDateWithTime(item.CommentedDate) +
              "</small>";
            html += "</span>";
            html +=
              '<strong class="text-success">' + item.FullName + "</strong>";
            if (item.Read) {
              html += '<span class="label bg-green"> new</span>';
            }
            if (item.Task) {
              html +=
                '<p><a href="#modal-group-comment-data2" data-toggle="modal" data-commentid="' +
                item.CommentID +
                '" data-dismiss="modal" class="btn btn-xs btn-danger text-bold btnTask"><i class="fa fa-tags"></i> Task</a> </p>';
            } else {
              html +=
                '<p><a href="#modal-group-comment-data2" data-toggle="modal" title="There are no task." data-commentid="' +
                item.CommentID +
                '" data-dismiss="modal" class="btn btn-xs btn-success text-bold btnTask tooltip-ui"><i class="fa fa-tags"></i> Task</a> </p>';
            }
            html += "<p>";
            html += item.CommentMsg;
            html += "</p>";
            html += "</div>";
            html += "</li >";
          });
          $("#media-list").empty();
          $("#media-list").append(html);

          seft.btntabload();
        },
        error: function(err) {}
      });
    },
    LoadTitle() {
      let seft = this;
      switch (seft.$route.params.period) {
        case "w":
          seft.title = seft.data2.map(x => {
            return x.Week;
          });
          break;
        case "m":
          seft.title = seft.data2.map(x => {
            return seft.convertNumberMonthToText(x.Week);
          });
          break;
        case "q":
          seft.title = seft.data2.map(x => {
            return "Quarter " + x.Week;
          });
          break;

        case "y":
          seft.title = seft.data2.map(x => {
            return "Year " + x.Week;
          });
          break;
      }
    },
    convertNumberMonthToText(period) {
      switch (period) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";
        case 3:
          return "Mar";
        case 4:
          return "Apr";
        case 5:
          return "May";
        case 6:
          return "Jun";
        case 7:
          return "Jul";
        case 8:
          return "Aug";
        case 9:
          return "Sep";
        case 10:
          return "Oct";
        case 11:
          return "Nov";
        case 12:
          return "Dec";
      }
      return "N/A";
    },
    LoadDataset() {
      let seft = this;
      HTTP.get(`http://10.4.4.224:98/Dataset/getalldatabycategory/${seft.$route.params.catid}/${seft.$route.params.period}/${seft.$route.params.start}/${seft.$route.params.end}/${seft.$route.params.year}`)
      .then(response => {
        seft.data = response.data;
        seft.data2 = response.data[0].Datasets;
        seft.categoryname = response.data[0].CategoryName;
        seft.kpiname = response.data[0].KPIName;
        seft.KPILevelCode = response.data[0].KPILevelCode;

        seft.statusfavorite = response.data.statusfavorite;
        seft.unit = response.data.Unit;
        seft.datasets = response.data[0].Datasets;
        //   console.log(seft.datasets)
        seft.labels = response.data.labels;
        seft.label = response.data.label;
        seft.PIC = response.data.PIC;
        seft.Owner = response.data.Owner;
        seft.OwnerManagerment = response.data.OwnerManagerment;
        seft.Sponsor = response.data.Sponsor;
        seft.Participant = response.data.Participant;
        seft.dataremarks = response.data.Dataremarks;
        seft.targets = response.data.targets;
        $("#editBugModal").modal("show");
        $(".btnShowData").hide();
        // console.log(seft.chart.data);
        seft.LoadTitle();
        console.log(response.data);
      })
      // $.ajax({
      //   url: `http://10.4.4.224:98/Dataset/getalldatabycategory/${seft.$route.params.catid}/${seft.$route.params.period}/${seft.$route.params.start}/${seft.$route.params.end}/${seft.$route.params.year}`,
      //   type: "GET",
      //   // data: {
      //   //   kpilevelcode: seft.$route.params.kpilevelcode,
      //   //   catid: seft.$route.params.catid,
      //   //   period: seft.$route.params.period,
      //   //   year: seft.$route.params.year,
      //   //   start: seft.$route.params.start,
      //   //   end: seft.$route.params.end
      //   // },
      //   dataType: "json",
      //   success: function(response) {
      //     seft.data = response;
      //     seft.data2 = response[0].Datasets;
      //     console.log(response);
      //     //   console.log(seft.period);
      //     //   console.log(seft.data2);

      //     seft.categoryname = response[0].CategoryName;
      //     seft.kpiname = response[0].KPIName;
      //     seft.KPILevelCode = response[0].KPILevelCode;
      //     console.log(seft.KPILevelCode);

      //     seft.statusfavorite = response.statusfavorite;
      //     seft.unit = response.Unit;
      //     seft.datasets = response[0].Datasets;
      //     //   console.log(seft.datasets)
      //     seft.labels = response.labels;
      //     seft.label = response.label;
      //     seft.PIC = response.PIC;
      //     seft.Owner = response.Owner;
      //     seft.OwnerManagerment = response.OwnerManagerment;
      //     seft.Sponsor = response.Sponsor;
      //     seft.Participant = response.Participant;
      //     seft.dataremarks = response.Dataremarks;
      //     seft.targets = response.targets;
      //     $("#editBugModal").modal("show");
      //     $(".btnShowData").hide();
      //     // console.log(seft.chart.data);
      //     seft.LoadTitle();
      //   }
      // });
    }
  }
};
</script>