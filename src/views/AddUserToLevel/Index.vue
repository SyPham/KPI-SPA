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
            <li class="breadcrumb-item active">Add User Of List Each Levels</li>
          </ol>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="callout bg-yellow-gradient" style="border-color:#c57901">
        <h3>8. Add User Of List Each Levels</h3>
      </div>
    </div>
    <div class="col-md-3">
      <hierarchy></hierarchy>
      <table
        id="treetable" class="fancytree-fade-expander fancytree-colorize-selected">
        <thead>
          <tr>
            <th></th>
            <th class="text-right">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="demo"></td>
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
          <h3 style="font-size:18px" class="box-title float-left">User List</h3>
          <span class="id" style="display:none"></span>
          <span class="code" style="display:none"></span>
          <span class="level" style="display:none"></span>
          <div class="input-group">
            <input v-model="searchname" type="text" class="form-control demo" placeholder="Search Username"/>
            <div class="input-group-append" data-target="#timepicker" data-toggle="datetimepicker">
              <button class="input-group-text btn-success" @click="searchname = ''"> <i class="fas fa-remove"></i> Clear</button>
            </div>
          </div>
        </div>
        <div class="box-body">
          <div class="box-body">
            <table v-if="events.length" class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Alias</th>
                  <th> OC Name  
                  </th>
                </tr>
              </thead>
              <tbody  class="tbody" id="tbluser">
                <tr v-for="(item,key,index) in resultQuery" :key="index" :data-id="item.ID">
                  <td class="text-center">{{key+skip+1}}</td>
                  <td>
                    <div class="pretty p-switch p-fill">
                      <input @click="update(item,index)" :checked='item.Status == true ? "checked" : ""' type="checkbox"  class="checkbox levelID"  name="name" />
                      <!-- <input v-else type="checkbox" @click="update()" class="checkbox levelID"   name="name" /> -->
                      <div class="state p-success" >
                        <i class="icon fa fa-check"></i>
                        <label  class="black username">{{item.Username}}</label>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">{{item.FullName}}</td>
                  <td tooltip-position="top" data-c-tooltip="The account is binding to OC Name" class="text-center">{{item.OCName}} <i class="icon fa fa-info-circle danger"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
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
          <!-- <jw-pagination :items="exampleItems" :pageSize="10" @changePage="onChangePage"></jw-pagination> -->
         <!-- <pagination v-model="page" :records="records" :per-page="4" @paginate="myCallback"></pagination> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../../http-constants";
