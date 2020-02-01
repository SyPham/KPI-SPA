<template>
  <div id="app-category">
    <div class="card" id="boxCategory">
      <div class="card-header with-border kpi-name">
        <h3 style="font-size:18px" class="box-title pull-left">
          Category lists
        </h3>
        <span class="id" style="display:none"></span>
        <span class="code" style="display:none"></span>
        <span class="level" style="display:none"></span>
        <input type="text" class="form-control levelID" style="display:none" />
        <!-- <select class="form-control pull-right" style="width:50%"></select> -->
      </div>
      <div
        class="card-body pb-3"
        id="btnCategory"
        style="max-height:210px;overflow-y:scroll"
      >
        <button
          v-for="(item, key, index) in data"
          :key="index"
          class="btn mb-2 btn-sm btnCategory category2 ml-2 rounded-pill text-white font-weight-bold"
          :data-id="item.ID"
          @click="changeCategoryId(item.ID)"
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
  </div>
</template>

<script>
import { HTTP } from "../../http-constants";
import EventBus from "../../utils/EventBus.js";
export default {
  name: "app-category",
  props: {
    level: Number,
    ocID: Number
  },
  data() {
    return {
      data: [],
      pageIndex: 1,
      pageSize: 10
    };
  },
  methods: {
    changeCategoryId(catId) {
      EventBus.$emit("CatWasEdit", catId);
    },
    getAllCategories() {
      let self = this;
      axios.get(
        `CategoryKPILevel/GetAllCategories/${self.ocID}/${self.level}/${self.pageIndex}/${self.pageSize}`
      ).then(response => {
        if (response.data.status) {
          self.data = response.data.data;

          console.log(response.data.data);
          self.registerEvent();
        }
      });
    },
    registerEvent() {
      let self = this;
      $("#boxCategory .btnCategory")
        .off("click")
        .on("click", function(e) {
          var catid = Number($(this).data("id"));
          var name = $(this)
            .find("span.name")
            .text();
          $("#box h3").text(name + " - KPI");
          $("#box .catid").val(catid);
          $("#box").fadeIn();
          $("#box .periodAll").show();
          //self.getAllKPILevelByCategory(true, catid);
        });
      //To dam dong da click
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
          self.getAllKPIlevels();
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
          var end = self.getDateOfWeekInYear(date);
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
          let self = this;
          var kpilevelcode = $(this).data("kpilevelcode");
          var period = $(this).data("period");
          let year = date.getFullYear();
          var start = date.getMonth();
          var end = date.getMonth();
          var catid = Number($("#box .catid").val());
          // self.$router.push("/ChartPeriod/?kpilevelcode=" + kpilevelcode + "&catid=" + catid + "&period=" + period + "&year=" + year + "&start=1&end=" + end);
          //self.$router.push(`/ChartPeriod/${self.kpilevelcode}/${self.catid}/${self.period}/${self.year}/1/${self.end}`);
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
          let end = self.getCurrentQuarter(date);
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
          self.getAllDataByCategory(catid, period);
        });

      $("#box .periodAll .monthlyperiod")
        .off("click")
        .on("click", function(e) {
          var period = $(this).data("period");
          var catid = Number($("#box .catid").val());
          self.getAllDataByCategory(catid, period);
        });

      $("#box .periodAll .quarterlyperiod")
        .off("click")
        .on("click", function(e) {
          var period = $(this).data("period");
          var catid = Number($("#box .catid").val());
          self.getAllDataByCategory(catid, period);
        });

      $("#box .periodAll .yearlyperiod")
        .off("click")
        .on("click", function(e) {
          var period = $(this).data("period");
          var catid = Number($("#box .catid").val());
          self.getAllDataByCategory(catid, period);
        });
    }
  },
  created() {
    let self = this;
    self.getAllCategories();
  },
  watch: {
    level: function(newVal, oldVal) {
      let self = this;
      self.level = newVal;
      self.getAllCategories();
    },
    ocID: function(newVal, oldVal) {
      let self = this;
      self.ocID = newVal;
      self.getAllCategories();
    }
  }
};
</script>

<style lang="scss" scoped></style>
