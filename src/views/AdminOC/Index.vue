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
            <li class="breadcrumb-item active">KPI OC</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="callout bg-yellow-gradient" style="border-color:#c57901">
        <h3>5. OC KPI</h3>
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
          <h3 style="font-size:18px" class="box-title pull-left">KPI</h3>
          <span class="id" style="display:none"></span>
          <span class="code" style="display:none"></span>
          <span class="level" style="display:none"></span>
          <!-- <select class="form-control pull-right" style="width:50%"></select> -->
        </div>
        <div class="box-body">
          <div class="box-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>KPI Organization Chart</th>
                  <th>Period</th>
                </tr>
              </thead>
              <tbody v-for="(item,key,index) in events" :key="index" class="tbody" id="tblkpilevel">
                <tr>
                  <td :data-kpilevel="item.ID">{{key+1}}</td>
                  <td :data-unit="item.Unit" class="tooltip-css">
                    <div class="top">
                      {{item.KPIName}}
                      <i></i>
                    </div>

                    <div class="pretty p-icon p-rotate">
                      <input
                        v-if="item.Checked == true"
                        type="checkbox"
                        :data-code="item.KPICode"
                        :value="item.KPIID"
                        checked
                      />
                      <input v-else type="checkbox" :data-code="item.KPICode" :value="item.KPIID" />
                      <span class="level" :data-level="item.LevelNumber" style="display:none"></span>
                      <span class="kpi-code" :data-kpicode="item.LevelCode" style="display:none"></span>
                      <div class="state p-success">
                        <i class="icon fa fa-check"></i>
                        <label class="textOverflow black">{{item.KPIName}}</label>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="pretty p-icon p-rotate">
                      <input
                        v-if="item.WeeklyChecked === true"
                        class="weekly"
                        :data-code="item.KPICode "
                        :value="item.KPIID"
                        type="checkbox"
                        checked
                      />
                      <input
                        v-else
                        class="weekly"
                        :data-code="item.KPICode"
                        :value="item.KPIID"
                        type="checkbox"
                      />
                      <div class="state p-success">
                        <i class="icon fa fa-check"></i>
                        <label class="black">Weekly</label>
                      </div>
                    </div>
                    <div class="pretty p-icon p-rotate">
                      <input
                        v-if="item.MonthlyChecked === true"
                        class="monthly"
                        data-code="item.KPICode"
                        value="item.KPIID"
                        type="checkbox"
                        checked
                      />
                      <input
                        v-else
                        class="monthly"
                        data-code="item.KPICode"
                        value="item.KPIID"
                        type="checkbox"
                      />
                      <div class="state p-success">
                        <i class="icon fa fa-check"></i>
                        <label class="black">Monthly</label>
                      </div>
                    </div>
                    <div class="pretty p-icon p-rotate">
                      <input
                        v-if="item.QuarterlyChecked === true"
                        class="quaterly"
                        data-code="item.KPICode"
                        value="item.KPIID"
                        type="checkbox"
                        checked
                      />
                      <input
                        v-else
                        class="quaterly"
                        data-code="item.KPICode"
                        value="item.KPIID"
                        type="checkbox"
                      />
                      <div class="state p-success">
                        <i class="icon fa fa-check"></i>
                        <label class="black">Quarterly</label>
                      </div>
                    </div>
                    <div class="pretty p-icon p-rotate">
                      <input
                        v-if="item.YearlyChecked === true"
                        class="yearly"
                        data-code="item.KPICode"
                        value="item.KPIID"
                        type="checkbox"
                        checked
                      />
                      <input
                        v-else
                        class="yearly"
                        data-code="item.KPICode"
                        value="item.KPIID"
                        type="checkbox"
                      />
                      <div class="state p-success">
                        <i class="icon fa fa-check"></i>
                        <label class="black">Yearly</label>
                      </div>
                    </div>
                  </td>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { HTTP } from "../../http-constants";