// import axios from 'axios';
// import listoc from "../../components/adminOC/List"
import Hierarchy from "../../components/adminOC/Hierarchy";
import listoc from "../../components/adminOC/Modal";
import Paginate from "vuejs-paginate";
import JwPagination from 'jw-vue-pagination';
import Pagination from 'vue-pagination-2';
export default {
  name: "IndexKpi",
  data() {
    return {
      searchQuery: null,
      events2: [],
      events: [],
      // test: "A",
      id: 0,
      levelid: 0,
      totalPage: 0,
      page: 1,
      skip: 0,
      pageSize: 10,
      code: " ",
      name: " ",
      levelID: 0,
      searchname: "",
      count: null,
      ID: null,
      exampleItems : null,
      pageOfItems:[]
    };
  },
  computed: {
    resultQuery(){
      if(this.searchQuery){
        return this.events.filter((item)=>{
          return this.searchQuery.toLowerCase().split(' ').every(v => item.Username.toLowerCase().includes(v))
        })
      }
      else{
        return this.events;
      }
    }
  },
  watch: {
    searchname: function(newOld, oldVal) {
      console.log(newOld)
      console.log(oldVal)
      this.code = newOld;
      this.LoadDataUser();
    },
  },
  components: {
    listoc,
    Hierarchy,
    Paginate,
    JwPagination,
  },
  created() {
    let seft = this;
    seft.loadAll();
  },

  methods: {
    update: function(item,index){ 
      let self = this
      self.ID = item.ID
      console.log(self.ID)
      $('.levelID').off('change').on('change', function () {
      let id = self.ID;
      let levelid = Number($('#box .kpi-name .code').text());
        axios.post(`http://10.4.4.92:991/AddUserToLevel/AddUserToLevel/${id}/${levelid}`)
        .then(result=>{
        console.log(result)
          if (result) {
            success("success!");
            self.LoadDataUser();
          }
        })
      })
      
    },
    LoadDataUser() {
      let self = this
      var levelid = Number($('#box .kpi-name .code').text());
      console.log("Id of level is " + levelid);
      // axios.get(`http://10.4.4.92:991/AddUserToLevel/LoadDataUser2/${self.code}/${levelid}`)
      if(self.code == ''){
         axios.get(`http://10.4.4.92:991/AddUserToLevel/LoadDataUser3/${levelid}/${self.page}/${self.pageSize}`)
        .then(response=>{
        console.log(response)
          if (response.data.status) {
            self.events = response.data.data;
            // self.exampleItems = response.data.data;
            self.skip = response.data.skip
            self.totalPage = response.data.totalPage;
            self.page = response.data.page;
            self.pageSize = response.data.pageSize;
            // self.registerEvent();
          }
      })
      }
      else{
        axios.get(`http://10.4.4.92:991/AddUserToLevel/LoadDataUser/${levelid}/${self.code}/${self.page}/${self.pageSize}`)
        .then(response=>{
        console.log(response)
          if (response.data.status) {
            self.events = response.data.data;
            // self.exampleItems = response.data.data;
            self.skip = response.data.skip
            self.totalPage = response.data.totalPage;
            self.page = response.data.page;
            self.pageSize = response.data.pageSize;
            // self.registerEvent();
          }
      })
      }
      
    },
    changePage(pageNum) {
      this.LoadDataUser(this.name, pageNum);
    },
    loadAll() {
      let self = this;
      var CLIPBOARD = null;
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

      $(function () {
        setTimeout(function(){
          AddUserToLevelController.init();
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
            source: { url: "http://10.4.4.92:91/AdminKPILevel/GetListTree", debugDelay: 1000 },
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
  
              logEvent(event, data, ", targetType=" + data.targetType);
  
              $('#box .kpi-name h3').text('User List - ' + data.node.title);
              $('#box .kpi-name .code').text(data.node.key);
              //$('#tbluser tr td:nth-child(2)').data('teamid',data.node.title);
              
              self.LoadDataUser(true, "", Number(data.node.key),true,true);
  
              $('html, body').animate({
                  scrollTop: $("#box").offset().top
              }, 500)
              // return false to prevent default behavior (i.e. activation, ...)
              //return false;
            },
            lazyLoad: function (event, data) {
              //data.result = { url: "/GetListTree", debugDelay: 1000 };
            },
            renderColumns: function (event, data) {
              var node = data.node,
              $tdList = $(node.tr).find(">td");
  
              // (Index #0 is rendered by fancytree by adding the checkbox)
              // Set column #1 info from node data:
              // (Index #2 is rendered by fancytree)
              // Set column #3 info from node data:
  
              $tdList.eq(0).addClass('text-bold').text(node.data.levelnumber);
              // $tdList.eq(0).text(node.data.levelnumber);
              // $tdList.eq(1).find('span.fancytree-icon').removeClass('fancytree-icon').addClass('fa fa-book')
              $tdList.eq(1).find('span.fancytree-icon').removeClass('fancytree-icon')
              // $tdList.eq(1).addClass('text-bold');
              // $tdList.eq(1).addClass('text-bold');
               $tdList.eq(1);
              $tdList.eq(1);
              // Static markup (more efficiently defined as html row template):
              // $tdList.eq(3).html("<input type='input' value='" + "" + "'>");
              // ...
            }
          });
        },500)

        $('.fancy-collapse').off('click').on('click', function () {
            $("#treetable").fancytree("getTree").expandAll(false);
        });

        $('.fancy-expand').off('click').on('click', function () {
            $("#treetable").fancytree("getTree").expandAll();
        });

      });
      var AddUserToLevelController = {
        init: function () {
          // self.registerEvent();
        },
        
        loadTree: function () {
          $.ui.fancytree.getTree("#treetable").reload().done();
        },
      }
    }
  }
};
</script>