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
              <!-- month  -->
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
                      @click="compare"
                    >
                      <i class="fa fa-adjust"></i> Compare
                    </button>

                    <button
                      v-if="statusfavorite == false"
                      type="button"
                      class="btn margin btnLike bg-navy pull-right"
                      id="btnLike"
                      @click="btnLike"
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
      <!-- <comment> -->
      <!-- compare -->
      

      <!-- </comment>  -->
    </section>
    <div class="modal fade" id="modal-group">
        <div class="modal-dialog modal-lg " >
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Compare KPILevel </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="box-body" id="comparechart">
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width:3%">#</th>
                                        <th class="text-center" style="width:5%">Checkbox</th>
                                        <th class="text-center">Level Number</th>
                                        <th class="text-center">Area</th>
                                        <th class="text-center">Data Status </th>
                                        <th class="text-center">Publicity Status</th>
                                    </tr>
                                </thead>
                                <tbody v-for="(item,key,index) in data2" :key="index" id="tblcomparechart">
                                  <tr >
                                      <td class="text-center">{{key+1}}</td>
                                      <td class="text-center">
                                          <div class="pretty p-image p-plain">
                                              <input type="checkbox" :value="item.KPILevelCode" @click="clickcompare" v-if="item.StatusPublic == true"  class="compare" />
                                              <input type="checkbox"  :value="item.KPILevelCode" @click="clickcompare" v-else class="compare" disabled />
                                              <div class="state">
                                                  <img class="image" src="src/img/004.png">
                                                  <label class="comparelabel"></label>
                                              </div>
                                          </div>
                                      </td>
                                      <td class="text-center">{{item.LevelNumber}}</td>
                                      <td class="text-center">{{item.Area}}</td>
                                      <td class="text-center">
                                        <span v-if="item.Status == true" class="badge badge-success">visible</span>
                                        <span v-else class="badge badge-danger">not visible</span>
                                      </td>
                                      <td class="text-center">
                                        <span v-if="item.StatusPublic == true" class="badge badge-success">Public</span>
                                        <span v-else class="badge badge-danger">Private</span>
                                      </td>
                                  </tr>
                                    
                                </tbody>
                            </table>
                            
                        </div>
                        <!-- /.box-body -->

                        <div class="box-footer">
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
                              :click-handler="changePage"
                            ></Paginate>

                        </div>
                        <div class="box-footer">
                            <span style="display:none" class="arrcompare"></span>
                            <button id="btnCompare-kpilevel"   data-compare="" class="btn btn-primary">Compare</button>
                            <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>
            <!-- /.modal-content -->
        </div>
    </div>

    <!-- endcompare -->

    <div class="modal fade modal" id="modal-group-comment-data">
      <div class="modal-dialog modal-lg" >
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
                                          <textarea class="form-control" id="comment" placeholder="write a comment..." rows="6"></textarea>
                                      </div>

                                      <div class="clearfix"></div>
                                      <hr />
                                      <button type="button" @click="addcomment" class="btn btn-info pull-right btnComment">
                                          <i class="far fa-paper-plane"></i> Post
                                      </button>
                                      <hr />
                                      <ul class="media-list" id="media-list">
                                      </ul>
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
      <div class="modal-dialog modal-lg" >
          <div class="modal-content">
              <div class="modal-header" style="background-color:#00a65a;color:#fff">
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
                  <span class="commentid" style="display:none"></span>

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
                          <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile">Add</a>
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
                                  <input type="text" class="form-control Title" autocomplete="off" placeholder="Enter ..." />
                              </div>

                              <!-- textarea -->
                              <div class="form-group">
                                  <label>Description</label>
                                  <div class="editable Description" style="border:1px solid #d2d6de" contenteditable="true">
                                      <ul style="list-style: decimal;padding-left: 20px;">
                                          <li></li>
                                      </ul>
                                  </div>
                              </div>

                              <!-- input states -->
                              <div class="form-group">
                                  <label class="control-label" for="Tag">Assign PIC</label>
                                  <textarea type="text" class="form-control Tag" id="Tag" rows="1" placeholder="Require ..."></textarea>
                              </div>
                              <div class="form-group">
                                  <label class="control-label" for="Auditor">Auditor</label>
                                  
                                  <textarea type="text" class="form-control Auditor" id="Auditor" rows="1" placeholder="Optional ..."></textarea>
                              </div>
                              <!-- radio -->
                              <div  class="form-group">
                                  <label >Due date</label><br>
                                  <!-- <input autocomplete="off" type="text" class="form-control DueDate datepicker" id="datepicker" /> -->
                                  <!-- <date-pick @click="gettime(date)" :isDateDisabled="isFutureDate"  v-model="date"></date-pick> -->
                                  <input id="datepicker" class="form-control DueDate datepicker" autocomplete="off"  width="276" />
                              </div>
                              <button type="button" class="btn btn-success btnSaveActionPlan">Save</button>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <a href="#modal-group-comment-data" data-toggle="modal" data-dismiss="modal" class="btn btn-primary">Back to remark</a>
              </div>
          </div>
          <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
    </div>
  </div>