// import listoc from "../../components/adminOC/List"
import Hierarchy from "../../components/adminOC/Hierarchy";
import listoc from "../../components/adminOC/Modal";
import { HTTP } from '../../http-constants';
export default {
  name: "IndexKpi",
  data() {
    return {
      events: []
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
        msg = msg ? ": " + msg : "";
        $.ui.fancytree.info(
          "Event('" + event.type + "', node=" + data.node + ")" + msg
        );
      }
      $(function() {
        let seft = this;
        kpiController.init();
        setTimeout(function(){

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
              url: "http://10.4.4.224:98/AdminKPILevel/GetListTree",
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
              event.preventDefault();
              logEvent(event, data, ", targetType=" + data.targetType);
  
              $("#box .kpi-name h3").text("KPI - " + data.node.title);
              $("#box .kpi-name .code").text(data.node.key);
  
              kpiController.loadDataCategory();
              kpiController.loadDataKPILevel(true, data.node.key);
  
              $("html, body").animate(
                {
                  scrollTop: $("#box").offset().top
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
      let kpiLevelConfig = {
        pageSize: 6,
        pageIndex: 1
      };
      let kpiController = {
        init: function() {
          kpiController.registerEvent();
        },
        registerEvent: function() {
          $("#box select")
            .off("change")
            .on("change", function(e) {
              var code = $(this)
                .parent()
                .children(".code")
                .text();
              kpiController.loadDataKPILevel(true, code);
            });

          //get KPIID

          $("#get-kpi-code").click(function() {
            var code = $("#box .kpi-name .code").text();
            var levelcode = $(this)
              .parent("td")
              .parent("tr")
              .children("td:nth-child(2)")
              .children("div")
              .children("span.kpi-code")
              .data("kpicode");
            var level = $(this)
              .parent("td")
              .parent("tr")
              .children("td:nth-child(2)")
              .children("div")
              .children("span.level")
              .data("level");
            var codekpilevel = $(this)
              .parent("td")
              .parent("tr")
              .children("td:nth-child(2)")
              .children("div")
              .children("input")
              .data("code");

            $("#updateKpi .ID").val(level + levelcode + codekpilevel + "PO");
            $("#updateKpi .Weekly").val(
              level + levelcode + codekpilevel + "POW"
            );
            $("#updateKpi .Monthly").val(
              level + levelcode + codekpilevel + "POM"
            );
            $("#updateKpi .Quaterly").val(
              level + levelcode + codekpilevel + "POQ"
            );
            $("#updateKpi .Yearly").val(
              level + levelcode + codekpilevel + "POY"
            );
          });
          //-----------------------------------------------------------------------------------------------------------------
          //show list kpilevel
          $("#box select")
            .off("change")
            .on("change", function(e) {
              var code = $(this)
                .parent()
                .children(".code")
                .text();
              kpiController.loadDataKPILevel(true, code);
            });

          $("#tblkpilevel tr td:nth-child(2) input").change(function() {
            var levelcode = $(this)
              .parent()
              .parent("td:nth-child(2)")
              .children("div")
              .children("span.kpi-code")
              .data("kpicode");
            var level = $(this)
              .parent()
              .parent("td:nth-child(2)")
              .children("div")
              .children("span.level")
              .data("level");
            var codekpilevel = $(this).data("code");

            var KPIID = $(this).val();
            var LevelID = $("#box .kpi-name .code").text();
            var TimeCheck = new Date();
            var KPILevelCode = level + levelcode + codekpilevel + "PO";
            var Checked = $(this).is(":checked");
            var UserCheck = $("#user").data("userid");
            var Weekly = null;
            var Monthly = "2001/01/01";
            var Quarterly = "2001/01/01";
            var Yearly = "2001/01/01";
            var WeeklyChecked = null;
            var MonthlyChecked = null;
            var QuarterlyChecked = null;
            var YearlyChecked = null;
            var WeeklyPublic = null;
            var MonthlyPublic = null;
            var QuarterlyPublic = null;
            var YearlyPublic = null;
            var WeeklyStandard = 0;
            var MonthlyStandard = 0;
            var QuarterlyStandard = 0;
            var YearlyStandard = 0;
            var KPIName = null;
            kpiController.updateKPILevel(
              KPIID,
              KPILevelCode,
              UserCheck,
              Checked,
              WeeklyChecked,
              MonthlyChecked,
              QuarterlyChecked,
              YearlyChecked,
              Weekly,
              Monthly,
              Quarterly,
              Yearly,
              TimeCheck,
              LevelID,
              WeeklyPublic,
              MonthlyPublic,
              QuarterlyPublic,
              YearlyPublic,
              WeeklyStandard,
              MonthlyStandard,
              QuarterlyStandard,
              YearlyStandard
            );
          });
          //----------------------------------------------------------------------------------------------
          
          //update weeklychecked kpilevel
          $("#tblkpilevel .weekly")
            .off("click")
            .on("click", function() {
              kpiController.getAllUser();
              var ID = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(1)")
                .data("kpilevel");
              var KPIID = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(2) input")
                .val();
              var LevelID = $("#box .kpi-name .code").text();
              var TimeCheck = new Date();
              var KPILevelCode = "";
              var Checked = null;
              var UserCheck = $("#user").data("userid");
              var Weekly = null;
              var Monthly = "2001/01/01";
              var Quarterly = "2001/01/01";
              var Yearly = "2001/01/01";
              var WeeklyChecked = $(this).is(":checked");
              var MonthlyChecked = null;
              var QuarterlyChecked = null;
              var YearlyChecked = null;
              var WeeklyPublic = null;
              var MonthlyPublic = null;
              var QuarterlyPublic = null;
              var YearlyPublic = null;
              var WeeklyStandard = 0;
              var MonthlyStandard = 0;
              var QuarterlyStandard = 0;
              var YearlyStandard = 0;
              kpiController.loadDetail(ID);
              kpiController.updateKPILevel(
                KPIID,
                KPILevelCode,
                UserCheck,
                Checked,
                WeeklyChecked,
                MonthlyChecked,
                QuarterlyChecked,
                YearlyChecked,
                Weekly,
                Monthly,
                Quarterly,
                Yearly,
                TimeCheck,
                LevelID,
                WeeklyPublic,
                MonthlyPublic,
                QuarterlyPublic,
                YearlyPublic,
                WeeklyStandard,
                MonthlyStandard,
                QuarterlyStandard,
                YearlyStandard
              );
              if ($(this).is(":checked")) {
                $("#modal-group-weekly")
                  .modal("show")
                  .fadeIn(1000);
                $("#modal-group-weekly select").attr("data-id", KPIID);
              }
              var unit = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(2)")
                .data("unit");
              if (unit === "Numeric") {
                $("#modal-group-weekly .containStandard").hide();
              } else {
                $("#modal-group-weekly .containStandard").show();
              }
            });
          //update monthly checked kpilevel
          $("#tblkpilevel .monthly")
            .off("click")
            .on("click", function() {
              kpiController.getAllUser();

              var ID = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(1)")
                .data("kpilevel");

              var KPIID = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(2) input")
                .val();
              var LevelID = $("#box .kpi-name .code").text();
              var TimeCheck = new Date();
              var KPILevelCode = "";
              var Checked = null;
              var UserCheck = $("#user").data("userid");
              var Weekly = null;
              var Monthly = "2001/01/01";
              var Quarterly = "2001/01/01";
              var Yearly = "2001/01/01";
              var WeeklyChecked = null;
              var MonthlyChecked = $(this).is(":checked");
              var QuarterlyChecked = null;
              var YearlyChecked = null;
              var WeeklyPublic = null;
              var MonthlyPublic = null;
              var QuarterlyPublic = null;
              var YearlyPublic = null;
              var WeeklyStandard = 0;
              var MonthlyStandard = 0;
              var QuarterlyStandard = 0;
              var YearlyStandard = 0;
              kpiController.loadDetail(ID);
              kpiController.updateKPILevel(
                KPIID,
                KPILevelCode,
                UserCheck,
                Checked,
                WeeklyChecked,
                MonthlyChecked,
                QuarterlyChecked,
                YearlyChecked,
                Weekly,
                Monthly,
                Quarterly,
                Yearly,
                TimeCheck,
                LevelID,
                WeeklyPublic,
                MonthlyPublic,
                QuarterlyPublic,
                YearlyPublic,
                WeeklyStandard,
                MonthlyStandard,
                QuarterlyStandard,
                YearlyStandard
              );
              if ($(this).is(":checked")) {
                $("#modal-group-monthly")
                  .modal("show")
                  .fadeIn(1000);
                $("#modal-group-monthly .monthly").attr("data-id", KPIID);
              }
              var unit = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(2)")
                .data("unit");
              if (unit === "Numeric") {
                $("#modal-group-monthly .containStandard").hide();
              } else {
                $("#modal-group-monthly .containStandard").show();
              }
            });
          //update quaterly checked kpilevel
          $("#tblkpilevel .quaterly")
            .off("click")
            .on("click", function() {
              kpiController.getAllUser();

              var ID = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(1)")
                .data("kpilevel");

              var KPIID = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(2) input")
                .val();
              var LevelID = $("#box .kpi-name .code").text();
              var TimeCheck = new Date();
              var KPILevelCode = "";
              var Checked = null;
              var UserCheck = $("#user").data("userid");
              var Weekly = null;
              var Monthly = "2001/01/01";
              var Quarterly = "2001/01/01";
              var Yearly = "2001/01/01";
              var WeeklyChecked = null;
              var MonthlyChecked = null;
              var QuarterlyChecked = $(this).is(":checked");
              var YearlyChecked = null;
              var WeeklyPublic = null;
              var MonthlyPublic = null;
              var QuarterlyPublic = null;
              var YearlyPublic = null;
              var WeeklyStandard = 0;
              var MonthlyStandard = 0;
              var QuarterlyStandard = 0;
              var YearlyStandard = 0;
              kpiController.loadDetail(ID);
              kpiController.updateKPILevel(
                KPIID,
                KPILevelCode,
                UserCheck,
                Checked,
                WeeklyChecked,
                MonthlyChecked,
                QuarterlyChecked,
                YearlyChecked,
                Weekly,
                Monthly,
                Quarterly,
                Yearly,
                TimeCheck,
                LevelID,
                WeeklyPublic,
                MonthlyPublic,
                QuarterlyPublic,
                YearlyPublic,
                WeeklyStandard,
                MonthlyStandard,
                QuarterlyStandard,
                YearlyStandard
              );
              if ($(this).is(":checked")) {
                $("#modal-group-quarterly")
                  .modal("show")
                  .fadeIn(1000);
                $("#modal-group-quarterly .quaterly").attr("data-id", KPIID);
              }
              var unit = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(2)")
                .data("unit");
              if (unit === "Numeric") {
                $("#modal-group-quarterly .containStandard").hide();
              } else {
                $("#modal-group-quartly .containStandard").show();
              }
            });
          //update yearly checked kpilevel
          $("#tblkpilevel .yearly")
            .off("click")
            .on("click", function() {
              kpiController.getAllUser();

              var ID = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(1)")
                .data("kpilevel");

              var KPIID = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(2) input")
                .val();
              var LevelID = $("#box .kpi-name .code").text();
              var TimeCheck = new Date();
              var KPILevelCode = "";
              var Checked = null;
              var UserCheck = $("#user").data("userid");
              var Weekly = null;
              var Monthly = "2001/01/01";
              var Quarterly = "2001/01/01";
              var Yearly = "2001/01/01";
              var WeeklyChecked = null;
              var MonthlyChecked = null;
              var QuarterlyChecked = null;
              var YearlyChecked = $(this).is(":checked");
              var WeeklyPublic = null;
              var MonthlyPublic = null;
              var QuarterlyPublic = null;
              var YearlyPublic = null;
              var WeeklyStandard = 0;
              var MonthlyStandard = 0;
              var QuarterlyStandard = 0;
              var YearlyStandard = 0;
              kpiController.loadDetail(ID);
              kpiController.updateKPILevel(
                KPIID,
                KPILevelCode,
                UserCheck,
                Checked,
                WeeklyChecked,
                MonthlyChecked,
                QuarterlyChecked,
                YearlyChecked,
                Weekly,
                Monthly,
                Quarterly,
                Yearly,
                TimeCheck,
                LevelID,
                WeeklyPublic,
                MonthlyPublic,
                QuarterlyPublic,
                YearlyPublic,
                WeeklyStandard,
                MonthlyStandard,
                QuarterlyStandard,
                YearlyStandard
              );
              if ($(this).is(":checked")) {
                $("#modal-group-yearly")
                  .modal("show")
                  .fadeIn(1000);
                $("#modal-group-yearly .yearly").attr("data-id", KPIID);
              }
              var unit = $(this)
                .parent()
                .parent()
                .parent()
                .find("td:nth-child(2)")
                .data("unit");
              if (unit === "Numeric") {
                $("#modal-group-yearly .containStandard").hide();
              } else {
                $("#modal-group-yearly .containStandard").show();
              }
            });
          //----------------------------------------------------------------------------------------------

          //update weekly modal
          $("#btnsaveweekly")
            .off("click")
            .on("click", function() {
              var KPIID = $("#modal-group-weekly .weekly").attr("data-id");
              var LevelID = $("#box .kpi-name .code").text();
              var TimeCheck = new Date();
              var KPILevelCode = "";
              var Checked = null;
              var UserCheck = $("#user").data("userid");
              var Weekly = $("#modal-group-weekly .weekly").val();
              var Monthly = "2001/01/01";
              var Quarterly = "2001/01/01";
              var Yearly = "2001/01/01";
              var WeeklyChecked = null;
              var MonthlyChecked = null;
              var QuarterlyChecked = null;
              var YearlyChecked = null;
              var WeeklyPublic =
                $(
                  '#modal-group-weekly input[type="radio"][name=weekpublic]:checked'
                ).val() === "true"
                  ? true
                  : false;
              var MonthlyPublic = null;
              var QuarterlyPublic = null;
              var YearlyPublic = null;
              var WeeklyStandard = $("#modal-group-weekly .standard").val();
              var MonthlyStandard = 0;
              var QuarterlyStandard = 0;
              var YearlyStandard = 0;
              kpiController.updateKPILevel(
                KPIID,
                KPILevelCode,
                UserCheck,
                Checked,
                WeeklyChecked,
                MonthlyChecked,
                QuarterlyChecked,
                YearlyChecked,
                Weekly,
                Monthly,
                Quarterly,
                Yearly,
                TimeCheck,
                LevelID,
                WeeklyPublic,
                MonthlyPublic,
                QuarterlyPublic,
                YearlyPublic,
                WeeklyStandard,
                MonthlyStandard,
                QuarterlyStandard,
                YearlyStandard
              );

              $("#modal-group-weekly").modal("hide");
            });
          //update monthly modal
          $("#btnsavemonthlymodal")
            .off("click")
            .on("click", function(e) {
              e.preventDefault();

              var KPIID = $("#modal-group-monthly .monthly").data("id");
              var LevelID = $("#box .kpi-name .code").text();
              var TimeCheck = new Date();
              var KPILevelCode = "";
              var Checked = null;
              var UserCheck = $("#user").data("userid");
              var Weekly = null;
              var Monthly = new Date(
                $("#modal-group-monthly .monthly input").val()
              );
              var Quarterly = "2001/01/01";
              var Yearly = "2001/01/01";
              var WeeklyChecked = null;
              var MonthlyChecked = null;
              var QuarterlyChecked = null;
              var YearlyChecked = null;
              var WeeklyPublic = null;
              var MonthlyPublic =
                $(
                  '#modal-group-monthly input[type="radio"][name=monthlypublic]:checked'
                ).val() === "true"
                  ? true
                  : false;
              var QuarterlyPublic = null;
              var YearlyPublic = null;
              var WeeklyStandard = 0;
              var MonthlyStandard = $("#modal-group-monthly .standard").val();
              var QuarterlyStandard = 0;
              var YearlyStandard = 0;
              kpiController.updateKPILevel(
                KPIID,
                KPILevelCode,
                UserCheck,
                Checked,
                WeeklyChecked,
                MonthlyChecked,
                QuarterlyChecked,
                YearlyChecked,
                Weekly,
                Monthly,
                Quarterly,
                Yearly,
                TimeCheck,
                LevelID,
                WeeklyPublic,
                MonthlyPublic,
                QuarterlyPublic,
                YearlyPublic,
                WeeklyStandard,
                MonthlyStandard,
                QuarterlyStandard,
                YearlyStandard
              );

              $("#modal-group-monthly").modal("hide");
            });
          //update quaterly modal
          $("#btnsavequaterlymodal")
            .off("click")
            .on("click", function(e) {
              e.preventDefault();

              var KPIID = $("#modal-group-quarterly .quaterly").data("id");
              var LevelID = $("#box .kpi-name .code").text();
              var TimeCheck = new Date();
              var KPILevelCode = "";
              var Checked = null;
              var UserCheck = $("#user").data("userid");
              var Weekly = null;
              var Monthly = "2001/01/01";
              var Quarterly = new Date(
                $("#modal-group-quarterly .quaterly input").val()
              );
              var Yearly = "2001/01/01";
              var WeeklyChecked = null;
              var MonthlyChecked = null;
              var QuarterlyChecked = null;
              var YearlyChecked = null;
              var WeeklyPublic = null;
              var MonthlyPublic = null;
              var QuarterlyPublic =
                $(
                  '#modal-group-quarterly input[type="radio"][name=quarterlypublic]:checked'
                ).val() === "true"
                  ? true
                  : false;
              var YearlyPublic = null;
              var WeeklyStandard = 0;
              var MonthlyStandard = 0;
              var QuarterlyStandard = $(
                "#modal-group-quarterly .standard"
              ).val();
              var YearlyStandard = 0;

              kpiController.updateKPILevel(
                KPIID,
                KPILevelCode,
                UserCheck,
                Checked,
                WeeklyChecked,
                MonthlyChecked,
                QuarterlyChecked,
                YearlyChecked,
                Weekly,
                Monthly,
                Quarterly,
                Yearly,
                TimeCheck,
                LevelID,
                WeeklyPublic,
                MonthlyPublic,
                QuarterlyPublic,
                YearlyPublic,
                WeeklyStandard,
                MonthlyStandard,
                QuarterlyStandard,
                YearlyStandard
              );

              $("#modal-group-quarterly").modal("hide");
            });
          //update yearly modal
          $("#btnsaveyearly")
            .off("click")
            .on("click", function() {
              var KPIID = $("#modal-group-yearly .yearly").data("id");
              var LevelID = $("#box .kpi-name .code").text();
              var TimeCheck = new Date();
              var KPILevelCode = "";
              var Checked = null;
              var UserCheck = $("#user").data("userid");
              var Weekly = null;
              var Monthly = "2001/01/01";
              var Quarterly = "2001/01/01";
              var Yearly = new Date(
                $("#modal-group-yearly .yearly input").val()
              );
              var WeeklyChecked = null;
              var MonthlyChecked = null;
              var QuarterlyChecked = null;
              var YearlyChecked = null;
              var WeeklyPublic = null;
              var MonthlyPublic = null;
              var QuarterlyPublic = null;
              var YearlyPublic =
                $(
                  '#modal-group-quarterly input[type="radio"][name=quarterlypublic]:checked'
                ).val() === "true"
                  ? true
                  : false;
              var WeeklyStandard = 0;
              var MonthlyStandard = 0;
              var QuarterlyStandard = 0;
              var YearlyStandard = $("#modal-group-yearly .standard").val();

              kpiController.updateKPILevel(
                KPIID,
                KPILevelCode,
                UserCheck,
                Checked,
                WeeklyChecked,
                MonthlyChecked,
                QuarterlyChecked,
                YearlyChecked,
                Weekly,
                Monthly,
                Quarterly,
                Yearly,
                TimeCheck,
                LevelID,
                WeeklyPublic,
                MonthlyPublic,
                QuarterlyPublic,
                YearlyPublic,
                WeeklyStandard,
                MonthlyStandard,
                QuarterlyStandard,
                YearlyStandard
              );

              $("#modal-group-yearly").modal("hide");
            });
        },
        loadDataCategory: function() {
          $.ajax({
            url: "https://localhost:44309/AdminKPILevel/GetCategoryCode",
            type: "GET",
            dataType: "json",
            success: function(data) {
              $("#box select").empty();
              $("#box select").append(
                '<option value="">-: Choose Category :-</option>'
              );
              //console.log(data);
              $.each(data, function(key, item) {
                $("#box select").append(
                  '<option value="' + item.ID + '">' + item.Name + "</option>"
                );
              });
            }
          });
        },
        loadDataKPILevel: function(changePageSize, level) {

          //data onto an array
          let category = $("#box select")
            .find(":selected")
            .val();
          if (category === undefined || category === "") category = 0;
          HTTP.get(`http://10.4.4.224:98/AdminKPILevel/LoadDataKPILevel/${level}/${category}/${kpiLevelConfig.pageIndex}/${kpiLevelConfig.pageSize}`)
          .then(r => {
            console.log(r)
            if (r.data.status) {
              let count,
                data = r.data.data,
                page = r.data.page,
                pageSize = r.data.pageSize;
              if (page === 1) count = 1;
              else count = (page - 1) * pageSize + 1;
              self.events = r.data.data;
              //  debugger
              console.log(self.events);

              kpiController.pagingKPILevel(
                r.data.total,
                function() {
                  console.log("change pageSize");
                  kpiController.loadDataKPILevel("", level);
                },
                changePageSize
              );
              kpiController.registerEvent();
            }
          })
          
        },
        pagingKPILevel: function(totalRow, callback, changePageSize) {
          var totalPage = Math.ceil(totalRow / kpiLevelConfig.pageSize);

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
              kpiLevelConfig.pageIndex = page;
              setTimeout(callback, 500);
            }
          });
        },
        updateKPILevel: function(
          KPIID,
          KPILevelCode,
          UserCheck,
          Checked,
          WeeklyChecked,
          MonthlyChecked,
          QuarterlyChecked,
          YearlyChecked,
          Weekly,
          Monthly,
          Quarterly,
          Yearly,
          TimeCheck,
          LevelID,
          WeeklyPublic,
          MonthlyPublic,
          QuarterlyPublic,
          YearlyPublic,
          WeeklyStandard,
          MonthlyStandard,
          QuarterlyStandard,
          YearlyStandard
          ) {
          var mObj = {
            KPIID: KPIID,
            KPILevelCode: KPILevelCode,
            UserCheck: UserCheck,
            Checked: Checked,
            WeeklyChecked: WeeklyChecked,
            MonthlyChecked: MonthlyChecked,
            QuarterlyChecked: QuarterlyChecked,
            YearlyChecked: YearlyChecked,
            Weekly: Weekly,
            Monthly: Monthly,
            Quarterly: Quarterly,
            Yearly: Yearly,
            TimeCheck: TimeCheck,
            LevelID: LevelID,
            WeeklyPublic: WeeklyPublic,
            MonthlyPublic: MonthlyPublic,
            QuarterlyPublic: QuarterlyPublic,
            YearlyPublic: YearlyPublic,
            WeeklyStandard: WeeklyStandard,
            MonthlyStandard: MonthlyStandard,
            QuarterlyStandard: QuarterlyStandard,
            YearlyStandard: YearlyStandard
          };

          $.ajax({
            url: "https://localhost:44309/AdminKPILevel/UpdateKPILevel",
            data: JSON.stringify(mObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function(result) {

              if (result) {
                swal.fire({
                  title: "Success!",
                  text: "Update successfully!",
                  type: "success"
                });
              }
            },
            error: function(errormessage) {
              //console.log(errormessage.responseText);
            }
          });
        },
        getAllUser() {
          $.post(
            "https://localhost:44309/AdminKPILevel/GetListAllUser",
            function(data) {
              var users = [],
                username,
                fullname;
              var arrays = data;
              $.each(arrays, function(i, item) {
                users.push({
                  username: item.Username,
                  fullname: item.FullName
                });
              });

              $(".KPILevelSelect2").suggest("@@", {
                data: users,
                map: function(user) {
                  return {
                    value: user.username + "\f",
                    text:
                      "<strong>" +
                      user.username +
                      "  </strong> <small>" +
                      user.fullname +
                      "</small>"
                  };
                },
                get: function(index) {
                  console.log(index);
                }
              });
            }
          );
        },
        loadDetail: function(id) {
          $.ajax({
            url: "https://localhost:44309/AdminKPILevel/GetbyID/",
            data: { ID: JSON.stringify(id) },
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function(res) {
              //console.log("show detail KPI")
              //console.log(result);
              console.log(res);
              var result = res.data;

              $(".KPILevelID").val(id);
              $("#modal-group-weekly .weekly").val(result.Weekly);
              $("#modal-group-weekly .weekly").val(result.Weekly);
              $("#modal-group-weekly input[name=weekpublic]").val(
                result.WeeklyPublic
              );
              $("#modal-group-weekly .standard").val(result.WeeklyStandard);

              $("#modal-group-monthly .monthly").val(
                kpiController.convertDateJson(result.Monthly)
              );
              $("#modal-group-monthly input[name=monthpublic]").val(
                result.MonthlyChecked
              );
              $("#modal-group-monthly .standard").val(result.MonthlyStandard);

              $("#modal-group-quarterly .quaterly").val(
                kpiController.convertDateJson(result.Quarterly)
              );
              $("#modal-group-quarterly input[name=quarterpublic]").val(
                result.QuarterlyChecked
              );
              $("#modal-group-quarterly .standard").val(
                result.QuarterlyStandard
              );

              $("#modal-group-yearly .yearly").val(
                kpiController.convertDateJson(result.Yearly)
              );
              $("#modal-group-yearly input[name=quaterpublic]").val(
                result.YearlyChecked
              );
              $("#modal-group-yearly .standard").val(result.YearlyStandard);
            },
            error: function(err) {
              //console.log(err);
            }
          });
        },
        convertDateJson(d) {
          if (d === null) d = "/Date(1000000000000)/";

          let milli = d.replace(/\/Date\((-?\d+)\)\//, "$1");
          let date = new Date(parseInt(milli));
          let dd = String(date.getDate()).padStart(2, "0");
          let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
          let yyyy = date.getFullYear();
          return mm + "/" + dd + "/" + yyyy;
        }
      };
    }
  }
};
</script>
