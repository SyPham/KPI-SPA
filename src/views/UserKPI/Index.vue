<template>
  <div class="row">
    <div class="container-fluid">
      <div class="row mt-2">
        <div class="col-sm-6"></div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <a href="#/home">Home</a>
            </li>
            <li class="breadcrumb-item active">KPI</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <hierarchy></hierarchy>
        </div>
        <div class="card-body">
          <table
            id="treetable"
            class="table table-condensed table-hover table-striped fancytree-fade-expander fancytree-colorize-selected"
          >
            <thead>
              <tr>
                <th style="width:10px">Level Number</th>
                <th class="text-center">Name</th>
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
      </div>
    </div>

    <div class="col-md-8">

<!-- categorylist -->
      <div class="card" id="boxCategory">
        <div class="card-header with-border kpi-name">
          <h3 style="font-size:18px" class="box-title pull-left">
            Category lists
          </h3>
          <span class="id" style="display:none"></span>
          <span class="code" style="display:none"></span>
          <span class="level" style="display:none"></span>
          <input
            type="text"
            class="form-control levelID"
            style="display:none"
          />
          <!-- <select class="form-control pull-right" style="width:50%"></select> -->
        </div>
        <div
          class="card-body pb-3"
          id="btnCategory"
          style="max-height:200px;overflow-y:scroll;overflow-y:hidden"
        >
          <button
            v-for="(item, key, index) in events"
            :key="index"
            class="btn mb-2 btn-sm btnCategory category2 ml-2 rounded-pill text-white font-weight-bold"
            :data-id="item.ID"
          >
            <span v-if="item.Total > 1" class="name"
              >{{ item.Name }} {{ item.Total }} (items)</span
            >
            <span v-else class="name"
              >{{ item.Name }} {{ item.Total }} (item)</span
            >
          </button>
        </div>
      </div>
      <!-- endcategorylist -->


      <!-- kpilevellist -->
      <div class="card " id="box" style="display:none">
        <div class="card-header with-border kpi-name">
          <h3 class="card-title pull-left">KPI</h3>
          <span class="id" style="display:none"></span>
          <span class="code" style="display:none"></span>
          <span class="level" style="display:none"></span>
          <input
            type="text"
            class="form-control catid"
            value=""
            style="display:none"
          />
        </div>
        <div class="card-body">
          <div class="text-center periodAll" style="display:none">
            <a class="btn bg-primary btn-sm weeklyperiod" data-period="W"
              ><i class="fa fa-eye"></i>&#160;View all by weekly</a
            >
            <a class="btn bg-primary btn-sm monthlyperiod" data-period="m"
              ><i class="fa fa-eye"></i>&#160;View all by monthly</a
            >
            <a class="btn bg-primary btn-sm quarterlyperiod" data-period="q"
              ><i class="fa fa-eye"></i>&#160;View all by quarterly</a
            >
            <a class="btn bg-primary btn-sm yearlyperiod" data-period="y"
              ><i class="fa fa-eye"></i>&#160;View all by yearly</a
            >
          </div>
        </div>
        <div class="box-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>KPI Organization Chart</th>
                <th>Period</th>
              </tr>
            </thead>
            <tbody
              v-for="(item, key, index) in dataKPILV"
              :key="index"
              class="tbody"
              id="tblkpilevel"
            >
              <tr :data-id="item.ID">
                <td>{{ key + 1 }}</td>
                <td>
                  <div class="tooltip-css ">
                    <div class="pretty p-icon p-rotate ">
                      <!-- <input v-if="item.CheckCategory == true" type="checkbox"  class="checkbox kpilevelID" name="checkbox" checked />
                      <input v-else type="checkbox"  class="checkbox kpilevelID" name="checkbox"  /> -->
                      <div class="state p-success textOverflow">
                        <div class="black labelOverflow">
                          {{ item.KPIName }}
                        </div>
                      </div>
                    </div>
                    <div class="top">{{ item.KPIName }}<i></i></div>
                  </div>
                </td>
                <td>
                  <!-- button Weekly -->

                  <button
                    v-if="
                      item.WeeklyChecked === true &&
                        item.StatusUploadDataW === true &&
                          item.StatusEmptyDataW === true
                    "
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="W"
                    :class="
                      item.WeeklyChecked === true
                        ? item.StatusUploadDataW === true
                          ? 'btn btn-sm btn-success week'
                          : item.StatusEmptyDataW === true
                          ? 'btn btn-sm btn-warning week'
                          : 'btn btn-sm btn-success week'
                        : 'btn btn-sm bg-navy week'
                    "
                  >
                    <i class="fas fa-chart-bar"></i> Weekly
                  </button>
                  <button
                    v-if="
                      item.WeeklyChecked === true &&
                        item.StatusUploadDataW === false
                    "
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="W"
                    :class="
                      item.WeeklyChecked === true
                        ? item.StatusUploadDataW === true
                          ? 'btn btn-sm btn-success week'
                          : item.StatusEmptyDataW === true
                          ? 'btn btn-sm btn-warning week'
                          : 'btn btn-sm btn-success week'
                        : 'btn btn-sm bg-navy week'
                    "
                  >
                    <i class="fas fa-chart-bar"></i> Weekly
                  </button>
                  <button
                    v-else
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="W"
                    disabled
                    class="btn btn-sm bg-navy  week"
                  >
                    <i class="fas fa-chart-bar"></i> Weekly
                  </button>
                  <!-- button Monthly -->
                  <button
                    v-if="
                      item.MonthlyChecked === true &&
                        item.StatusUploadDataM === true &&
                          item.StatusEmptyDataM === true
                    "
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="M"
                    :class="
                      item.MonthlyChecked === true
                        ? item.StatusUploadDataM === true
                          ? 'btn btn-sm btn-success month'
                          : item.StatusEmptyDataM === true
                          ? 'btn btn-sm btn-warning month'
                          : 'btn btn-sm btn-success month'
                        : 'btn btn-sm bg-navy month'
                    "
                  >
                    <i class="fas fa-chart-bar"></i> Monthly
                  </button>
                  <button
                    v-else-if="
                      item.MonthlyChecked === true &&
                        item.StatusUploadDataM === false
                    "
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="M"
                    :class="
                      item.MonthlyChecked === true
                        ? item.StatusUploadDataM === true
                          ? 'btn btn-sm btn-success month'
                          : item.StatusEmptyDataM === true
                          ? 'btn btn-sm btn-warning month'
                          : 'btn btn-sm btn-success month'
                        : 'btn btn-sm bg-navy month'
                    "
                  >
                    <i class="fas fa-chart-bar"></i> Monthly
                  </button>
                  <button
                    v-else
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="M"
                    disabled
                    class="btn btn-sm bg-navy month"
                  >
                    <i class="fas fa-chart-bar"></i> Monthly
                  </button>

                  <!-- button Quarterly -->
                  <button
                    v-if="
                      item.QuarterlyChecked === true &&
                        item.StatusUploadDataQ === true &&
                          item.StatusEmptyDataQ === true
                    "
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="Q"
                    :class="
                      item.MonthlyChecked === true
                        ? item.StatusUploadDataM === true
                          ? 'btn btn-sm btn-success quarter'
                          : item.StatusEmptyDataM === true
                          ? 'btn btn-sm btn-warning quarter'
                          : 'btn btn-sm btn-success quarter'
                        : 'btn btn-sm bg-navy quarter'
                    "
                  >
                    <i class="fas fa-chart-bar"></i> Quarterly
                  </button>
                  <button
                    v-else-if="
                      item.QuarterlyChecked === true &&
                        item.StatusUploadDataQ === false
                    "
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="Q"
                    :class="
                      item.QuarterlyChecked === true
                        ? item.StatusUploadDataQ === true
                          ? 'btn btn-sm btn-success quarter'
                          : item.StatusEmptyDataQ === true
                          ? 'btn btn-sm btn-warning quarter'
                          : 'btn btn-sm btn-success quarter'
                        : 'btn btn-sm bg-navy quarter'
                    "
                  >
                    <i class="fas fa-chart-bar"></i> Quarterly
                  </button>
                  <button
                    v-else
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="Q"
                    disabled
                    class="btn btn-sm bg-navy quarter"
                  >
                    <i class="fas fa-chart-bar"></i> Quarterly
                  </button>
                  <!-- button Yearly -->

                  <button
                    v-if="
                      item.YearlyChecked === true &&
                        item.StatusUploadDataY === true &&
                          item.StatusEmptyDataY === true
                    "
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="Y"
                    :class="
                      item.MonthlyChecked === true
                        ? item.StatusUploadDataM === true
                          ? 'btn btn-sm btn-success year'
                          : item.StatusEmptyDataM === true
                          ? 'btn btn-sm btn-warning year'
                          : 'btn btn-sm btn-success year'
                        : 'btn btn-sm bg-navy year'
                    "
                  >
                    <i class="fas fa-chart-bar"></i> Yearly
                  </button>
                  <button
                    v-else-if="
                      item.YearlyChecked === true &&
                        item.StatusUploadDataY === false
                    "
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="Y"
                    :class="
                      item.YearlyChecked === true
                        ? item.StatusUploadDataY === true
                          ? 'btn btn-sm btn-success year'
                          : item.StatusEmptyDataY === true
                          ? 'btn btn-sm btn-warning year'
                          : 'btn btn-sm btn-success year'
                        : 'btn btn-sm bg-navy year'
                    "
                  >
                    <i class="fas fa-chart-bar"></i> Yearly
                  </button>
                  <button
                    v-else
                    :data-kpilevelcode="item.KPILevelCode"
                    data-period="Y"
                    disabled
                    class="btn btn-sm bg-navy year"
                  >
                    <i class="fas fa-chart-bar"></i> Yearly
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box-footer clearfix">
          <ul
            id="paginationKPILevelBottom"
            class="pagination pagination-sm no-margin pull-right"
          >
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
      <!-- <listoc></listoc> -->
      <!-- endmodal -->


    </div>
  </div>
