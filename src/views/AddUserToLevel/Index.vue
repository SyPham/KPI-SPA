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
        <h3> Add User Of List Each Levels</h3>
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
          <h3 style="font-size:18px" class="box-title float-left">User List</h3>
          <span class="id" style="display:none"></span>
          <span class="code" style="display:none"></span>
          <span class="level" style="display:none"></span>
          <!-- <input v-model="searchname" class="form-control float-right searchUser" placeholder="search here..." style="width:40%" /> -->
          <div class="input-group float-right" style="width:50%">
            <input v-model="searchname" type="text" class="form-control searchUser" placeholder="search here...">
            <span class="input-group-addon clearSearch" style="cursor:pointer"><i class="fas fa-times"></i></span>
          </div>
        </div>
        <div class="box-body">
          <div class="box-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Alias</th>
                  <th>OC Name</th>
                </tr>
              </thead>
              <tbody v-for="(item,key,index) in events" :key="index" class="tbody" id="tbluser">
                <tr :data-id="item.ID">
                  <td class="text-center">{{key+1}}</td>
                  <td>
                    <div class="pretty p-icon p-rotate">
                      <input v-if="item.Status == true" checked type="checkbox" class="checkbox"  name="name" />
                      <input  v-else type="checkbox" class="checkbox"  name="name" />
                      <div class="state p-success">
                        <i class="icon fa fa-check"></i>
                        <label class="black username">{{item.Username}}</label>
                      </div>
                    </div>
                  </td>
                  <td class="text-center">{{item.FullName}}</td>
                  <td class="text-center">{{item.OCName}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="box-footer clearfix">
          <Paginate
            v-model="page"
            :page-count="totalPage "
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
          <!-- <Paginate
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
          ></Paginate> -->
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

export default {
  name: "IndexKpi",
  data() {
    return {
      events: [],
      // test: "A",
      id: 0,
      levelid: 0,
      totalPage: 0,
      page: 1,
      skip: 0,
      pageSize: 6,
      code: " ",
      levelID: 0,
      searchname: ""
    };
  },
  watch: {
    searchname: function(newOld, oldVal) {
      console.log(newOld)
      console.log(oldVal)
      this.name = newOld;
      this.LoadDataUser();
    }
  },
  components: {
    listoc,
    Hierarchy,
    Paginate
  },
  watch: {
    searchname: function(newOld, oldVal) {
      console.log(newOld)
      console.log(oldVal)
      this.code = newOld;
      this.LoadDataUser();
    }
  },
  created() {
    let seft = this;
    seft.loadAll();
  },
  mounted(){
    let seft = this;
    // seft.loadAll();
  },
  methods: {
    registerEvent: function () {
      let self = this 

      $('#box .clearSearch').off('click').on('click', function (e) {
        var levelid = Number($('#box .code').text());
          $('#box .searchUser').val("");
          //self.LoadDataUser("","",levelid);
      })

      $('#box .searchUser').off('keypress').on('keypress', function (e) {
        if (e.which === 13) {
          var code = $(this).val();
          var levelid = Number($('#box .code').text());
          //self.LoadDataUser(true, code,levelid);
        }
      });

      $('#tbluser tr td:nth-child(2) input').change(function () {
        var id = $(this).closest('tr').data('id');
        var levelid = Number($('#box .kpi-name .code').text());
          let username = $(this).next().children('label').text();
          console.log(username)
          self.updateUser(id, levelid);
          //self.LoadDataUser("",username,levelid);
          $('#box .searchUser').val(username);
          success("success!");
      });

    },
    updateUser: function (id, levelid) {
      // var mObj = {
      //   id: id,
      //   levelid: levelid,
      // };
      axios.post(`http://10.4.4.92:91/AddUserToLevel/AddUserToLevel/${id}/${levelid}`)
      .then(result=>{
        console.log(result)
          if (result) {
            success("success!");
          }
      })
      
    },
    LoadDataUser() {
      let self = this
      var levelid = Number($('#box .kpi-name .code').text());
      console.log("Id of level is " + levelid);
      axios.get(`http://10.4.4.92:91/AddUserToLevel/LoadDataUser/${levelid}/${self.code}/${self.page}/${self.pageSize}`)
      .then(response=>{
        console.log(response)
          if (response.data.status) {
            self.events = response.data.data;
            self.totalPage = response.data.totalPage;
            self.page = response.data.page;
            self.data = response.data.data;
            self.pageSize = response.data.pageSize;
            self.registerEvent();
          }
      })
    },
    changePage(pageNum) {
      this.LoadDataUser(this.name, pageNum);
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
              $tdList.eq(1).find('span.fancytree-icon').removeClass('fancytree-icon').addClass('fa fa-book')
              $tdList.eq(1).addClass('text-bold');
              $tdList.eq(1).addClass('text-bold');
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
      var config = {
        pageSize: 6,
        pageIndex: 1,
        code: ' '
      };
      var AddUserToLevelController = {
        init: function () {
          self.registerEvent();
        },
        loadTree: function () {
          $.ui.fancytree.getTree("#treetable").reload().done();
        },
      }
    }
  }
};
</script>