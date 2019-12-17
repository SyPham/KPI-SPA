<template>
  <div>
    <section id="chartperiod" class="animatedParent">
      <div class="row">
        <div class="col-md-12"></div>
        <div class="col-md-12">
          <!-- LINE CHART -->
          <div class="box box-widget">
            <div class="box-header with-border">
              <h3
                v-if="period == 'W'"
                class="box-title"
                style="font-weight:bold"
              >KPI Chart - {{kpiname}} - Weekly</h3>
              <h3
                v-if="period == 'M'"
                class="box-title"
                style="font-weight:bold"
              >KPI Chart - {{kpiname}} - Monthly</h3>
              <h3
                v-if="period == 'Q'"
                class="box-title"
                style="font-weight:bold"
              >KPI Chart - {{kpiname}} - Quarterly</h3>
              <h3
                v-if="period == 'Y'"
                class="box-title"
                style="font-weight:bold"
              >KPI Chart - {{kpiname}} - Yearly</h3>
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-7">
                  <div class="row">
                    <div class="col-md">
                      <div class="form-group">
                        <label class="my-1 mr-2" for="startMonth">Year</label>
                        <select
                          v-model="searchyear"
                          class="custom-select form-control year my-1 mr-sm-2"
                          id="monthOfYear"
                        >
                          <option value="0" selected>Choose...</option>
                          <option
                            v-for="(n, key, index) in 100"
                            :key="index"
                            :value="2000 + n"
                          >Year {{2000 + n}}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md">
                      <div class="form-group">
                        <label class="my-1 mr-2" for="startMonth">Start</label>
                        <select
                          v-model="vstart"
                          class="custom-select form-control my-1 mr-sm-2"
                          id="startMonth"
                        >
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
                      </div>
                    </div>
                    <div class="col-md">
                      <div class="form-group">
                        <label class="my-1 mr-2" for="endMonth">End</label>
                        <select
                          v-model="vend"
                          class="custom-select form-control my-1 mr-sm-2"
                          id="endMonth"
                        >
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
                      </div>
                    </div>
                    <div class="col-md">
                      <div class="form-group">
                        <label class="my-1 mr-2" style="color:#fff" for="endMonth">asd</label>
                        <button
                          type="button"
                          @click="searchyear='', vstart='',vend=''"
                          class="btn bg-teal my-1 mr-sm-2 form-control margin btnClearSearch"
                        >
                          <i class="fa fa-remove"></i> Reset
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="form-inline"
                    :style="period ==  'M' ? 'display:block':'display:none'"
                    id="searchMonth"
                  ></div>
                </div>
                <div class="col-md-5">
                  <div class="float-right mt-5">
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#modal-group"
                      class="btn btn-danger margin btnLike pull-right"
                      id="btnCompare"
                    >
                      <i class="fa fa-adjust"></i> Compare
                    </button>

                    <button
                      v-if="!this.statusfavorite"
                      type="button"
                      class="btn margin btnLike bg-navy pull-right"
                      id="btnLike"
                    >
                      <i class="fa fa-heart"></i> Add Favourite
                    </button>

                    <button
                      v-else
                      type="button"
                      class="btn btn-default margin btnLike pull-right disabled"
                      disabled
                      id="btnLike"
                    >
                      <i class="fa fa-heart"></i> Added Favourite
                    </button>
                  </div>
                </div>
              </div>

              <!-- week  -->
              <div
                class="form-inline"
                :style="period ==  'W' ? 'display:block':'display:none'"
                id="searchWeek"
              >
                <label class="my-1 mr-2" for="startMonth">Year</label>
                <select class="custom-select form-control year my-1 mr-sm-2" id="weekOfYear">
                  <option value="0" selected>Choose...</option>
                  <option
                    v-for="(n, key, index) in 100"
                    :key="index"
                    :value="2000 + n"
                  >Year {{2000 + n}}</option>
                </select>
                <label class="my-1 mr-2" for="startWeek">Week Start</label>
                <select class="custom-select form-control year my-1 mr-sm-2" id="startWeek">
                  <option value="0" selected>Choose...</option>
                  <option v-for="(n, key, index) in 53" :key="index" :value="n">Week {{n}}</option>
                </select>

                <label class="my-1 mr-2" for="endWeek">Week End</label>
                <select class="custom-select form-control year my-1 mr-sm-2" id="endWeek">
                  <option value="0" selected>Choose...</option>
                  <option v-for="(n, key, index) in 53" :key="index" :value=" n">Week {{ n}}</option>
                </select>

                <button type="button" class="btn bg-teal margin btnClearSearch">
                  <i class="fa fa-remove"></i> Reset search
                </button>
              </div>
              <!-- @* Quarter *@ -->
              <div
                class="form-inline"
                :style="period ==  'Q' ? 'display:block':'display:none'"
                id="searchQuarter"
              >
                <label class="my-1 mr-2" for="startMonth">Year</label>
                <select class="custom-select form-control year my-1 mr-sm-2" id="quarterOfYear">
                  <option value="0" selected>Choose...</option>
                  <option
                    v-for="(n, key, index) in 100"
                    :key="index"
                    :value="2000 + n"
                  >Year {{2000 + n}}</option>
                </select>
                <label class="my-1 mr-2" for="startMonth">Start</label>
                <select class="custom-select form-control my-1 mr-sm-2" id="startQuarter">
                  <option value="0" selected>Choose...</option>
                  <option
                    v-for="(n, key, index)  in 4"
                    :selected="start == n ? true : false"
                    :key="index"
                    :value=" n"
                  >Quarter {{n}}</option>
                </select>
                <label class="my-1 mr-2" for="endMonth">End</label>
                <select class="custom-select form-control my-1 mr-sm-2" id="endQuarter">
                  <option value="0" selected>Choose...</option>
                  <option
                    v-for="(n, key, index)  in 4"
                    :selected="end == n ? true : false"
                    :key="index"
                    :value=" n"
                  >Quarter {{n}}</option>
                </select>
                <button type="button" class="btn bg-teal margin btnClearSearch">
                  <i class="fa fa-remove"></i> Reset search
                </button>
              </div>
              <!-- @* Year *@ -->
              <div
                class="form-inline"
                :style="period ==  'Y' ? 'display:block':'display:none'"
                id="searchYear"
              >
                <label class="my-1 mr-2" for="YearOfYear">Year</label>
                <select class="custom-select form-control year my-1 mr-sm-2" id="YearOfYear">
                  <option value="0" selected>Choose...</option>
                  <option
                    v-for="(n, key, index) in 100"
                    :key="index"
                    :value="2000 + n"
                  >Year {{2000 + n}}</option>
                </select>
                <label class="my-1 mr-2" for="startMonth">Start</label>

                <select class="custom-select form-control year my-1 mr-sm-2" id="startYear">
                  <option value="0" selected>Choose...</option>
                  <option
                    v-for="(n, key, index) in 100"
                    :key="index"
                    :value="2000 + n"
                  >Year {{2000 + n}}</option>
                </select>
                <label class="my-1 mr-2" for="endMonth">End</label>
                <select class="custom-select form-control year my-1 mr-sm-2" id="endYear">
                  <option value="0" selected>Choose...</option>
                  <option
                    v-for="(n, key, index) in 100"
                    :key="index"
                    :value="2000 + n"
                  >Year {{2000 + n}}</option>
                </select>

                <button type="button" class="btn bg-teal margin btnClearSearch">
                  <i class="fa fa-remove"></i> Reset search
                </button>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-inline">
                    <label class="my-1 mr-2" for="startMonth">Step</label>
                    <input
                      type="number"
                      class="form-control"
                      min="0"
                      step="0"
                      v-model="stepSize"
                      id="stepChart"
                      @change="stepChart"
                      style="width:70px"
                    />
                    <label class="my-1 mr-2" for="endMonth">Min</label>
                    <input
                      type="number"
                      class="form-control"
                      min="0"
                      step="0"
                      v-model="min"
                      id="minChart"
                      @change="minChart"
                      style="width:70px"
                    />

                    <button
                      type="button"
                      @click="hiddenData()"
                      class="btn btn-sm bg-navy margin btnHiddenData"
                    >Hide Data</button>
                    <button
                      type="button"
                      @click="showData()"
                      class="btn btn-sm bg-success margin btnShowData"
                    >Show Data</button>
                  </div>
                </div>
                <div class="col-md-8">
                  <button type="button" class="btn btn-sm bg-navy margin">
                    Manager:
                    <strong>{{OwnerManagerment}}</strong>
                  </button>
                  <button type="button" class="btn btn-sm bg-navy margin">
                    Owner:
                    <strong>{{Owner}}</strong>
                  </button>
                  <button type="button" class="btn btn-sm bg-navy margin">
                    Updater:
                    <strong>{{PIC}}</strong>
                  </button>
                  <button type="button" class="btn btn-sm bg-navy margin">
                    Sponsor:
                    <strong>{{Sponsor}}</strong>
                  </button>
                  <button type="button" class="btn btn-sm bg-navy margin">
                    Participant:
                    <strong>{{Participant}}</strong>
                  </button>
                </div>
              </div>
              <!-- Chartjs -->
              <div class="chart">
                <canvas id="planet-chart" style="height:500px"></canvas>
                <!-- <line-chart :chart-data="datacollection" :options="options"></line-chart> -->
              </div>
            </div>
            <div class="box-footer">
              <p
                class="text-bold"
                style="font-size:16px;color:green;display:none"
                id="fromDateEndDate"
              >
                <span class="fromDayOfWeek"></span>
                <span class="endDayOfWeek"></span>
              </p>
              <p
                class="text-bold"
                style="font-size:16px;color:green;display:none"
                id="fromDateEndDateM"
              >
                <span class="fromDayOfMonth"></span>
                <span class="endDayOfMonth"></span>
              </p>
              <p
                class="text-bold"
                style="font-size:16px;color:green;display:none"
                id="fromDateEndDateQ"
              >
                <span class="fromDayOfQuarter"></span>
                <span class="endDayOfQuarter"></span>
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="box box-widget">
            <div class="box-header with-border">
              <h3
                v-if="period == 'W'"
                class="box-title"
                style="font-weight:bold"
              >Data - {{kpiname}} - Weekly</h3>
              <h3
                v-if="period == 'M'"
                class="box-title"
                style="font-weight:bold"
              >Data - {{kpiname}} - Monthly</h3>
              <h3
                v-if="period == 'Q'"
                class="box-title"
                style="font-weight:bold"
              >Data - {{kpiname}} - Quarterly</h3>
              <h3
                v-if="period == 'Y'"
                class="box-title"
                style="font-weight:bold"
              >Data - {{kpiname}} - Yearly</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <div class="table-responsive">
                <table class="table table-bordered" style="margin-bottom:20px;" id="tblDataChart">
                  <tbody>
                    <tr>
                      <th v-if="period == 'W'" class="text-center" width="5%">Week</th>
                      <th v-if="period == 'M'" class="text-center" width="5%">Month</th>
                      <th v-if="period == 'Q'" class="text-center" width="5%">Quater</th>
                      <th v-if="period == 'Y'" class="text-center" width="5%">Year</th>
                      <th
                        v-for="(item,key,index) in labels "
                        :key="index"
                        class="text-center"
                      >{{item}}</th>
                    </tr>
                    <tr>
                      <th class="text-center" width="5%">Target</th>
                      <td
                        v-for="(item,key,index) in dataremarks "
                        :key="index"
                        :class="item.Value == 0 ? ' text-center active-td' : 'active-td2 text-center'"
                        :data-id="item.ID"
                        @click="opencomment"
                      >{{item.Value}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <comment></comment>
      <!-- @RenderPage("_Modal.cshtml") -->
    </section>
  </div>
</template>
<script>
import { HTTP } from "../../http-constants";
import LineChart from "../../utils/ChartJs/LineChart";
import { initLineChart } from "../../plugins/LineChartPlugin";
import planetChartData from "../../plugins/Chartjs2/Demo";
import Comment from "../ChartPeriod/Modal";
export default {
  data() {
    return {
      OwnerManagerment: "",
      Owner: "",
      PIC: "",
      Sponsor: "",
      Participant: "",
      vstart: 0,
      vend: 0,
      chart: {},
      min: 1,
      stepSize: 10,
      planetChartData: planetChartData,
      datacollection: {},
      weekly: [],
      years: [],
      data: [],
      start: 0,
      kpiname: "",
      end: 0,
      datasets: {},
      period: "",
      unit: "",
      labels: [],
      targets: [],
      standards: [],
      dataremarks: [],
      statusfavorite: true,
      dataCharts: {},
      options: {
        plugins: {
          datalabels: {
            backgroundColor: function(context) {
              return context.dataset.backgroundColor;
            },
            borderRadius: 4,
            color: "white",
            font: {
              weight: "bold"
            },
            formatter: function(value, context) {
              return value;
            }
          }
        },
        scales: {
          yAxes: [
            {
              stacked: true
            }
          ]
        },
        title: {
          display: true,
          text: "",
          fontSize: 20,
          fontColor: "black"
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0.2
          }
        },
        scales: {
          yAxes: [
            {
              display: true,
              position: "left",
              ticks: {
                beginAtZero: true,
                padding: 10,
                fontSize: 12,
                stepSize: 10,
                min: 0
              },
              scaleLabel: {
                display: true,
                labelString: this.unit,
                fontSize: 12,
                fontStyle: "normal"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
                tickMarkLength: 8
              },
              ticks: {
                fontSize: 12
              },
              scaleLabel: {
                display: true,
                labelString: this.period,
                fontSize: 12,
                fontStyle: "normal"
              }
            }
          ]
        }
      },
      searchyear: 0
    };
  },
  components: {
    LineChart,
    Comment
  },
  mounted() {
    // seft.createChart("planet-chart");
  },
  created() {
    let seft = this;
    seft.period = seft.$route.params.period;
    seft.start = seft.$route.params.start;
    seft.end = seft.$route.params.end;
    seft.Loadchart();
    seft.createChart("planet-chart", seft.datasets, seft.targets, seft.labels);
  },
  watch: {
    searchyear: function(newOld, oldVal) {
      let seft = this;
      this.$router.replace({
        name: "chart",
        params: { year: seft.searchyear }
      });
      seft.Loadchart();
    },
    vstart: function(newOld, oldVal) {
      let seft = this;
      this.$router.replace({ name: "chart", params: { start: seft.vstart } });
      seft.Loadchart();
    },
    vend: function(newOld, oldVal) {
      let seft = this;
      this.$router.replace({ name: "chart", params: { end: seft.vend } });
      seft.Loadchart();
    }
  },
  methods: {
    remark(id) {
      $.post("https://localhost:44309/ChartPeriod/Remark", { dataid: id }, function (data) {
        console.log(data)
        var result = data.model;
        var userid = $('#user').data('userid');
        var users = [],username,fullname;
        var arrays = data.users;
        $.each(arrays, function (i,item) {
            users.push({
                username: item.Username,
                fullname:item.FullName
            })
        })
        console.log(users)
      });
    },
    opencomment(e) {
      console.log(e);
      let seft = this
      if (e.toElement.classList[1] === "active-td") {
        let number = Number(e.text),
          period = $("#tblDataChart tr:nth-child(1) th:nth-child(1)").text();
        $("#modal-group-comment-data").modal("show");
        
        var id = e.toElement.dataset.id;
        console.log(id)
        $(".dataid").text(id);

        $(".RemarkChart").text("");

        // $(".RemarkChart").text(
        //   "Remark - " + period + " " + value + " - KPI Chart - @models.kpiname - " + periodText("@models.period")
        // );

        self.remark(id);

        //Khi tao ra table roi thi moi load data
        // chartperiodController.loadDataComment();
      }
    },
    hiddenData() {
      let seft = this;
      seft.chart.options.plugins.datalabels = {
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },
        borderRadius: 4,
        color: "white",
        font: {
          weight: "bold",
          size: 12
        },
        formatter: function(value, context) {
          return false;
        },
        display: function(context) {
          return false;
        }
      };
      seft.chart.update();
      $(".btnHiddenData").hide();
      $(".btnShowData").show();
    },
    showData() {
      let seft = this;
      seft.chart.options = seft.options;
      seft.chart.update();
      $(".btnHiddenData").show();
      $(".btnShowData").hide();
    },
    minChart() {
      let seft = this;
      seft.options.scales.yAxes[0].ticks.min = Number(seft.min);
      // //Update chartjs
      seft.chart.options = seft.options;
      seft.chart.update();
    },
    stepChart() {
      let seft = this;
      seft.options.scales.yAxes[0].ticks.stepSize = seft.stepSize;
      // //Update chartjs
      seft.chart.options = seft.options;
      seft.chart.update();
    },
    createChart(chartId, datasets, targets, labels, label, unit) {
      let seft = this;
      let pluginsDatasets = {
        datalabels: {
          backgroundColor: function(context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 4,
          color: "white",
          font: {
            weight: "bold",
            size: 12
          },
          formatter: function(value, context) {
            return value;
          },
          display: function(context) {
            //return context.dataset.label !=="Target" && context.dataset.label !=="Target";
          },
          id: "p1"
        }
      };
      const ctx = document.getElementById(chartId);

      const myChart = new Chart(ctx, {
        type: "line",
        labels: labels,
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              spanGaps: true, //data=undefined thi k draw line
              backgroundColor: "#e7263b ",
              pointBackgroundColor: "#e7263b",
              borderColor: "#e7263b ",
              fill: false,
              data: datasets,
              datalabels: {
                align: "center",
                anchor: "center"
              }
            },
            {
              // another line graph
              label: "Targets",
              data: targets,
              backgroundColor: "#3c8d8a",
              borderColor: "#3c8d8a",
              borderWidth: 3
            }
          ]
        },
        options: seft.options
      });
      seft.chart = myChart;
      console.log(seft.chart);
    },
    convertPeriod(period) {
      switch (period) {
        case "M":
          return "Months In Year";
        case "W":
          return "Weeks In Year";
        case "Q":
          return "Quarters In Year";
        case "Y":
          return "Years In Year";
      }
      return "N/A";
    },

    Loadchart() {
      let seft = this;
      $.ajax({
        url: "http://10.4.4.224:98/ChartPeriod/ListDatas",
        type: "GET",
        data: {
          kpilevelcode: seft.$route.params.kpilevelcode,
          catid: seft.$route.params.catid,
          period: seft.$route.params.period,
          year: seft.$route.params.year,
          start: seft.$route.params.start,
          end: seft.$route.params.end
        },
        dataType: "json",
        success: function(response) {
          console.log(response);

          seft.statusfavorite = response.statusfavorite;
          seft.unit = response.Unit;
          seft.datasets = response.datasets;
          seft.labels = response.labels;
          seft.label = response.label;
          seft.kpiname = response.kpiname;
          seft.PIC = response.PIC;
          // console.log(seft.PIC)
          seft.Owner = response.Owner;
          seft.OwnerManagerment = response.OwnerManagerment;
          seft.Sponsor = response.Sponsor;
          seft.Participant = response.Participant;
          seft.dataremarks = response.Dataremarks;
          seft.targets = response.targets;

          (seft.options.label = response.label),
            (seft.options.title.text =
              "KPI Chart -" + response.label + " - " + response.kpiname),
            (seft.options.scales.yAxes[0].scaleLabel.labelString =
              response.Unit);
          seft.options.scales.xAxes[0].scaleLabel.labelString = seft.convertPeriod(
            response.period
          );

          seft.createChart(
            "planet-chart",
            seft.datasets,
            seft.targets,
            seft.labels,
            seft.label,
            seft.unit
          );
          var lastDataset = seft.datasets[seft.datasets.length - 1],
            lastTarget = seft.targets[seft.targets.length - 1];

          if (lastDataset <= lastTarget) {
            seft.chart.data.datasets[0].backgroundColor = "#e7263b";
            seft.chart.data.datasets[0].borderColor = "#e7263b";
            seft.chart.data.datasets[0].pointBorderColor = "#e7263b";
            seft.chart.update();
          } else {
            seft.chart.data.datasets[0].borderColor = "green";
            seft.chart.data.datasets[0].pointBorderColor = "green";
            seft.chart.data.datasets[0].backgroundColor = "green";

            seft.chart.update();
          }
          $("#editBugModal").modal("show");
          $(".btnShowData").hide();
          // console.log(seft.chart.data);
        }
      });
    }
  }
};
</script>