</template>
<script>
import { HTTP } from "../../http-constants";
import LineChart from "../../utils/ChartJs/LineChart";
import { initLineChart } from "../../plugins/LineChartPlugin";
import planetChartData from "../../plugins/Chartjs2/Demo";
import Comment from "../ChartPeriod/Modal";
import VueJwtDecode from 'vue-jwt-decode'
import Paginate from "vuejs-paginate";
// import DatePick from 'vue-date-pick';
// import 'vue-date-pick/dist/vueDatePick.css';
export default {
  data() {
    return {
      date: '',
      data2:[],
      totalPage: 0,
      page: 1,
      skip: 0,
      pageSize: 10,
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
    Comment,
    Paginate,

  },
  mounted() {
    // $('#datepicker').datepicker({
    //   autoclose: true, 
    //   uiLibrary: 'bootstrap4',
    //   format: 'mm-dd-yyyy'
    // });
    let seft = this
    // seft.createChart("planet-chart");
    seft.createChart("planet-chart", seft.datasets, seft.targets, seft.labels);
  },
  created() {
    // $('#datepicker').datepicker({
    //   autoclose: true, 
    //   uiLibrary: 'bootstrap4',
    //   format: 'mm-dd-yyyy'
    // });
    let seft = this;
    seft.period = seft.$route.params.period;
    seft.start = seft.$route.params.start;
    seft.end = seft.$route.params.end;
    seft.Loadchart();
    seft.getAllNotifications();
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
    dateNow() {
      var date = new Date();
      var day = date.getDate();       // yields date
      var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
      var year = date.getFullYear();  // yields year
      var hour = date.getHours();     // yields hours
      var minute = date.getMinutes(); // yields minutes
      var second = date.getSeconds(); // yields seconds

      // After this construct a string with the above results as below
      var time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;
      return time;
      },
    isFutureDate(date) {
      const currentDate = new Date();
      return date > currentDate;
    },
    getAllNotifications(){
      let seft = this ;
      HTTP.get("Home/GetNotifications")
      .then(r=>{
        seft.arrayID = r.data.arrayID
        //console.log(seft.arrayID)
        seft.data = r.data.data
        console.log(seft.data)
        seft.listdata = r.data
        console.log(seft.listdata)
        seft.userid = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
        // console.log(user)
      })
    },
    addNotification() {
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
          Tag = Tag.replace(/\@/g, '').replace(/\ /g, ',');
        var notification = {
          ID: 0,
          UserID: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
          KPIName: this.kpiname,
          Period: this.$route.params.period,
          Seen: false,
          Link: window.location.href,
          Tag: Tag,
          Content: Description,
          Title: $('.ActionPlanChart').text(),
          CreateTime: new Date()
          };

      HTTP.post('https://localhost:44309/ChartPeriod/AddNotification', {notification:notification})
        .then(function (response) {
          console.log("done notification")
      });
    },
    addNotificationComment() {
      var CommentMsg = $('#comment').val();

        var Tag = [],obj;
        if (CommentMsg !== "") {
          obj = CommentMsg.match(/@.+\f/g);
          if (obj === undefined || obj === null) {
            obj = "";
          }
          if (obj.toString().indexOf("@") === -1) {
            Tag = CommentMsg;
          } else {
            var arr = obj.toString().split(' ');
              for (let item of arr) {
                Tag.push(item.replace('@', ' ').trim());
              }
            Tag = Tag.join();
          }

        }
        var notification = {
          ID: 0,
          UserID: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
          KPIName: this.kpiname,
          Period: this.$route.params.period,
          Seen: false,
          Link: window.location.href,
          Tag: Tag,
          Title: $('.RemarkChart').text(),
          Content: CommentMsg,
          CreateTime:this.dateNow()
          };

        HTTP.post('https://localhost:44309/ChartPeriod/AddNotification', {notification:notification})
          .then(function (response) {
              console.log("done notification")
        });
    },
    btnCompare(){
      let seft = this
      $('#btnCompare-kpilevel').off('click').on('click', function () {
          // debugger
            var value = $('.arrcompare').text().toString();
            var obj = value.substring(value.length - 1, 0);
            var kpilevelcode = seft.$route.params.kpilevelcode;
            var period = seft.$route.params.period;
            obj = obj + '-' + kpilevelcode + ',' + period;
            seft.$router.push(`/compare/${obj}`) ;
        })
    },
    clickcompare(){
      var old = "";
      $('#comparechart .compare').unbind('click').change(function (e) {
          // debugger
          console.log('aaaa')
          var code = $(this).val();
          console.log(code)
          if (old.indexOf($(this).val()) == -1) {
              old += code + '-';
              $('.arrcompare').text(old);
          }
      });
    },
    addFavourite() {
      let seft = this
      // debugger
      var UserID = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid 
      if (UserID === 0 || UserID === "" || UserID === undefined) {
          Swal.fire({
              title: 'Warning!',
              text: 'Error!',
              type: 'warning',
              confirmButtonText: 'OK'
          });
          return;
      }
      var mObj = {
          KPILevelCode: seft.$route.params.kpilevelcode,
          Period: seft.$route.params.period,
          UserID: UserID,
      };
      HTTP.post("ChartPeriod/AddFavourite",{
        data: JSON.stringify(mObj)
      }).then(result=>{
        Swal.fire({
            title: 'success!',
            text: 'Add success!',
            type: 'success',
            confirmButtonText: 'OK'
        });
      })
      
    },
    btnLike(){
      this.addFavourite();
    },
    compare(){
       this.loadDataProvide();
    },
    loadDataProvide() {
      // debugger
      let seft = this 
      var obj = seft.$route.params.kpilevelcode+ ',' + seft.$route.params.period ;
      HTTP.get(`ChartPeriod/LoadDataProvide/${obj}/${seft.page}/${seft.pageSize}`)
        .then(data => {
        var count = 1;
        console.log(data);
        seft.skip = data.data.skip;
        seft.totalPage = data.data.total;
        seft.page = data.data.page;
        seft.data2 = data.data.listCompare;
        console.log(seft.data2)
        // chartperiodController.registerEvent();
        seft.clickcompare();
        seft.btnCompare();
      })
     
    },
    changePage(pageNum) {
      this.loadDataProvide(this.obj,pageNum);
    },
    deleteActionPlan(id) {
      let seft = this
      if (Number(id) > 0) {
        HTTP.get(`ChartPeriod/Delete/${id}`).then(res =>{
          if (res) {
            var commentid = Number($('.commentid').text());
            var dataid = Number($('.dataid').text());
            seft.LoadDataActionPlan(dataid, commentid);
            success("Successfully!");
          }
        })
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
      HTTP.post("ChartPeriod/Approval",JSON.stringify(data))
      .then(data => {
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
      HTTP.post("ChartPeriod/Done",JSON.stringify(data))
      .then(data => {
        success("Successfully!")
        var commentid = Number($('.commentid').text());
        var dataid = Number($('.dataid').text());
        seft.LoadDataActionPlan(dataid, commentid);
      })
      // let promise = HTTP.post("http://10.4.4.224:98/ChartPeriod/Done", JSON.stringify(data))
      // promise.then(data => {
      //   success("Successfully!")
      //   var commentid = Number($('.commentid').text());
      //   var dataid = Number($('.dataid').text());
      //   seft.LoadDataActionPlan(dataid, commentid);
      //   // chartperiodController.resetForm();
      // })
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
          Tag = Tag.replace(/\@/g, '').replace(/\ /g, ',');

        var Auditor = $('#Auditor').val().replace("@","").trim();
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
          KPILevelCode: seft.$route.params.kpilevelcode,
        };
        
        HTTP.post('ChartPeriod/Add', obj ).then(res=>{
        console.log("res");
        console.log(res);
        if (res.data.status === true ) {
          var commentid = Number($('.commentid').text());
          var dataid = Number($('.dataid').text());
          seft.LoadDataActionPlan(dataid, commentid);
          // chartperiodController.resetForm();
          activaTab('pills-home');
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
    LoadDataActionPlan(dataid, commentid) {
      let seft = this
      HTTP.get(`ChartPeriod/getall/${dataid}/${commentid}/${VueJwtDecode.decode(localStorage.getItem("authToken")).nameid}`)
     .then(res => {
       console.log(res)
      //  var res = res.data;
       if (res.data.status) {
          var data = res.data.data;
          console.log(data)
          var html = '';
          // debugger
          $.each(data, function (i, item) {
            $('.listTask .Approval').hide();
            $('.listTask .Option').hide();
            console.log(item)

            if (item.CreatedBy  || item.Auditor )
            {
                html += '<tr data-id="' + item.ID + '">';
                html += '<td>' + (i + 1) + '</td>';
                html += '<td class="text-bold" style="padding-left:15px;"><span style="font-weight: 700;cursor: pointer;"  class="TitleEdit" data-url="http://10.4.4.224:98/ChartPeriod/UpdateSheduleDate" data-type="text" data-name="Title" data-pk="'+item.ID+'" data-value="' + item.Title + '" data-title="Enter your title">' + item.Title + '</span></td>';
                html += '<td><div class="DescriptionEdit"  style="font-weight: 700;cursor: pointer;"  data-type="textarea"   data-name="Description" data-value="' + item.Description + '" data-pk="'+item.ID+'" data-userid ="'+ item.CreatedBy +'" > ' + item.Description + '</div> ';
                html += '</td>';
                html += '<td>';

                if (item.Tag !== null)
                {
                    var array2 = item.Tag.split(',');

                    $.each(array2, function (i, item2)
                    {
                        if (item2.length > 1) {
                            html += '<span class="badge bg-navy text-bold ">' + item2 + '</span> ';
                        }
                    });
                }

                html += '</td>';
                html += '<td><input autocomplete="off" data-id="'+item.ID+'" type="text" class="datepickerEdit" style="border: none;font-weight: 700;cursor: pointer;" value="' + item.Deadline + '"></td>';
                html += '<td><input autocomplete="off" data-id="' + item.ID + '" type="text" class="datepickerEdit" name="UpdateSheduleDate" style="border: none;font-weight: 700;cursor: pointer;" value="' + item.UpdateSheduleDate + '"></td>';
                html += '<td><input autocomplete="off" data-id="'+item.ID+'" type="text" class="datepickerEdit" style="border: none;font-weight: 700;cursor: pointer;" value="' + item.ActualFinishDate + '"></td>';
                html += '<td > ';
                html += '<div class="pretty p-icon p-round p-pulse">';

                if (item.Status)
                {
                    html += '<input type="checkbox" class="updateStatus" checked  />';
                    html += '<div class="state p-success">';
                    html += '<i class="icon fa fa-check"></i>';
                    html += '<label>Finished</label>';
                }
                else
                {
                    html += '<input type="checkbox" class="updateStatus" />';
                    html += '<div class="state p-danger">';
                    html += '<i class="icon fa fa-check"></i>';
                    html += '<label>Not finished</label>';
                }

                html += '</div>';
                html += '</div>';
                html += '</td > ';

                $('.listTask .Approval').show();
                $('.listTask .Option').show();
                html += '<td> ';

                if (item.ApprovedStatus)
                {
                    html += '<div class="pretty p-icon p-round p-jelly">';
                    html += '<input type="checkbox" checked class="btnApproveActionPlan" />';
                    html += '<div class="state p-success">';
                    html += '<i class="icon fa fa-check"></i>';
                    html += '<label class="black">Approved</label>';
                    html += '</div>';
                    html += '</div >';
                }
                else
                {
                    html += '<div class="pretty p-icon p-round p-jelly">';
                    html += '<input type="checkbox" class="btnApproveActionPlan" />';
                    html += '<div class="state p-danger">';
                    html += '<i class="icon fa fa-check"></i>';
                    html += '<label class="black">Not approved</label>';
                    html += '</div>';
                    html += '</div >';
                }

                html += '</td > ';
                html += '<td>';
                html += '<div class="btn-group">';
                html += '<button type="button" class="btn btn-warning btn-sm btnDeleteActionPlan"><i class="fas fa-trash-alt"></i></button>';
                html += '</div>';
                html += '</div>';
                html += '</td>';
                html += '</tr>';
            }
            else
            {
                if(item.ListUserIDs[0] !== -1)
                
                    html += '<tr data-id="' + item.ID + '">';
                else
                    html += '<tr style="pointer-events: none;" data-id="' + item.ID + '">';
                console.log(item.ListUserIDs)
                html += '<td>' + (i + 1) + '</td>';
                html += '<td class="text-bold" style="padding-left:15px;"><span style="font-weight: 700;cursor: pointer;"  class="TitleEdit" data-url="http://10.4.4.224:91/ChartPeriod/UpdateSheduleDate/" data-type="text" data-name="Title" data-pk="'+item.ID+'" data-value="' + item.Title + '" data-title="Enter your title">' + item.Title + '</span></td>';
                html += '<td><div class="DescriptionEdit" data-userid ="'+ item.CreatedBy +'" style="font-weight: 700;cursor: pointer;"  data-type="textarea"   data-name="Description" data-value="' + item.Description + '" data-pk="'+item.ID+'"> ' + item.Description + '</div> ';
                html += '</td>';
                html += '<td>';

                if (item.Tag !== null)
                {
                    var array2 = item.Tag.split(',');
                    $.each(array2, function (i, item2) {
                        if (item2.length > 1) {
                            html += '<span class="badge bg-default text-bold ">' + item2 + '</span> ';
                        }
                    });
                }

                html += '</td>';
                html += '<td><input autocomplete="off" data-id="'+item.ID+'" type="text" class="datepickerEdit" style="border: none;font-weight: 700;cursor: pointer;" value="' + item.Deadline + '"></td>';
                html += '<td><input autocomplete="off" data-id="' + item.ID + '" type="text" class="datepickerEdit" name="UpdateSheduleDate" style="border: none;font-weight: 700;cursor: pointer;" value="' + item.UpdateSheduleDate + '"></td>';
                html += '<td><input autocomplete="off" data-id="'+item.ID+'" type="text" class="datepickerEdit" style="border: none;font-weight: 700;cursor: pointer;" value="' + item.ActualFinishDate + '"></td>';
                html += '<td > ';
                html += '<div class="pretty p-icon p-round p-pulse">';

                if (item.Status)
                {
                    html += '<input type="checkbox" class="updateStatus" checked />';
                    html += '<div class="state p-success">';
                    html += '<i class="icon fa fa-check"></i>';
                    html += '<label>Finished</label>';
                }
                else
                {
                    html += '<input type="checkbox" class="updateStatus" />';
                    html += '<div class="state p-danger">';
                    html += '<i class="icon fa fa-check"></i>';
                    html += '<label>Not finished</label>';
                }
                html += '</div>';
                html += '</div>';
                html += '</td > ';
                html += '</tr>';
              }
          });
          $('#datepicker').datepicker({
            autoclose: true, 
            uiLibrary: 'bootstrap4',
            format: 'mm-dd-yyyy'
          });
          
          $('.tblActionPlan').empty();

          $('.tblActionPlan').append(html);

          $('.btnSaveActionPlan').unbind('click').on('click', function () {
            seft.addActionPlan();
          });

          $('.updateStatus').unbind('click').on('click', function () {
            var id = $(this).closest("tr").data('id');
            seft.done(id);
          });

          $('.btnApproveActionPlan').off('click').on('click', function () {
            var id = $(this).closest("tr").data('id');
            seft.approval(id);
          });

          $('.btnDeleteActionPlan').off('click').on('click', function () {
            var id = $(this).closest("tr").data('id');
            seft.deleteActionPlan(id);
          });

          $('#modal-group-comment-data2 .datepickerEdit').datepicker({
            autoclose: true, 
            uiLibrary: 'bootstrap4',
            dateFormat: "mm-dd-yy"
          });
          $('#modal-group-comment-data2 .datepickerEdit').off('change').on('change', function () {
            var id = $(this).data('id'),
                value = $(this).val();

              $.ajax({
                type: "Post",
                url: "http://10.4.4.224:98/ChartPeriod/UpdateSheduleDate",
                data: {
                  name:"DeadLine",
                  value:value,
                  pk:id,
                  userid : VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
                },
                success: function(res)
                {
                  console.log(res);
                  success('Successfully!')
                  var commentid = Number($('.commentid').text()),
                  dataid = Number($('.dataid').text());

                  seft.LoadDataActionPlan(dataid, commentid);
                },
                error: function (error) {
                  console.log(error)
                }
            });

          });
          $.fn.editable.defaults.mode = 'inline';

          $('#modal-group-comment-data2 input[name=UpdateSheduleDate]').off('change').on('change', function () {
            var id = $(this).data('id'),
              value = $(this).val(),
              userid = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
              name = $(this).attr("name");
            $.ajax({
              type: "Post",
              url: "http://10.4.4.224:98/ChartPeriod/UpdateSheduleDate",
              data:
              {
                name: name, value: value, pk: id, userid: userid
              },
              success: function (res) {
                success('Successfully!')
                var commentid = Number($('.commentid').text());

                var dataid = Number($('.dataid').text());

                seft.LoadDataActionPlan(dataid, commentid);
              }
            });
          });

          $('#modal-group-comment-data2 .TitleEdit').editable({
            placement: "right",
            type: "text",
            // pk: $(this).data("item-id"),
            url: 'http://10.4.4.224:98/ChartPeriod/UpdateSheduleDate',
            params: function(params) {
              var data = {};
              data['name'] = params.name;
              data['value'] = params.value;
              data['pk'] = params.pk;
              data['userid'] = Number(VueJwtDecode.decode(localStorage.getItem("authToken")).nameid);
            //  abc=params; 
              data.item = { value: data.value,}
              console.log(data)
              return data;
            },
            display: function (value, response) {
              if (response) {
              var commentid = Number($('.commentid').text()),
                dataid = Number($('.dataid').text());
              seft.LoadDataActionPlan(dataid, commentid);
              $(this).attr("data-value", value);
              
            }
            },
            ajaxOptions: {
              type: "POST",
              // 'contentType': 'application/json',
              dataType: "json"
            }
          });

          $('#modal-group-comment-data2 .DescriptionEdit').editable({
            type: "text",
            //pk: $(this).data("item-id"),
            url: 'http://10.4.4.224:98/ChartPeriod/UpdateSheduleDate',
            params: function (params) {
              // debugger
              var data = {};
              data['name'] = params.name;
              data['value'] = params.value;
              data['pk'] = params.pk;
              data['userid'] = Number(VueJwtDecode.decode(localStorage.getItem("authToken")).nameid);
            //  abc=params; 
              data.item = { value: data.value,}
              console.log(data)
              return data;
                
            },
            display: function (value, response) {
            if (response) {
              success('Successfully!')
              var commentid = Number($('.commentid').text()),
              dataid = Number($('.dataid').text());

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
    btntabload(){
      let seft = this
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

      seft.LoadDataActionPlan(dataid, commentid);
      });
    },
    loadDataComment() {
      let seft = this
      $.ajax({
          url: `http://10.4.4.224:98/ChartPeriod/LoadDataComment/${Number($(".dataid").text())}/${VueJwtDecode.decode(localStorage.getItem("authToken")).nameid}`,
          //url: '/ChartPeriod/GetAllComments',
          type: "GET",
          // data: {
          //     dataid: Number($(".dataid").text()),
          //     userid: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid
          // },
          dataType: "json",
          success: function (res) {
            var data = res.data;
            console.log("Lay ra tat ca comment");
            console.log(res);
            var total = res.total;

            $('.total-comments').text(total);
            var html = '';
            $.each(data, function (i, item) {
              var nowDate = new Date(parseInt(item.CommentedDate.substr(6)));
              var date = new Date(nowDate);
              var result = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
              html += ' <li class="media">';
              html += '<a href="#" class="float-left">';
              html += '    <img src="src/img/user-icon.png" alt="" class="img-circle">';
              html += '</a>';
              html += '<div class="media-body">';
              html += '<strong class="text-success">' + item.FullName + '</strong>';
              html += '<span class="text-muted float-right">';
              html += '    <small class="text-muted">' + JSONDateWithTime(item.CommentedDate) + '</small>';
              html += '</span>';
              if (item.Read) {
                  html += '<span class="label bg-green"> new</span>';
              }
              if (item.Task) {
                  html += '<p><a href="#modal-group-comment-data2" data-toggle="modal" data-commentid="' + item.CommentID + '" data-dismiss="modal" class="btn btn-sm btn-danger text-bold btnTask"><i class="fa fa-tags"></i> Task</a> </p>';
              }
              else {
                  html += '<p><a href="#modal-group-comment-data2" data-toggle="modal" title="There are no task." data-commentid="' + item.CommentID + '" data-dismiss="modal" class="btn btn-sm btn-success text-bold btnTask tooltip-ui"><i class="fa fa-tags"></i> Task</a> </p>';
              }
              html += '<p>';
              html += item.CommentMsg;
              html += '</p>';
              html += '</div>';
              html += '</li >';
            });
            $('#media-list').empty();
            $('#media-list').append(html);
            
            seft.btntabload();
          },
          error: function (err) {
        }
      });
    },
    remark(id) {
      HTTP.get(`ChartPeriod/Remark/${id}`).then(r => {
        console.log(r);
        let result = r.data.model;
        var userid = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid;
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

        $('#Tag').suggest('@', {
          data: users,
          map: function (user) {
            return {
              value: user.username,
              text: '<strong>'+user.username + '  </strong> <small>' + user.fullname + '</small>'
            }
          }
        })
        $('#Auditor').suggest('@', {
          data: users,
          map: function (user) {
            return {
              value: user.username,
              text: '<strong>'+user.username + '  </strong> <small>' + user.fullname + '</small>'
            }
          }
        })
        console.log("users");
        $('#comment').suggest('@', {
          data: users,
          map: function (user) {
            return {
              value: user.username+'\f',
              text: '<strong>' + user.username + '  </strong> <small>' + user.fullname + '</small>'
            }
          }
        })
        console.log(users);
        console.log(result);
      })
    },
    addcomment() {
      // debugger
      if ($("#comment").val() == "") {
        warning("Please enter message!!");
        return;
      }
      var CommentMsg = $("#comment").val();

      var list = [];
      for (let item of CommentMsg.split(" ")) {
        let x = item.match(/[@].+[\f]/g);
        if (x !== null)
          list.push(
            x
              .toString()
              .replace("@", " ")
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
        KPILevelCode: this.$route.params.kpilevelcode,
        CategoryID: Number(this.$route.params.catid)
      };
      
       HTTP.post("http://10.4.4.224:98/ChartPeriod/AddComment",mObj)
        .then(data => {
          
          var res = data.data;
          console.log(res);

          if (res.status == true && res.isSendmail == true) {
            $("#comment").val("");
            success("success!");
            this.loadDataComment();
            this.addNotification();
            this.addNotificationComment();
          }
           else if (res.status === true && res.isSendmail === false) {
            $("#comment").val("");
            this.loadDataComment();
            warning("Failed sending mail!");
            console.log("Khong gui duoc mail");
          } else {
            warning("error!");
            console.log("Loi roi");
          }
        })
    },
    opencomment(e) {
      console.log(e);
      if (e.toElement.classList[1] === "active-td") {
        let number = Number(e.toElement.textContent),
          value = Number(e.toElement.cellIndex),
          period = $("#tblDataChart tr:nth-child(1) th:nth-child(1)").text();

        $("#modal-group-comment-data").modal("show");
        console.log(number);
        console.log(value);
        console.log(period);

        var id = e.toElement.dataset.id;
        console.log(id);
        $(".dataid").text(id);

        $(".RemarkChart").text(e.text);

        $(".RemarkChart").text( "Remark - " + period + " " + value + " - " + " KPI Chart " + " - " + this.kpiname + " - " + this.convertPeriod(this.period, false));

        this.remark(id);
        //Khi tao ra table roi thi moi load data
        this.loadDataComment();
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
              borderWidth: 3,
              fill: false,
            }
          ]
        },
        options: seft.options
      });
      seft.chart = myChart;
      console.log(seft.chart);
    },
    convertPeriod(period, status = true) {
      if (status) {
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
      } else {
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
      }

      return "N/A";
    },
    Loadchart() {
      let seft = this;
      HTTP.get(`http://10.4.4.224:98/ChartPeriod/ListDatas/${seft.$route.params.kpilevelcode}/${seft.$route.params.catid}/${seft.$route.params.period}/${seft.$route.params.year}/${seft.$route.params.start}/${seft.$route.params.end}`)
        .then(response=>{
          console.log('respon1')
           console.log(response);

          seft.statusfavorite = response.data.statusfavorite;
          seft.unit = response.data.Unit;
          seft.datasets = response.data.datasets;
          seft.labels = response.data.labels;
          seft.label = response.data.label;
          seft.kpiname = response.data.kpiname;
          seft.PIC = response.data.PIC;
          // console.log(seft.statusfavorite)
          seft.Owner = response.data.Owner;
          seft.OwnerManagerment = response.data.OwnerManagerment;
          seft.Sponsor = response.data.Sponsor;
          seft.Participant = response.data.Participant;
          seft.dataremarks = response.data.Dataremarks;
          seft.targets = response.data.targets;

          (seft.options.label = response.label),
            (seft.options.title.text =
              "KPI Chart -" + response.data.label + " - " + response.data.kpiname),
            (seft.options.scales.yAxes[0].scaleLabel.labelString =
              response.data.Unit);
          seft.options.scales.xAxes[0].scaleLabel.labelString = seft.convertPeriod(
            response.data.period
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
        })
      
    }
  }
};
</script>