</template>

<script>
import { HTTP } from "../../http-constants";
// import listoc from "../../components/adminOC/List"
import Hierarchy from "../../components/adminOC/Hierarchy";
import listoc from "../../components/AdminOCCategoryKpi/Modal";
export default {
  name: "IndexKpi",
  data() {
    return {
      events: [],
      dataKPILV: []
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
      $(document).ready(function() {

        let seft = this;
        $("#box").fadeOut();
        categoryKPILevelAdmin.init();
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
          // source: self.source,
          source: {
            url: "http://10.4.4.224:98/AdminKPILevel/GetListTree"
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
            // event.preventDefault();
            logEvent(event, data, ", targetType=" + data.targetType);
            var node = data.node,
              $tdList = $(node.tr).find(">td");
            var level = Number($tdList.eq(0).text());
            var name = $tdList.eq(1).text();

            $("#boxCategory .kpi-name h3").text("Category list - " + name);
            $("#boxCategory .levelID").val(data.node.key);
            $("#box .catid").val("");
            $("#box .kpi-name h3").text("KPI");
            $("#box").fadeOut();
            $("#box .periodAll").hide();
            categoryKPILevelAdmin.getAllCategories(true, level, data.node.key);
            categoryKPILevelAdmin.getAllKPILevelByCategory(true, 0);
            //categoryKPILevelAdmin.loadDataKPILevel(true,data.node.key)
            //$('#box .kpi-name h3').text('KPI - ' + data.node.title);
            //$('#box .kpi-name .code').text(data.node.key);
            // categoryKPILevelAdmin.loadDataKPILevel(true, data.node.key)
            // return false to prevent default behavior (i.e. activation, ...)
            //return false;

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

      let config = {
        pageSize: 10,
        pageIndex: 1
      };

      let categoryKPILevelAdmin = {
        init: function() {
          categoryKPILevelAdmin.registerEvent();
        },
        registerEvent: function() {
          let seft = this;
          $("#boxCategory .btnCategory")
            .off("click")
            .on("click", function() {
              var catid = Number($(this).data("id"));
              var name = $(this)
                .find("span.name")
                .text();
              $("#box h3").text(name + " - KPI");
              $("#box .catid").val(catid);
              $("#box").fadeIn();
              $("#box .periodAll").show();
              categoryKPILevelAdmin.getAllKPILevelByCategory(true, catid);
            });
          $("#boxCategory .btnCategory").addClass("category2");
          $("#tblCategory tr")
            .off("click")
            .on("click", function() {
              var catName = $(this)
                .find("td:eq(1)")
                .text();
              $("#boxKPILevel .kpi-name h3").text("KPI Level - " + catName);
              var catID = $(this).data("id");

              $("#boxKPILevel .catid").val(catID);
              categoryKPILevelAdmin.getAllKPIlevels();
            });

          $("#tbluser tr td:nth-child(2) input").change(function() {
            var id = $(this)
              .parent()
              .parent("td:nth-child(2)")
              .children("div")
              .children("span.level")
              .data("id");
            var levelid = Number($("#box .kpi-name .code").text());
            if (levelid === 0) {
              warning("Please choose team!");
            } else {
              categoryKPILevelAdmin.updateUser(id, levelid);
              categoryKPILevelAdmin.loadTree();
            }
          });
          $(".kpilevelID")
            .off("change")
            .on("change", function() {
              var entity = {
                KPILevelID: $(this)
                  .closest("tr")
                  .data("id"),
                CategoryID: Number($("#boxKPILevel .catid").val())
              };
              categoryKPILevelAdmin.addCategoryLevel(entity);
            });

          //show list kpilevel

          var date = new Date();
          $("#tblkpilevel .week")
            .off("click")
            .on("click", function(e) {
              //e.preventDefault();

              let year = date.getFullYear();
              var kpilevelcode = $(this).data("kpilevelcode");
              var period = $(this).data("period");
              var end = categoryKPILevelAdmin.getDateOfWeekInYear(date);
              var catid = Number($("#box .catid").val());
              self.$router.push(
                `/ChartPeriod/${kpilevelcode}/${catid}/${period}/${year}/1/${end}`
              );
              //self.$router.push("/ChartPeriod/?kpilevelcode=" + kpilevelcode + "&catid=" + catid + "&period=" + period + "&year=" + year + "&start=1&end=" + currentWeek);
              // window.location.href = "/ChartPeriod/?kpilevelcode=" + kpilevelcode + "&catid=" + catid + "&period=" + period + "&year=" + year + "&start=1&end=" + currentWeek;
            });
          $("#tblkpilevel .month")
            .off("click")
            .on("click", function(e) {
              //e.preventDefault();
              let seft = this;
              var kpilevelcode = $(this).data("kpilevelcode");
              var period = $(this).data("period");
              let year = date.getFullYear();
              var start = date.getMonth();
              var end = date.getMonth();
              var catid = Number($("#box .catid").val());
              // self.$router.push("/ChartPeriod/?kpilevelcode=" + kpilevelcode + "&catid=" + catid + "&period=" + period + "&year=" + year + "&start=1&end=" + end);
              //self.$router.push(`/ChartPeriod/${seft.kpilevelcode}/${seft.catid}/${seft.period}/${seft.year}/1/${seft.end}`);
              self.$router.push(
                `/ChartPeriod/${kpilevelcode}/${catid}/${period}/${year}/1/${end}`
              );
            });
          $("#tblkpilevel .quarter")
            .off("click")
            .on("click", function(e) {
              //e.preventDefault();
              var kpilevelcode = $(this).data("kpilevelcode");
              var period = $(this).data("period");
              let year = date.getFullYear();
              let end = categoryKPILevelAdmin.getCurrentQuarter(date);
              var catid = Number($("#box .catid").val());

              self.$router.push(
                `/ChartPeriod/${kpilevelcode}/${catid}/${period}/${year}/1/${end}`
              );
            });
          $("#tblkpilevel .year")
            .off("click")
            .on("click", function(e) {
              //e.preventDefault();
              var kpilevelcode = $(this).data("kpilevelcode");
              var period = $(this).data("period");
              let year = date.getFullYear();
              var catid = Number($("#box .catid").val());
              self.$router.push(
                `/ChartPeriod/${kpilevelcode}/${catid}/${period}/${year}/${year}/${year}`
              );
              //window.location.href = "/ChartPeriod/?kpilevelcode=" + kpilevelcode + "&catid=" + catid + "&period=" + period + "&year=" + year + "&start=" + year + "&end=" + year ;
            });

          $("#box .periodAll .weeklyperiod")
            .off("click")
            .on("click", function(e) {
              var period = $(this).data("period");
              var catid = Number($("#box .catid").val());
              categoryKPILevelAdmin.getAllDataByCategory(catid, period);
            });

          $("#box .periodAll .monthlyperiod")
            .off("click")
            .on("click", function(e) {
              var period = $(this).data("period");
              var catid = Number($("#box .catid").val());
              categoryKPILevelAdmin.getAllDataByCategory(catid, period);
            });

          $("#box .periodAll .quarterlyperiod")
            .off("click")
            .on("click", function(e) {
              var period = $(this).data("period");
              var catid = Number($("#box .catid").val());
              categoryKPILevelAdmin.getAllDataByCategory(catid, period);
            });

          $("#box .periodAll .yearlyperiod")
            .off("click")
            .on("click", function(e) {
              var period = $(this).data("period");
              var catid = Number($("#box .catid").val());
              categoryKPILevelAdmin.getAllDataByCategory(catid, period);
            });
        },
        loadTree: function() {
          $.ui.fancytree
            .getTree("#treetable")
            .reload()
            .done();
        },
        getAllKPILevelByCategory: function(changePageSize, category) {
          HTTP.get(
            `CategoryKPILevel/getAllKPILevelByCategory/${category}/${config.pageIndex}/${config.pageSize}`
          ).then(response => {
            if (response.status) {
              var count = 1;
              var data = response.data;
              self.dataKPILV = response.data.data;
              console.log(self.dataKPILV);
              console.log(response);
              categoryKPILevelAdmin.pagingKPILevel(
                response.data.total,
                function() {
                  categoryKPILevelAdmin.getAllKPILevelByCategory("", category);
                },
                changePageSize
              );
              categoryKPILevelAdmin.registerEvent();
            }
          });
          // $.ajax({
          //   url: `http://10.4.4.224:98/CategoryKPILevel/getAllKPILevelByCategory/${category}/${config.pageIndex}/${config.pageSize}`,
          //   type: "GET",
          //   data: {
          //       category: category,
          //       page: config.pageIndex,
          //       pageSize: config.pageSize
          //   },
          //   dataType: "json",
          //   success: function (response) {
          //     console.log(response);
          //     if (response.status) {
          //       var count = 1;
          //       var data = response.data;
          //       self.dataKPILV = response.data;
          //       console.log(self.dataKPILV)
          //       categoryKPILevelAdmin.pagingKPILevel(response.total, function () {
          //         categoryKPILevelAdmin.getAllKPILevelByCategory("", category);
          //       }, changePageSize);
          //       categoryKPILevelAdmin.registerEvent();
          //     }
          //   },
          //   error: function (err) {
          //     console.log(err);
          //   }
          // });
        },
        getAllCategories: function(changePageSize, level, ocID) {
          HTTP.get(
            `CategoryKPILevel/GetAllCategories/${ocID}/${level}/${config.pageIndex}/${config.pageSize}`
          ).then(response => {
            if (response.status) {
              if (response.data.length === 0) {
                console.log("Not available!");
              }
              var data = response.data;
              self.events = response.data.data;
              console.log(self.events);
              console.log(response.data);
              console.log(response.data.total);
              categoryKPILevelAdmin.pagingCategoryKPILevel(
                response.data.total,
                function() {
                  categoryKPILevelAdmin.getAllCategories("", level, ocID);
                },
                changePageSize
              );
              categoryKPILevelAdmin.registerEvent();
            }
          });
          // $.ajax({
          //     url: `http://10.4.4.224:98/CategoryKPILevel/GetAllCategories/${ocID}/${level}/${config.pageIndex}/${config.pageSize}`,
          //     type: "GET",
          //     // data: {
          //     //   ocID:ocID,
          //     //   level: level,
          //     //   page: config.pageIndex,
          //     //   pageSize: config.pageSize
          //     // },
          //     dataType: "json",
          //     success: function (response) {
          //       console.log(response)
          //       if (response.status) {
          //         if (response.data.length === 0) {
          //           console.log("Not available!")
          //         }
          //         var data = response.data;
          //         self.events =response.data;
          //         console.log(self.events)
          //         categoryKPILevelAdmin.pagingCategoryKPILevel(response.total, function () {
          //           categoryKPILevelAdmin.getAllCategories("", level,ocID);
          //         }, changePageSize);
          //         categoryKPILevelAdmin.registerEvent();
          //       }
          //     },
          //     error: function (err) {
          //       console.log(err);
          //     }
          // });
        },
        pagingCategoryKPILevel: function(totalRow, callback, changePageSize) {
          var totalPage = Math.ceil(totalRow / config.pageSize);

          //Unbind pagination if it existed or click change pagesize
          if (
            $("#paginationCategoryKPILevel a").length === 0 ||
            changePageSize === true
          ) {
            $("#paginationCategoryKPILevel").empty();
            $("#paginationCategoryKPILevel").removeData("twbs-pagination");
            $("#paginationCategoryKPILevel").unbind("page");
          }

          $("#paginationCategoryKPILevel").twbsPagination({
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
        pagingKPILevel: function(totalRow, callback, changePageSize) {
          var totalPage = Math.ceil(totalRow / config.pageSize);

          //Unbind pagination if it existed or click change pagesize
          if (
            $("#paginationKPILevelTop a,#paginationKPILevelBottom a").length ===
              0 ||
            changePageSize === true
          ) {
            $("#paginationKPILevelTop,#paginationKPILevelBottom").empty();
            $("#paginationKPILevelTop,#paginationKPILevelBottom").removeData(
              "twbs-pagination"
            );
            $("#paginationKPILevelTop,#paginationKPILevelBottom").unbind(
              "page"
            );
          }

          $("#paginationKPILevelTop, #paginationKPILevelBottom").twbsPagination(
            {
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
            }
          );
        },
        getAllDataByCategory: function(catid, period) {
          let date = new Date();
          let year = date.getFullYear();
          let week = this.getDateOfWeekInYear(date);
          let month = date.getMonth();
          let quarter = this.getCurrentQuarter(date);
          let startYear = year - 5;
          //window.location.href = "/Dataset/?catid=" + catid + "&period=" + period
          if (period.toLowerCase() === "w")
            self.$router.push(`/dataset/${catid}/w/1/${week}/${year}`);
          // window.location.href = `/dataset/${catid}/w/1/${week}/${year}`;
          if (period.toLowerCase() === "m")
            self.$router.push(`/dataset/${catid}/m/1/${month}/${year}`);
          if (period.toLowerCase() === "q")
            self.$router.push(`/dataset/${catid}/q/1/${quarter}/${year}`);
          if (period.toLowerCase() === "y")
            self.$router.push(
              `/dataset/${catid}/y/${startYear}/${year}/${year}`
            );
        },
        getDateOfWeekInYear(dt) {
          let tdt = new Date(dt.valueOf());
          let dayn = (dt.getDay() + 6) % 7;
          tdt.setDate(tdt.getDate() - dayn + 3);
          let firstThursday = tdt.valueOf();
          tdt.setMonth(0, 1);
          if (tdt.getDay() !== 4) {
            tdt.setMonth(0, 1 + ((4 - tdt.getDay() + 7) % 7));
          }
          return 1 + Math.ceil((firstThursday - tdt) / 604800000);
        },
        getCurrentQuarter(d) {
          d = d || new Date();
          let m = Math.floor(d.getMonth() / 3) + 2;
          return m > 4 ? m - 4 : m;
        }
      };
    }
  }
};
</script>
