<template>
  <div>
    <section id="chartperiod">
      <div class="row">
        <div class="col-md-12">
          <!-- LINE CHART -->
          <div class="box box-widget">
            <div class="box-header with-border">
              <h3 class="box-title" style="font-weight:bold" >KPI Compare Chart - {{kpiname}} - {{period}}</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse">
                  <i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool">
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            <div class="box-body">
              <button
                type="button"
                class="btn margin pull-right"
                style="background-color:#09a99f;color:#fff"
              >
                <i class="fa fa-star"></i>
                <span>Target :</span>
                <span class="standard text-bold" style>standard</span>
              </button>
              <button
                type="button"
                class="btn margin pull-right"
                style="background-color:#09a99f;color:#fff"
              >
                <i class="fa fa-star"></i>
                <span>Target :</span>
                <span class="standard text-bold" style>chartVM2s.targets</span>
              </button>
              <div class="chart">
                <canvas id="planet-chart" style="height:500px"></canvas>
              </div>
            </div>
          </div>
        </div>
        <!-- not use -->
        <div class="col-md-12" style="display:none">
          <div class="col-md-12">
            <div class="box box-widget">
              <div class="box-header with-border">
                <h3 class="box-title" style="font-weight:bold">Data - kpiname - Weekly</h3>
                <h3 class="box-title" style="font-weight:bold">Data - kpiname - Monthly</h3>
                <h3 class="box-title" style="font-weight:bold">Data - kpiname - Quarterly</h3>
                <h3 class="box-title" style="font-weight:bold">Data - kpiname - Yearly</h3>
              </div>
              <!-- /.box-header -->
              <div class="box-body">
                <div class="table-responsive">
                  <table class="table table-bordered" style="margin-bottom:20px;" id="tblkpi">
                    <tbody>
                      <tr></tr>
                      <tr></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- not use -->
      </div>
    </section>
  </div>
</template>
<script>
import { HTTP } from "../../http-constants";
import VueJwtDecode from "vue-jwt-decode";
import LineChart from "../../utils/ChartJs/LineChart";
import { initLineChart } from "../../plugins/LineChartPlugin";
import planetChartData from "../../plugins/Chartjs2/Demo";
export default {
  data() {
    return {
      chart: {},
      planetChartData: planetChartData,
      datacollection: {},
      weekly: [],
      years: [],
      data: [],
      kpiname: "",
      datasets: [],
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
    };
  },
  mounted() {
    let seft = this
    // seft.createChart("planet-chart");
    seft.createChart("planet-chart", seft.datasets, seft.targets, seft.labels);
  },
  created() {
      let seft = this
      seft.LoadDataCompare();
  },
  methods: {
    convertPeriod(period) {
        switch (period) {
          case "M":
            return "Monthly";
          case "W":
            return "Weekly";
          case "Q":
            return "Quarterly";
          case "Y":
            return "Yearly";
        }
      return "N/A";
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
              borderWidth: 3,
              fill: false,
            },
            {
              // another line graph
              label: "CB",
              data: datasets,
              backgroundColor: "#182657",
              borderColor: "#182657",
              borderWidth: 4,
              fill: false,
            }
          ]
        },
        options: seft.options
      });
      seft.chart = myChart;
      console.log(seft.chart);
    },
    LoadDataCompare(){
        let seft = this
        HTTP.get(`Compare/Compare/${seft.$route.params.obj}`)
        .then(r=>{
            console.log(r.data)
            seft.kpiname = r.data[0].kpiname
            seft.period = seft.convertPeriod(r.data[0].period)
            console.log(seft.period)
            seft.datasets  = r.data[0].datasets;

            seft.label = r.data[0].label;
            // console.log(seft.datasets)
            seft.labels = r.data[0].labels;
            seft.targets = r.data[0].targets;
            console.log(seft.label)
            seft.createChart(
                "planet-chart",
                seft.datasets,
                seft.targets,
                seft.labels,
                seft.label,
                seft.unit
          );
        })
    }
  }
};
</script>