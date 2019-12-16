<template>
    <div>
        <section id="chartperiod" class="animatedParent">
            <div class="row">
                <div class="col-md-12">
                </div>
                <div class="col-md-12">
                    <!-- LINE CHART -->
                    <div class="box box-widget">
                        <div class="box-header with-border">
                            <h3 class="box-title" style="font-weight:bold">KPI Chart -  - Weekly</h3>
                            <h3 class="box-title" style="font-weight:bold">KPI Chart -  - Monthly</h3>
                            <h3 class="box-title" style="font-weight:bold">KPI Chart -  - Quarterly</h3>
                            <h3 class="box-title" style="font-weight:bold">KPI Chart -  - Yearly</h3>
                            <span style="display:none" class="userid"></span>
                            <div class="box-tools pull-right">
                                <button type="button" class="btn btn-box-tool" data-widget="collapse">
                                    <i class="fa fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-box-tool"><i class="fa fa-times"></i></button>

                            </div>
                        </div>
                        <div class="box-body">
                            <button type="button" data-toggle="modal" data-target="#modal-group" class="btn btn-danger margin btnLike pull-right" id="btnCompare"><i class="fa fa-adjust"></i> Compare</button>
                            <button type="button" class="btn margin btnLike bg-navy pull-right" id="btnLike"><i class="fa fa-heart"></i> Add Favourite</button>
                            <button type="button" class="btn btn-default  margin btnLike pull-right disabled" disabled id="btnLike"><i class="fa fa-heart"></i> Added Favourite</button>
                            <button class="btn margin btn-primary pull-right btn-skype">
                                <i class="fa fa-skype"></i>
                                Skype
                            </button>

                            <div class="form-inline" style="display:none" id="searchMonth">
                                <label class="my-1 mr-2" for="startMonth">Year</label>
                                <select class="custom-select form-control year my-1 mr-sm-2" id="monthOfYear">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Year </option>
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
                            <div class="form-inline" style="display:none" id="searchWeek">
                                <label class="my-1 mr-2" for="startMonth">Year</label>
                                <select class="custom-select form-control year my-1 mr-sm-2" id="weekOfYear">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Year</option>
                                </select>
                                <label class="my-1 mr-2" for="startWeek">Week Start</label>
                                <select class="custom-select form-control my-1 mr-sm-2" id="startWeek">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Week </option>
                                </select>
                                <label class="my-1 mr-2" for="endWeek">Week End</label>
                                <select class="custom-select form-control my-1 mr-sm-2" id="endWeek">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Week </option>
                                </select>
                                <button type="button" class="btn bg-teal margin btnClearSearch"><i class="fa fa-remove"></i> Reset search</button>

                            </div>
                            
                            <div class="form-inline" style="display:none" id="searchQuarter">
                                <label class="my-1 mr-2" for="startMonth">Year</label>
                                <select class="custom-select form-control year my-1 mr-sm-2" id="quarterOfYear">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Year </option>
                                
                                </select>
                                <label class="my-1 mr-2" for="startMonth">Start</label>
                                <select class="custom-select form-control my-1 mr-sm-2" id="startQuarter">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Quarter </option>
                                    
                                </select>
                                <label class="my-1 mr-2" for="endMonth">End</label>
                                <select class="custom-select form-control my-1 mr-sm-2" id="endQuarter">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Quarter </option>
                                    
                                </select>
                                <button type="button" class="btn bg-teal margin btnClearSearch"><i class="fa fa-remove"></i> Reset search</button>

                            </div>
                        
                            <div class="form-inline" style="display:none" id="searchYear">
                                <label class="my-1 mr-2" for="YearOfYear">Year</label>
                                <select class="custom-select form-control my-1 mr-sm-2 YearOfYear" id="YearOfYear">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Year </option>
                                </select>
                                <label class="my-1 mr-2" for="startMonth">Start</label>
                                <select class="custom-select form-control my-1 mr-sm-2" id="startYear">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Year </option>
                                </select>
                                <label class="my-1 mr-2" for="endMonth">End</label>
                                <select class="custom-select form-control my-1 mr-sm-2" id="endYear">
                                    <option value="0" selected>Choose...</option>
                                    <option value="">Year </option>
                                </select>
                                <button type="button" class="btn bg-teal margin btnClearSearch"><i class="fa fa-remove"></i> Reset search</button>
                            </div>


                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-inline">
                                        <label class="my-1 mr-2" for="startMonth">Step</label>
                                        <input type="number" class="form-control" min="0" step="0" id="stepChart" style="width:70px" />
                                        <label class="my-1 mr-2" for="endMonth">Min</label>
                                        <input type="number" class="form-control" min="0" step="0" id="minChart" style="width:70px" />
                                        <button type="button" class="btn btn-sm bg-aqua-gradient margin btnHiddenData"> Hide Data</button>
                                        <button type="button" class="btn btn-sm bg-black-active margin btnShowData"> Show Data</button>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <button type="button" class="btn btn-sm bg-black margin">Manager: <strong></strong></button>
                                    <button type="button" class="btn btn-sm bg-black margin">Owner: <strong></strong></button>
                                    <button type="button" class="btn btn-sm bg-black margin">Updater: <strong></strong> </button>
                                    <button type="button" class="btn btn-sm bg-black margin">Sponsor: <strong></strong></button>
                                    <button type="button" class="btn btn-sm bg-black margin">Participant: <strong></strong> </button>
                                </div>
                            </div>

                            <div class="chart">
                                
                                <canvas id="lineChart" style="height:500px"></canvas>

                            </div>
                        </div>
                        <div class="box-footer">

                            <p class="text-bold" style="font-size:16px;color:green;display:none" id="fromDateEndDate">
                                <span class="fromDayOfWeek"></span>
                                <span class="endDayOfWeek"></span>
                            </p>
                            <p class="text-bold" style="font-size:16px;color:green;display:none" id="fromDateEndDateM">
                                <span class="fromDayOfMonth"></span>
                                <span class="endDayOfMonth"></span>
                            </p>
                            <p class="text-bold" style="font-size:16px;color:green;display:none" id="fromDateEndDateQ">
                                <span class="fromDayOfQuarter"></span>
                                <span class="endDayOfQuarter"></span>
                            </p>
                        </div>
                    </div>

                </div>
                <div class="col-md-12">
                    <div class="box box-widget">
                        <div class="box-header with-border">
                            <h3 class="box-title" style="font-weight:bold">Data  -  - Weekly</h3>
                            <h3 class="box-title" style="font-weight:bold">Data -  - Monthly</h3>
                            <h3 class="box-title" style="font-weight:bold">Data -  - Quarterly</h3>
                            <h3 class="box-title" style="font-weight:bold">Data -  - Yearly</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class="box-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" style="margin-bottom:20px;" id="tblDataChart">
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
        </section>
    </div>
</template>
<script>
import { HTTP } from "../../http-constants";
export default {
    data() {
        return {
            data: [],
            kpilevelcode: "",
            period : "Q",
            year: 2019,
            start: 1,
            end: 1
        }
    },
    created(){
        let seft = this
        seft.Loadchart();
    },
    methods: {
        Loadchart(kpilevelcode = "3F010009" , catid , period = "Q"  , year = 2019  ,start = 1  ,end = 1 ) {
            let seft = this
            $.ajax({
              url: 'http://10.4.4.224:98/ChartPeriod/ListDatas',
              type: "GET",
              data: {
                kpilevelcode: kpilevelcode,
                catid: catid,
                period: period,
                year: year,
                start: start,
                end: end
              },
              dataType: "json",
              success: function (response) {
                  console.log(response)
              }
            })
            // HTTP.post("ChartPeriod/ListDatas",{
            //     kpilevelcode: kpilevelcode,
            //     catid: catid,
            //     period: period,
            //     year: year,
            //     start: start,
            //     end: end
            // }).then(r=>{
            //     console.log(r)
            // })
            
        }
    }
}
</script>