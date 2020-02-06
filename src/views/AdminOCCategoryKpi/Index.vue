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
            <li class="breadcrumb-item active">OC Category KPI</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="callout bg-yellow-gradient" style="border-color:#c57901">
        <h3>6. OC Category KPI</h3>
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
      
      <!-- <modal-oc></modal-oc> -->

      <!-- categorylist -->
      <div class="box" id="boxCategory">
        <div class="box-header with-border kpi-name">
          <h3 style="font-size:18px" class="box-title pull-left">Category lists</h3>
          <span class="id" style="display:none"></span>
          <span class="code" style="display:none"></span>
          <!-- <span class="level" style="display:block"></span> -->
          <input type="text" class="form-control level" style="display:none" />
          
          <input type="text" class="form-control levelID" style="display:none" />
          <!-- <select class="form-control pull-right" style="width:50%"></select> -->
        </div>
        <div class="box-body">
          <div class="box-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Category Name</th>
                  <th>Level Number</th>
                </tr>
              </thead>
              <tbody  class="tbody" id="tblCategory">
                <tr v-for="(item,key,index) in events" :key="index" tabindex="0" :data-id="item.ID">
                  <td class="text-center">{{key+1}}</td>
                  <td>{{item.Name}}</td>
                  <td class="text-center">{{item.LevelID}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="box-footer clearfix">
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
            :click-handler="changePage2"
          ></Paginate>
        </div>
      </div>
      <!-- endcategorylist -->

      <hr>

      <!-- kpilevellist -->
      <div class="box " id="box" style="display:none">
        <div class="box-header with-border kpi-name">
            <h3 class="box-title pull-left">KPI OC </h3>
            <span class="id" style="display:none"></span>
            <span class="code" style="display:none"></span>
            <span class="level" style="display:none"></span>
            <input type="text" class="form-control catid" value="" style="display:none" />
            <input type="text" class="form-control levelid" value="" style="display:none" />
        </div>
        <div class="box-body">

          <div class="box-body">
            <table class="table table-striped">
              <thead>
                  <tr>
                    <th>#</th>
                    <th>KPI Organization Chart</th>
                    <th>Period</th>
                  </tr>
              </thead>
              <tbody  class="tbody" id="tblkpilevel">
                <tr v-for="(item,key,index) in dataKPILV" :key="index" :data-id="item.ID" >
                  <td>{{key+1}}</td>
                  <td>
                    <div class="tooltip-css ">
                      <div class="pretty p-icon p-rotate ">
                        <input @click="focusAddCategoryLevel()" v-if="item.CheckCategory == true" type="checkbox"  class="checkbox kpilevelID" name="checkbox" checked />
                        <input v-else type="checkbox" @click="focusAddCategoryLevel()"  class="checkbox kpilevelID" name="checkbox"  />
                        <div class="state p-success textOverflow">
                            <i class="icon fa fa-check"></i>
                            <label class="black labelOverflow">{{item.KPIName}}</label>
                        </div>
                      </div>
                      <div class="top"> {{item.KPIName}}<i></i></div>
                    </div>
                  </td>
                  <td>
                    <!-- button Weekly -->
                    <button v-if="item.WeeklyChecked === true && (item.StatusUploadDataW === true && item.StatusEmptyDataW === true)" :data-kpilevelcode="item.KPILevelCode" data-period="W" :class='item.WeeklyChecked === true ? (item.StatusUploadDataW === true ? "btn btn-sm btn-success week" : (item.StatusEmptyDataW === true ? "btn btn-sm btn-warning week" : "btn btn-sm btn-success week")) : "btn btn-sm bg-navy week"'   ><i class="fas fa-chart-bar"></i> Weekly</button>
                    <button v-if="item.WeeklyChecked === true && item.StatusUploadDataW === false " :data-kpilevelcode="item.KPILevelCode" data-period="W" :class='item.WeeklyChecked === true ? (item.StatusUploadDataW === true ? "btn btn-sm btn-success week" : (item.StatusEmptyDataW === true ? "btn btn-sm btn-warning week" : "btn btn-sm btn-success week")) : "btn btn-sm bg-navy week"'   ><i class="fas fa-chart-bar"></i> Weekly</button>
                    <button v-else :data-kpilevelcode="item.KPILevelCode" data-period="W"  disabled class="btn btn-sm bg-navy  week" ><i class="fas fa-chart-bar"></i> Weekly</button>                  
                    <!-- button Monthly -->
                    <button v-if="item.MonthlyChecked === true && (item.StatusUploadDataM === true && item.StatusEmptyDataM === true)" :data-kpilevelcode="item.KPILevelCode" data-period="M" :class='item.MonthlyChecked === true ? (item.StatusUploadDataM === true ? "btn btn-sm btn-success month" : (item.StatusEmptyDataM === true ? "btn btn-sm btn-warning month" : "btn btn-sm btn-success month")) : "btn btn-sm bg-navy month"' ><i class="fas fa-chart-bar"></i> Monthly</button>
                    <button v-else-if="item.MonthlyChecked === true && item.StatusUploadDataM === false " :data-kpilevelcode="item.KPILevelCode" data-period="M"  :class='item.MonthlyChecked === true ? (item.StatusUploadDataM === true ? "btn btn-sm btn-success month" : (item.StatusEmptyDataM === true ? "btn btn-sm btn-warning month" : "btn btn-sm btn-success month")) : "btn btn-sm bg-navy month"' ><i class="fas fa-chart-bar"></i> Monthly</button>
                    <button v-else :data-kpilevelcode="item.KPILevelCode" data-period="M" disabled   class="btn btn-sm bg-navy month"><i class="fas fa-chart-bar"></i> Monthly</button>

                    <!-- button Quarterly -->
                    <button v-if="item.QuarterlyChecked === true && (item.StatusUploadDataQ === true && item.StatusEmptyDataQ === true)" :data-kpilevelcode="item.KPILevelCode" data-period="Q" :class='item.MonthlyChecked === true ? (item.StatusUploadDataM === true ? "btn btn-sm btn-success month" : (item.StatusEmptyDataM === true ? "btn btn-sm btn-warning quarter" : "btn btn-sm btn-success quarter")) : "btn btn-sm bg-navy quarter"' ><i class="fas fa-chart-bar"></i> Quarterly</button>
                    <button v-else-if="item.QuarterlyChecked === true && item.StatusUploadDataQ === false " :data-kpilevelcode="item.KPILevelCode" data-period="Q"  :class='item.QuarterlyChecked === true ? (item.StatusUploadDataQ === true ? "btn btn-sm btn-success month" : (item.StatusEmptyDataQ === true ? "btn btn-sm btn-warning month" : "btn btn-sm btn-success quarter")) : "btn btn-sm bg-navy quarter"' ><i class="fas fa-chart-bar"></i> Quarterly</button>
                    <button v-else :data-kpilevelcode="item.KPILevelCode" data-period="Q" disabled   class="btn btn-sm bg-navy quarter"><i class="fas fa-chart-bar"></i> Quarterly</button>
                    <!-- button Yearly -->

                    <button v-if="item.YearlyChecked === true && (item.StatusUploadDataY === true && item.StatusEmptyDataY=== true)" :data-kpilevelcode="item.KPILevelCode" data-period="Y" :class='item.MonthlyChecked === true ? (item.StatusUploadDataM === true ? "btn btn-sm btn-success year" : (item.StatusEmptyDataM === true ? "btn btn-sm btn-warning year" : "btn btn-sm btn-success year")) : "btn btn-sm bg-navy year"' ><i class="fas fa-chart-bar"></i> Yearly</button>
                    <button v-else-if="item.YearlyChecked === true && item.StatusUploadDataY === false " :data-kpilevelcode="item.KPILevelCode" data-period="Y"  :class='item.YearlyChecked === true ? (item.StatusUploadDataY === true ? "btn btn-sm btn-success year" : (item.StatusEmptyDataY === true ? "btn btn-sm btn-warning year" : "btn btn-sm btn-success year")) : "btn btn-sm bg-navy year"' ><i class="fas fa-chart-bar"></i> Yearly</button>
                    <button v-else :data-kpilevelcode="item.KPILevelCode" data-period="Y" disabled   class="btn btn-sm bg-navy year"><i class="fas fa-chart-bar"></i> Yearly</button>
                </td>
              </tr>
            </tbody> 
          </table>
        </div>
            <!-- /.box-body -->
        </div>
        <div class="box-footer clearfix">
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
      </div>
      <!-- endkpilevellist -->

      <!-- modal -->
      <div class="modal fade" id="modal-group-general" style="display: none">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Weekly</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <input type="text" value class="KPILevelID" style="display:none" />
              <input type="number" class="form-control kpilevelInputHidden" style="display:none" />
            </div>
            <div class="modal-body">
              <div>
                <div class="box-body">
                  <div class="form-group ownerManager">
                    <label for="ownerManager">
                      Manager
                      <span style="color:red">(*)</span>
                    </label>
                    <textarea class="form-control KPILevelSelect2" placeholder="Manager..." rows="1"></textarea>
                  </div>
                  <div class="form-group Owner">
                    <label for="owner">
                      Owner
                      <span style="color:red">(*)</span>
                    </label>
                    <textarea class="form-control KPILevelSelect2" placeholder="Owner..." rows="1"></textarea>
                  </div>
                  <div class="form-group PIC">
                    <label for="PIC">
                      Updater
                      <span style="color:red">(*)</span>
                    </label>
                    <textarea class="form-control KPILevelSelect2" placeholder="Updater..." rows="1"></textarea>
                  </div>

                  <div class="form-group Sponsor">
                    <label for="Sponsor">Sponsor</label>
                    <textarea class="form-control KPILevelSelect2" placeholder="Sponsor..." rows="1"></textarea>
                  </div>
                  <div class="form-group Participant">
                    <label for="Participant">Participant</label>
                    <textarea
                      class="form-control KPILevelSelect2"
                      placeholder="Participant..."
                      rows="1"
                    ></textarea>
                  </div>
                </div>
                <!-- /.box-body -->

                <div class="box-footer">
                  <button
                    type="button"
                    class="btn btn-primary btnSaveGeneral"
                    id="btnSaveGeneral"
                  >Save</button>
                  <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <div class="modal fade" id="modal-group" style="display: none">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="modal-title">Add User</h4>
            </div>
            <div class="modal-body">
              <div>
                <div class="box-body" id="addKPI">
                  <div class="form-group" style="display:none">
                    <label for="Name">ID</label>
                    <input type="text" class="form-control ID" id="ID" placeholder="ID" disabled />
                  </div>
                  <div class="form-group">
                    <label for="Name">Username</label>
                    <input type="text" class="form-control Name" id="Name" placeholder="Enter Name" />
                  </div>
                  <div class="form-group">
                    <label for="Passwrod">Passwrod</label>
                    <input
                      type="password"
                      class="form-control Passwrod"
                      id="Passwrod"
                      placeholder="Enter Passwrod"
                    />
                  </div>
                  <div class="form-group">
                    <label for="Code">Code</label>
                    <input type="text" class="form-control Code" id="Code" placeholder="Enter Code" />
                  </div>
                  <div class="form-group">
                    <label for="Code">Level</label>
                    <input
                      type="text"
                      class="form-control LevelID"
                      id="LevelID"
                      placeholder="Enter Level"
                    />
                  </div>
                </div>
                <!-- /.box-body -->

                <div class="box-footer">
                  <button id="btnAdd" class="btn btn-primary">Add</button>
                  <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- @* update *@ -->
      <div class="modal fade" id="modal-group2" style="display: none">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="modal-title">Update User</h4>
            </div>
            <div class="modal-body">
              <div>
                <div class="box-body" id="updateKpi">
                  <div class="form-group" style="display:none">
                    <label for="Name">ID</label>
                    <input type="text" class="form-control ID" id="ID" placeholder="ID" disabled />
                  </div>
                  <div class="form-group">
                    <label for="Name">Name</label>
                    <input type="text" class="form-control Name" id="Name" placeholder="Enter Name" />
                  </div>
                  <div class="form-group">
                    <label for="Code">Code</label>
                    <input type="text" class="form-control Code" id="Code" placeholder="Enter Code" />
                  </div>
                  <div class="form-group">
                    <label for="Code">Level</label>
                    <input
                      type="text"
                      class="form-control LevelID"
                      id="LevelID"
                      placeholder="Enter Level"
                    />
                  </div>
                </div>
                <!-- /.box-body -->

                <div class="box-footer">
                  <button type="button" class="btn btn-primary" id="btnSaveUpdateModal">Update</button>
                  <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- @* weekly madal *@ -->
      <div class="modal fade" id="modal-group-weekly" style="display: none">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="modal-title">Weekly</h4>
            </div>
            <div class="modal-body">
              <div>
                <div class="box-body">
                  <div class="form-group">
                    <label for="weekly">Day of the week</label>
                    <select class="form-control weekly" data-id id="weekly">
                      <option value>Choose day of the week</option>
                      <option value="MON">Monday</option>
                      <option value="TUE">Tuesday</option>
                      <option value="WED">Wednesday</option>
                      <option value="THU">Thursday</option>
                      <option value="FRI">Friday</option>
                      <option value="SAT">Saturday</option>
                    </select>
                  </div>
                </div>
                <!-- /.box-body -->

                <div class="box-footer">
                  <button type="button" class="btn btn-primary btnsaveweekly" id="btnsaveweekly">Save</button>
                  <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- @* monthly modal *@ -->
      <div class="modal fade" id="modal-group-monthly" style="display: none">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="modal-title">Monthly</h4>
            </div>
            <div class="modal-body">
              <div class="box-body">
                <div class="form-group">
                  <label for="monthly">Monthly</label>
                  <div class="input-group date monthly">
                    <input type="text" data-id class="form-control date monthly" />
                    <span class="input-group-addon">
                      <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                  </div>
                </div>
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
                <a href="#" class="btn btn-primary" id="btnsavemonthlymodal">Save</a>
                <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- @* Quaterly Modal *@ -->
      <div class="modal fade" id="modal-group-quaterly" style="display: none">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="modal-title">Quaterly</h4>
            </div>
            <div class="modal-body">
              <div class="box-body">
                <div class="form-group">
                  <label for="quaterly">Quaterly</label>
                  <div class="input-group date quaterly">
                    <input type="text" data-id class="form-control date quaterly" />
                    <span class="input-group-addon">
                      <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                  </div>
                </div>
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
                <a href="#" class="btn btn-primary" id="btnsavequaterlymodal">Save</a>
                <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- @* Yearly Modal *@ -->
      <div class="modal fade" id="modal-group-yearly" style="display: none">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="modal-title">Yearly</h4>
            </div>
            <div class="modal-body">
              <div class="box-body">
                <div class="form-group">
                  <label for="yearly">Yearly</label>
                  <div class="input-group date yearly">
                    <input type="text" data-id class="form-control date yearly" />
                    <span class="input-group-addon">
                      <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                  </div>
                </div>
              </div>
              <!-- /.box-body -->

              <div class="box-footer">
                <button type="button" class="btn btn-primary" id="btnsaveyearly">Update</button>
                <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      
      <!-- @* get kpi code *@ -->
      <div class="modal fade" id="modal-group3" style="display: none">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <h4 class="modal-title">Get KPI Code</h4>
            </div>
            <div class="modal-body">
              <div>
                <div class="box-body" id="updateKpi">
                  <div class="form-group" style="display:none">
                    <label for="Name">Get KPI Code</label>
                    <input type="text" class="form-control ID" id="ID" placeholder="Get KPI Code" />
                  </div>
                  <div class="form-group">
                    <label for="Name">Get KPI Code Weekly</label>
                    <input
                      type="text"
                      class="form-control Weekly"
                      id="Weekly"
                      placeholder="Get KPI Code Weekly"
                    />
                  </div>
                  <div class="form-group">
                    <label for="Name">Get KPI Code Monthly</label>
                    <input
                      type="text"
                      class="form-control Monthly"
                      id="Monthly"
                      placeholder="Get KPI Code Monthly"
                    />
                  </div>
                  <div class="form-group">
                    <label for="Name">Get KPI Code Quaterly</label>
                    <input
                      type="text"
                      class="form-control Quaterly"
                      id="Quaterly"
                      placeholder="Get KPI Code Quaterly"
                    />
                  </div>
                  <div class="form-group">
                    <label for="Name">Get KPI Code Yearly</label>
                    <input
                      type="text"
                      class="form-control Yearly"
                      id="Yearly"
                      placeholder="Get KPI Code Yearly"
                    />
                  </div>
                </div>
                <!-- /.box-body -->
                <div class="box-footer">
                  <!-- @*<button type="button" class="btn btn-primary" onclick="Update();">Update</button>
                  <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>*@-->
                </div>
              </div>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <!-- endmodal -->
    </div>
  </div>
</template>

<script>
// import { HTTP } from "../../http-constants";
// import listoc from "../../components/adminOC/List"
import Hierarchy from "../../components/adminOC/Hierarchy";
import listoc from "../../components/AdminOCCategoryKpi/Modal";
import Paginate from "vuejs-paginate";
import { HTTP } from '../../http-constants';
import EventBus from "../../utils/EventBus.js";

export default {
  name: "IndexKpi",
  data() {
    return {
      events: [],
      dataKPILV:[],
      totalPage: 0,
      page: 1,
      skip: 0,
      pageSize: 6,

      totalPage2: 0,
      page2: 1,
      skip: 0,
      pageSize2: 6,
      locale : $cookies.get("Lang"),
      // test: "A"
    };
  },
  components: {
    listoc,
    Hierarchy,
    Paginate
  },
  created() {
    let seft = this;
    EventBus.$on('flag', locale =>{
      seft.locale = locale
    });
    seft.loadAll();
  },
  watch: {
    locale: function(newOld,oldVal){
      this.locale = newOld
      this.loadDataKPILevel()
    }
  },
  methods: {
    focusAddCategoryLevel(){
      let self = this
      
      $('.kpilevelID').off('change').on('change', function () {
        let config = {
          pageSize: 6,
          pageIndex: 1
        };
        var levelID = Number($('#box .levelid').val());
        var entity = {
            KPILevelID: $(this).closest('tr').data('id'),
            CategoryID: Number($('#box .catid').val()),
        };
        self.getUserByCategoryIDAndKPILevelID(entity);
        self.addCategoryLevel(entity);
        config.pageIndex = Number($('#paginationKPILevel li.active a').text());
          var catid = $('#box .catid').val();
            self.loadDataKPILevel(false, levelID,catid);
        if ($(this).is(':checked')) {
            $('#modal-group-general').modal('show').fadeIn(1000);
        }
      })
    },
    changePage2(pageNum) {
      this.getAllCategories(this.name,pageNum);
    },
    changePage(pageNum) {
      this.loadDataKPILevel(this.name,pageNum);
    },
    loadAll() {
      let self = this;
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

      $("#box").hide();

      $(function() {
       setTimeout(function(){
          $("#treetable").fancytree({
            extensions: ["glyph", "table"],
            checkbox: false,
            selectMode: 2,
            dnd5: {
              preventVoidMoves: true,
              preventRecursion: true,
              autoExpandMS: 400,
              dragStart: function (node, data) {
                  return true;
              },
              dragEnter: function (node, data) {
                  // return ["before", "after"];
                  return true;
              },
              dragDrop: function (node, data) {
                  data.otherNode.moveTo(node, data.hitMode);
              }
            },
            glyph: glyph_opts,
            source: { url: "http://10.4.4.224:98/AdminKPILevel/GetListTree", debugDelay: 1000 },
            table: {
              indentation: 20,
              nodeColumnIdx: 1,
              //checkboxColumnIdx: 0
            },
            gridnav: {
              autofocusInput: false,
              handleCursorKeys: true
            },
            focus: function (event, data) {
              // event.preventDefault();
              $("#box").hide();
              $('#boxCategory tr').off('focus').on('focus', function () {
                $('#boxCategory tr').removeClass('trfocus');
              })
              logEvent(event, data, ", targetType=" + data.targetType);
              var node = data.node,
              $tdList = $(node.tr).find(">td");
              // console.log(data.node.data.levelnumber)
              var level = $tdList.eq(0).text();
              var name = $tdList.eq(1).text();
              // console.log(level)
              // console.log(data.node.key)

              $('#boxCategory .kpi-name h3').text('Category list - ' + name);
              logEvent(event, data, ", targetType=" + data.targetType);
               
              $('#boxCategory .kpi-name .code').val("");
              $('#boxCategory .kpi-name .levelID').val("");
              $('#boxCategory .kpi-name .level').val("");

              $('#boxCategory .kpi-name .code').val(data.node.key);
              $('#boxCategory .kpi-name .levelID').val(data.node.key);
              $('#boxCategory .kpi-name .level').val(data.node.data.levelnumber);

              self.getAllCategories(true, level,data.node.key)
              $("html, body").animate(
              {
                scrollTop: $("#box").offset().top
              },
              500
              );
            },
            
            renderColumns: function (event, data) {
              var node = data.node,
              $tdList = $(node.tr).find(">td");
  
              $tdList.eq(0).addClass('text-bold').text(node.data.levelnumber);
              $tdList.eq(1).find('span.fancytree-icon').removeClass('fancytree-icon').addClass('fa fa-book')
              $tdList.eq(1).addClass('text-bold');
              $tdList.eq(1).addClass('text-bold');
              
            }
          });
        },500)
        $(".fancy-collapse").off("click").on("click", function() {
          $("#treetable").fancytree("getTree").expandAll(false);
        });
        $(".fancy-expand").off("click").on("click", function() {
          $("#treetable").fancytree("getTree").expandAll();
        });
      });

      let config = {
        pageSize: 6,
        pageIndex: 1
      };

      let categoryKPILevelAdmin = {
        init: function() {
          self.registerEvent();
          self.getAllUser();
        },
        loadTree: function () {
          $.ui.fancytree.getTree("#treetable").reload().done();
        },
      }
    },
    registerEvent: function () {
      let self = this
      $('#modal-group-general .btnSaveGeneral').off('click').on('click', function () {
        var entity = {
          kpilevel: $('#modal-group-general .kpilevelInputHidden').val(),
          category: $('#box .catid').val(),
          pic: $('#modal-group-general .PIC .KPILevelSelect2').val().replace(/\@/g, ",").trim(),
          owner: $('#modal-group-general .Owner .KPILevelSelect2').val().replace(/\@/g, ",").trim(),
          manager: $('#modal-group-general .ownerManager .KPILevelSelect2').val().replace(/\@/g, ",").trim(),
          sponsor: $('#modal-group-general .Sponsor .KPILevelSelect2').val().replace(/\@/g, ",").trim(),
          participant: $('#modal-group-general .Participant .KPILevelSelect2').val().replace(/\@/g, ",").trim()
        }
        self.addGeneral(entity);
      });

      $('#box .kpilevelID').off('click').on('click', function () {
        var kpilevel = $(this).closest('tr').data('id');
        $('#modal-group-general .kpilevelInputHidden').val(kpilevel);
      });

      $('#boxCategory tr').off('click').on('click', function () {
        $('#box .levelid').val("");
        $('#box .catid').val("")
        var key = $('#boxCategory .levelID').val();
        $('#box .levelid').val(key);
        var catName = $(this).find('td:eq(1)').text();
        $('#box .kpi-name h3').text("OC - " + catName);
        var catID = $(this).data('id');
        $('#box .catid').val(catID)
        $('#box').fadeIn();

        self.loadDataKPILevel(true, Number($('#boxCategory .levelID').val()),catID)
      });

      //Focus tr category list
      $('#boxCategory tr').off('focus').on('focus', function () {
        $('#boxCategory tr').removeClass('trfocus');
        $(this).addClass('trfocus');
      })

      $('#tbluser tr td:nth-child(2) input').change(function () {
        var id = $(this).parent().parent('td:nth-child(2)').children('div').children('span.level').data('id');
        var levelid = Number($('#box .kpi-name .code').text());
        if (levelid === 0) {
          warning('Please choose team!');
        }
        else {
          self.updateUser(id, levelid);
          self.loadTree();
        }

      });
      $('.kpilevelID').off('change').on('change', function () {
        let config = {
          pageSize: 6,
          pageIndex: 1
        };
        var levelID = Number($('#box .levelid').val());
        var entity = {
            KPILevelID: $(this).closest('tr').data('id'),
            CategoryID: Number($('#box .catid').val()),
        };
        self.getUserByCategoryIDAndKPILevelID(entity);
        self.addCategoryLevel(entity);
        config.pageIndex = Number($('#paginationKPILevel li.active a').text());
          var catid = $('#box .catid').val();
            self.loadDataKPILevel(false, levelID,catid);
        if ($(this).is(':checked')) {
            $('#modal-group-general').modal('show').fadeIn(1000);
        }
      })
    },
    updateUser: function (id, levelid) {
      let mObj = {
        id: id,
        levelid: levelid,
      };
      axios.post("AddUserToLevel/AddUserToLevel",JSON.stringify(mObj))
      .then(result=>{
        if (result) {
          success("success!");
        }
      })
      
    },
    addCategoryLevel: function (entity) {
      var entity = {
          KPILevelID: entity.KPILevelID,
          CategoryID: entity.CategoryID,
      };
      axios.post("CategoryKPILevelAdmin/Add",JSON.stringify(entity))
      .then(result=>{
        console.log("addCategoryLevel")
        console.log(result)
        if (result) {
          success("success!");
        }
      })
      
    },
    getAllCategories() {
      
      let self = this

      let level = $("#boxCategory .kpi-name .level").val();
      let OCID =  $('#boxCategory .kpi-name .levelID').val();
      // let level = $('#boxCategory .kpi-name .level').val();
      console.log(OCID)
      console.log(level)
      
      console.log("getAllCategories");
      axios.get(`http://10.4.4.92:91/CategoryKPILevelAdmin/GetAllCategories/${level}/${OCID}/${self.page2}/${self.pageSize2}`)
      .then(r=>{
        console.log(r);
          if (r.data.status) {
            var count = 1;
            var data = r.data.data;
            var page = r.data.page;
            var pageSize = r.data.pageSize;
            self.events = r.data.data;
            console.log(self.events);
            self.registerEvent();
          }
      })
    },
    pagingCategoryKPILevel: function (totalRow, callback, changePageSize) {
      let config = {
        pageSize: 6,
        pageIndex: 1
      };
      var totalPage = Math.ceil(totalRow / config.pageSize);

      //Unbind pagination if it existed or click change pagesize
      if ($('#paginationCategoryKPILevel a').length === 0 || changePageSize === true) {
          $('#paginationCategoryKPILevel').empty();
          $('#paginationCategoryKPILevel').removeData("twbs-pagination");
          $('#paginationCategoryKPILevel').unbind("page");
      }

      $('#paginationCategoryKPILevel').twbsPagination({
          totalPages: totalPage === 0 ? 1 : totalPage,
          first: "First",
          next: "Next",
          last: "Last",
          prev: "Previous",
          visiblePages: 10,
          onPageClick: function (event, page) {
              config.pageIndex = page;
              setTimeout(callback, 500);
          }
      });
    },
    loadDataKPILevel() {
      let self = this
      // debugger
      // var category = catid || 0;
      // var levelid = level || 0;
      let category = $('#box .catid').val()
      let levelid =  $('#boxCategory .kpi-name .levelID').val();
      console.log(category)
      // var levelid = $('#box .kpi-name .code').text();

      console.log(levelid)
      axios.get(`http://10.4.4.92:91/CategoryKPILevelAdmin/LoadDataKPILevel2/${levelid}/${category}/${self.locale}/${self.page}/${self.pageSize}`)
      .then(res=>{
        console.log(res);
        if (res.data.status) {
          self.totalPage = res.data.totalPage;
          self.page = res.data.page;
          self.data = res.data.data;
          self.pageSize = res.data.pageSize;
          self.dataKPILV = res.data.data;
          console.log(self.dataKPILV);
          self.registerEvent();
        }
        
      })
     
    },
    pagingKPILevel: function (totalRow, callback, changePageSize) {
      let config = {
        pageSize: 6,
        pageIndex: 1
      };
      var totalPage = Math.ceil(totalRow / config.pageSize);

      //Unbind pagination if it existed or click change pagesize
      if ($('#paginationKPILevel a').length === 0 || changePageSize === true) {
          $('#paginationKPILevel').empty();
          $('#paginationKPILevel').removeData("twbs-pagination");
          $('#paginationKPILevel').unbind("page");
          
      }
      
      $('#paginationKPILevel').twbsPagination({
          totalPages: totalPage === 0 ? 1 : totalPage,
          first: "First",
          next: "Next",
          last: "Last",
          prev: "Previous",
          visiblePages: 10,
          onPageClick: function (event, page) {
              config.pageIndex = page;
              setTimeout(callback, 500);
          }
      });
    },
    getAllUser() {
      axios.get("AdminKPILevel/GetListAllUser").then(data=>{
        console.log("getAllUser");
        console.log(data);
        var users = [], username, fullname;
        console.log("users")
        console.log(users)
        var arrays = data.data;
        console.log("arrays")
        console.log(arrays)
        $.each(arrays, function (i, item) {
          users.push({
            username: item.Username,
            fullname: item.FullName
          })
        })

        $('.KPILevelSelect2').suggest('@', {
          data: users,
          map: function (user) {
            return {
              value: user.username + '\f',
              text: '<strong>' + user.username + '  </strong> <small>' + user.fullname + '</small>'
            }
          },
          get: function (index) {
            // console.log(index)
          }

        });
      })
    },
    addGeneral: function (entity) {
      var res = this.validate();
      if (res === false) {
        return false;
      }
      var entity = {
        kpilevel: Number(entity.kpilevel),
        category: Number(entity.category),
        pic: entity.pic,
        owner: entity.owner,
        manager: entity.manager,
        sponsor: entity.sponsor,
        participant: entity.participant
      };
      axios.post(`CategoryKPILevelAdmin/AddGeneral`,JSON.stringify(entity))
      .then(result=>{
        console.log(result)
        if (result) {
          success("success!");
          this.clearForm();
          var key = $('#box .levelid').val();
          var catid = $('#box .catid').val();
          let config = {
            pageSize: 6,
            pageIndex: 1
          };
          config.pageIndex = Number($('#paginationKPILevel li.active a').text());

          this.loadDataKPILevel(false, key, catid);
          $('#modal-group-general').modal('hide');
        }
      })
      
    },
    clearForm() {
      $('#modal-group-general .PIC .KPILevelSelect2').val("");
      $('#modal-group-general .Owner .KPILevelSelect2').val("");
      $('#modal-group-general .ownerManager .KPILevelSelect2').val("");
      $('#modal-group-general .Sponsor .KPILevelSelect2').val("");
      $('#modal-group-general .Participant .KPILevelSelect2').val("");
    },
    validate: function () {
      var isValid = true;
      if ($('#modal-group-general .PIC .KPILevelSelect2').val().trim() === "") {
        $('#modal-group-general .PIC .KPILevelSelect2').css('border-color', 'Red');
        isValid = false;
      }
      else {
        $('#modal-group-general .PIC .KPILevelSelect2').css('border-color', 'lightgrey');
      }

      if ($('#modal-group-general .Owner .KPILevelSelect2').val().trim() === "") {
        $('#modal-group-general .Owner .KPILevelSelect2').css('border-color', 'Red');
        isValid = false;
      }
      else {
        $('#modal-group-general .Owner .KPILevelSelect2').css('border-color', 'lightgrey');
      }

      if ($('#modal-group-general .ownerManager .KPILevelSelect2').val().trim() === "") {
        $('#modal-group-general .ownerManager .KPILevelSelect2').css('border-color', 'Red');
        isValid = false;
      }
      else {
        $('#modal-group-general .ownerManager .KPILevelSelect2').css('border-color', 'lightgrey');
      }

      //if ($('#modal-group-general .Sponsor .KPILevelSelect2').val().trim() === "") {
      //    $('#modal-group-general .Sponsor .KPILevelSelect2').css('border-color', 'Red');
      //    isValid = false;
      //}
      //else {
      //    $('#modal-group-general .Sponsor .KPILevelSelect2').css('border-color', 'lightgrey');
      //}

      //if ($('#modal-group-general .Participant .KPILevelSelect2').val().trim() === "") {
      //    $('#modal-group-general .Participant .KPILevelSelect2').css('border-color', 'Red');
      //    isValid = false;
      //}
      //else {
      //    $('#modal-group-general .Participant .KPILevelSelect2').css('border-color', 'lightgrey');
      //}
      return isValid;
    },
    getUserByCategoryIDAndKPILevelID(entity) {
      axios.get(`CategoryKPILevelAdmin/GetUserByCategoryIDAndKPILevelID/${entity.KPILevelID}/${entity.CategoryID}`)
      .then(res=>{
        console.log("getUserByCategoryIDAndKPILevelID")
        console.log(res)
          $('#modal-group-general .PIC .KPILevelSelect2').val(res.data.Updater);
          $('#modal-group-general .Owner .KPILevelSelect2').val(res.data.Owner);
          $('#modal-group-general .ownerManager .KPILevelSelect2').val(res.data.Manager);
          $('#modal-group-general .Sponsor .KPILevelSelect2').val(res.data.Sponsor);
          $('#modal-group-general .Participant .KPILevelSelect2').val(res.data.Participant);
      })

    }
  }
};
</script>