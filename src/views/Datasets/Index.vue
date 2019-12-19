<template>
    <div>
        <div class="row">
    <div class="col-xs-12">
        <div class="box boxDataset boxdataset-scrollbar" id="box">
            <div class="box-header">
                <h3 class="box-title">Datasets</h3>

            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding" id="tblDataset">
                <div class="col-md-12">
                    <!-- @* month *@ -->
                    <div class="form-inline"  id="searchMonth">
                        <label class="my-1 mr-2" for="startMonth">Year</label>
                        <select class="custom-select form-control year my-1 mr-sm-2" id="monthOfYear">
                            <option value="0" selected>Choose...</option>
                             <option
                                v-for="(n, key, index) in 100"
                                :key="index"
                                :value="2000 + n"
                                >Year {{2000 + n}}
                            </option>
                        </select>
                        <label class="my-1 mr-2" for="startMonth">Start</label>
                        <select class="custom-select form-control my-1 mr-sm-2" id="startMonth">
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
                        <select class="custom-select form-control my-1 mr-sm-2" id="endMonth">
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
                        <button type="button" class="btn bg-teal margin btnClearSearch"><i class="fa fa-remove"></i> Reset search</button>
                    </div>

                    <!-- @* week *@ -->
                    <div class="form-inline" style="display:none" id="searchWeek">
                        <label class="my-1 mr-2" for="startMonth">Year</label>
                        <select class="custom-select form-control year my-1 mr-sm-2" id="weekOfYear">
                            <option value="0" selected>Choose...</option>
                            
                                    <option value="@i">Year </option>
                             
                        </select>
                        <label class="my-1 mr-2" for="startWeek">Week Start</label>
                        <select class="custom-select form-control my-1 mr-sm-2" id="startWeek">
                            <option value="0" selected>Choose...</option>
                           
                                    <option value="@i">Week </option>
                            
                        </select>
                        <label class="my-1 mr-2" for="endWeek">Week End</label>
                        <select class="custom-select form-control my-1 mr-sm-2" id="endWeek">
                            <option value="0" selected>Choose...</option>
                           
                                    <option value="@i">Week </option>
                            
                        </select>
                        <button type="button" class="btn bg-teal margin btnClearSearch"><i class="fa fa-remove"></i> Reset search</button>

                    </div>
                    <!-- @* Quarter *@ -->
                    <div class="form-inline" style="display:none" id="searchQuarter">
                        <label class="my-1 mr-2" for="startMonth">Year</label>
                        <select class="custom-select form-control year my-1 mr-sm-2" id="quarterOfYear">
                            <option value="0" selected>Choose...</option>
                           
                                    <option value="@i">Year </option>
                            
                        </select>
                        <label class="my-1 mr-2" for="startMonth">Start</label>
                        <select class="custom-select form-control my-1 mr-sm-2" id="startQuarter">
                            <option value="0" selected>Choose...</option>
                           
                                    <option value="@i">Quarter </option>
                            
                        </select>
                        <label class="my-1 mr-2" for="endMonth">End</label>
                        <select class="custom-select form-control my-1 mr-sm-2" id="endQuarter">
                            <option value="0" selected>Choose...</option>
                           
                                    <option value="@i">Quarter</option>
                            
                        </select>
                        <button type="button" class="btn bg-teal margin btnClearSearch"><i class="fa fa-remove"></i> Reset search</button>

                    </div>
                    <!-- @* Year *@ -->
                    <div class="form-inline" style="display:none" id="searchYear">
                        <label class="my-1 mr-2" for="YearOfYear">Year</label>
                        <select class="custom-select form-control my-1 mr-sm-2 YearOfYear" id="YearOfYear">
                            <option value="0" selected>Choose...</option>
                            
                                    <option value="@i">Year </option>
                             
                        </select>
                        <label class="my-1 mr-2" for="startMonth">Start</label>
                        <select class="custom-select form-control my-1 mr-sm-2" id="startYear">
                            <option value="0" selected>Choose...</option>
                           
                                    <option value="@i">Year </option>
                             
                        </select>
                        <label class="my-1 mr-2" for="endMonth">End</label>
                        <select class="custom-select form-control my-1 mr-sm-2" id="endYear">
                            <option value="0" selected>Choose...</option>
                           
                                    <option value="@i">Year </option>
                             
                        </select>
                        <button type="button" class="btn bg-teal margin btnClearSearch"><i class="fa fa-remove"></i> Reset search</button>
                    </div>
                </div>

            </div>
            <div class="box-body table-responsive no-padding" id="tblDataset">
                <div class="col-xs-12">
                    <table class="table">
                        <thead>

                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    
                </div>
            </div>
            <!-- /.box-body -->
        </div>
        <!-- /.box -->
    </div>
</div>
    </div>
</template>
<script>
import { HTTP } from "../../http-constants";
import VueJwtDecode from 'vue-jwt-decode'
export default {
    data() {
        return {
            data: [],
            title: []
        }
    },
    created(){
        let seft = this;
        seft.period = seft.$route.params.period;
        seft.start = seft.$route.params.start;
        seft.end = seft.$route.params.end;
        seft.LoadDataset();
    },
    methods: {
    LoadDataset() {
      let seft = this;
      $.ajax({
        url: `http://10.4.4.224:98/Dataset/getalldatabycategory/${seft.$route.params.catid}/${seft.$route.params.period}/${seft.$route.params.start}/${seft.$route.params.end}/${seft.$route.params.year}`,
        type: "GET",
        // data: {
        //   kpilevelcode: seft.$route.params.kpilevelcode,
        //   catid: seft.$route.params.catid,
        //   period: seft.$route.params.period,
        //   year: seft.$route.params.year,
        //   start: seft.$route.params.start,
        //   end: seft.$route.params.end
        // },
        dataType: "json",
        success: function(response) {
            seft.data = response.data
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
          $("#editBugModal").modal("show");
          $(".btnShowData").hide();
          // console.log(seft.chart.data);
        }
      });
    }
    }
}
</script>