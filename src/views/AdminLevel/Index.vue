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
            <li class="breadcrumb-item active">OC</li>
          </ol>
        </div>
      </div>
    </div>
    
    <div class="col-md-12">
      <div class="callout bg-yellow-gradient" style="border-color:#c57901">
        <h3>4. Organization Chart</h3>
      </div>
    </div>
    <div class="col-md-12">
      <!-- <hierarchy></hierarchy> -->
      <div class="float-right box-tools">
        <!-- button with a dropdown -->
        <button type="button" class="btn btn-warning btn-sm fancy-collapse">
          <i class="fas fa-compress-arrows-alt"></i> Collapse
        </button>
        <button type="button" class="btn btn-info btn-sm fancy-expand">
          <i class="fas fa-expand-arrows-alt"></i> Expand
        </button>
      </div>
      <table id="tree"  class="table table-condensed table-hover table-striped fancytree-fade-expander fancytree-colorize-selected"  >
        <thead>
          <tr>
            <th style="width:10px">Level Number</th>
            <th class="text-right">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-center"></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import { HTTP } from "../../http-constants";
// import listoc from "../../components/adminOC/List"
import Hierarchy from "../../components/adminOC/Hierarchy";
import listoc from "../../components/adminOC/Modal";
import { HTTP } from '../../http-constants';
export default {
  name: "IndexKpi",
  data() {
    return {
      OCCategory: []
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
      let self = this;
      var CLIPBOARD = null;
      var glyph_opts = {
          preset: "bootstrap3",
          map: {
          }
      };
      $.ui.fancytree.debugLevel = 3; // silence debug output

      function logEvent(event, data, msg) {
          //        var args = $.isArray(args) ? args.join(", ") :
          msg = msg ? ": " + msg : "";
          $.ui.fancytree.info("Event('" + event.type + "', node=" + data.node + ")" + msg);
      }

      $(function () {
        var tree = $("#tree")
          .fancytree({
            //checkbox: true,
            //checkboxAutoHide: true,
            titlesTabbable: true, // Add all node titles to TAB chain
            //quicksearch: true, // Jump to nodes when pressing first character
            // source: SOURCE,
            source: { url: "http://10.4.4.224:98/AdminLevel/GetListTree" },
            extensions: ["edit", "dnd5", "glyph", "table", "gridnav"],
            glyph: glyph_opts,
            dnd5: {
              preventVoidMoves: true,
              preventRecursion: true,
              autoExpandMS: 400,
              dragStart: function (node, data) {
                return true;
              },
              dragEnter: function (node, data) {
                return true;
                //return true;
              },
              dragDrop: function (node, data) {
                if (node.parent !== data.otherNode.parent)
                return false;
                return ["before", "after"];
              },
            },
            edit: {
                triggerStart: ["clickActive", "dblclick", "f2", "mac+enter", "shift+click"],
                beforeEdit: function (event, data) {
                    // Return false to prevent edit mode
                    data.save = false;
                },
                edit: function (event, data) {
                  // Editor was opened (available as data.input)
                  data.save = false;
                },
                beforeClose: function (event, data) {
                  if (data.originalEvent.type === "mousedown") {
                    // We could prevent the mouse click from generating a blur event
                    // (which would then again close the editor) and return `false` to keep
                    // the editor open:
                    //      data.originalEvent.preventDefault();
                    //      return false;
                    // Or go on with closing the editor, but discard any changes:
                    data.save = false;
                  }
                },
                save: function (event, data) {
                  var node = data.node;
                  console.log(data)
                  console.log(data.originalEvent)
                  //if (data.originalEvent.type === "enter") {

                  var dataValue = node.data;
                  var parent = node.parent.key;
                  var key = node.key;

                  var title = data.input.val();
                  var obj = {
                    key: key,
                    code: dataValue.code,
                    title: title,
                    levelnumber: dataValue.levelnumber,
                    parentid: dataValue.parentid
                  }
                  //console.log(obj)
                  // Save data.input.val() or return false to keep the editor open
                  HTTP.post("http://10.4.4.224:98/AdminLevel/Rename",obj)
                  .then(result =>{

                  })
                  .catch(result =>{
                      node.setTitle(data.orgTitle);
                  })
                  // $.ajax({
                  //   url: "http://10.4.4.224:98/AdminLevel/Rename",
                  //   data: obj
                  // }).done(function (result) {
                  // }).fail(function (result) {
                  //   // Ajax error: reset title (and maybe issue a warning)
                  //   node.setTitle(data.orgTitle);
                  // }).always(function () {
                  //   //data.input.removeClass("pending");
                  // });
                  // }

                  // Optimistically assume that save will succeed. Accept the user input
                  return true;
                },
                close: function (event, data) {
                  //console.log(data)
                  if (data.isNew) {
                    // Quick-enter: add new nodes until we hit [enter] on an empty title
                    $("#tree").trigger("nodeCommand", {
                      cmd: "addSibling",
                    });
                  }
                },
              },
              table: {
                nodeColumnIdx: 1
              },
              gridnav: {
                autofocusInput: false,
                handleCursorKeys: true,
              },
              lazyLoad: function (event, data) {
                data.result = { url: "http://10.4.4.224:98/AdminLevel/GetListTree" };
              },
              createNode: function (event, data) {

                var node = data.node,
                  $tdList = $(node.tr).find(">td");

                
                if (node.isFolder()) {
                  $tdList
                  .eq(2)
                  .prop("colspan", 6)
                  .nextAll()
                  .remove();
                }
              },
              renderColumns: function (event, data) {
                  var node = data.node,
                      key = node.key,
                      $tdList = $(node.tr).find(">td");

                  $(node.tr).attr("data-key", key);

                  $tdList.eq(0)
                  .text(node.data.levelnumber);
              },
              modifyChild: function (event, data) {
              },
          })
          .on("nodeCommand", function (event, data) {
              // Custom event handler that is triggered by keydown-handler and
              // context menu:
              var refNode, moveMode,
                tree = $(this).fancytree("getTree"),
                node = tree.getActiveNode();

              switch (data.cmd) {
                case "moveUp":
                  refNode = node.getPrevSibling();
                  if (refNode) {
                    node.moveTo(refNode, "before");
                    node.setActive();
                  }
                  break;
                case "moveDown":
                  refNode = node.getNextSibling();
                  if (refNode) {
                    node.moveTo(refNode, "after");
                    node.setActive();
                  }
                  break;
                case "indent":
                  refNode = node.getPrevSibling();
                  if (refNode) {
                    node.moveTo(refNode, "child");
                    refNode.setExpanded();
                    node.setActive();
                  }
                  break;
                case "outdent":
                  if (!node.isTopLevel()) {
                    node.moveTo(node.getParent(), "after");
                    node.setActive();
                  }
                  break;
                case "rename":
                  node.editStart();
                  break;
                case "remove":
                  refNode = node.getNextSibling() || node.getPrevSibling() || node.getParent();
                  if (refNode) {
                    node.remove();
                    refNode.setActive();
                  }
                  levelAdminController.remove(Number(node.key))
                  break;
                case "addChild":
                  refNode = node.getNextSibling() || node.getPrevSibling() || node.getParent();
                  node.editCreateNode("child", {
                    title: "#N/A"
                  });
                  console.log(refNode)
                  var newData = {
                    key: "0",
                    code: genarateCode(5),
                    title: "#N/A",
                    levelnumber: Number(node.data.levelnumber) + 1,
                    parentid: Number(node.key),
                  };
                  console.log(newData);
                  levelAdminController.add(newData);

                  break;
                case "addSibling":
                  refNode = node.getNextSibling() || node.getPrevSibling() || node.getParent();
                  node.editCreateNode("after");
                  var newData = {
                    key: "0",
                    code: genarateCode(5),
                    title: "#N/A",
                    levelnumber: Number(node.data.levelnumber),
                    parentid: Number(node.data.parentid),
                  };
                  levelAdminController.add(newData);
                  break;
                case "cut":
                  CLIPBOARD = { mode: data.cmd, data: node };
                  break;
                case "copy":
                  CLIPBOARD = {
                    mode: data.cmd,
                    data: node.toDict(function (n) {
                        delete n.key;
                    })
                  };
                  break;
                case "clear":
                  CLIPBOARD = null;
                  break;
                case "paste":
                  if (CLIPBOARD.mode === "cut") {
                    // refNode = node.getPrevSibling();
                    CLIPBOARD.data.moveTo(node, "child");
                    CLIPBOARD.data.setActive();
                  } else if (CLIPBOARD.mode === "copy") {
                    node.addChildren(CLIPBOARD.data).setActive();
                  }
                  break;
                default:
                  alert("Unhandled command: " + data.cmd);
                  return;
              }
          })
          .on("keydown", function (e) {
              var cmd = null;

              // console.log(e.type, $.ui.fancytree.eventToString(e));
              switch ($.ui.fancytree.eventToString(e)) {
                  case "ctrl+shift+n":
                  case "meta+shift+n": // mac: cmd+shift+n
                      cmd = "addChild";
                      break;
                  case "ctrl+c":
                  case "meta+c": // mac
                      cmd = "copy";
                      break;
                  case "ctrl+v":
                  case "meta+v": // mac
                      cmd = "paste";
                      break;
                  case "ctrl+x":
                  case "meta+x": // mac
                      cmd = "cut";
                      break;
                  case "ctrl+n":
                  case "meta+n": // mac
                      cmd = "addSibling";
                      break;
                  case "del":
                  case "meta+backspace": // mac
                      cmd = "remove";
                      break;
                  // case "f2":  // already triggered by ext-edit pluging
                  //   cmd = "rename";
                  //   break;
                  case "ctrl+up":
                  case "ctrl+shift+up": // mac
                      cmd = "moveUp";
                      break;
                  case "ctrl+down":
                  case "ctrl+shift+down": // mac
                      cmd = "moveDown";
                      break;
                  case "ctrl+right":
                  case "ctrl+shift+right": // mac
                      cmd = "indent";
                      break;
                  case "ctrl+left":
                  case "ctrl+shift+left": // mac
                      cmd = "outdent";
              }
              if (cmd) {
                  $(this).trigger("nodeCommand", { cmd: cmd });
                  return false;
              }
          });

      
        $("#tree").contextmenu({
          delegate: "span.fancytree-node",
          menu: [
            {
              title: "Edit <kbd>[F2]</kbd>",
              cmd: "rename",
              uiIcon: "ui-icon-pencil",
            },
            {
              title: "Delete <kbd>[Del]</kbd>",
              cmd: "remove",
              uiIcon: "ui-icon-trash",
            },
            { title: "----" },
            {
              title: "New sibling <kbd>[Enter]</kbd>",
              cmd: "addSibling",
              uiIcon: "ui-icon-plus",
            },
            {
              title: "New child <kbd>[Enter]</kbd>",
              cmd: "addChild",
              uiIcon: "ui-icon-arrowreturn-1-e",
            },
          ],
          beforeOpen: function (event, ui) {
            var node = $.ui.fancytree.getNode(ui.target);
            $("#tree").contextmenu(
              "enableEntry",
              "paste",
              !!CLIPBOARD
            );
            node.setActive();
          },
          select: function (event, ui) {
            var that = this;
            // delay the event, so the menu can close and the click event does
            // not interfere with the edit control
            setTimeout(function () {
                $(that).trigger("nodeCommand", { cmd: ui.cmd });
            }, 100);
          },
        });



        $(".fancytree-container").addClass("fancytree-connectors");

        $('.fancy-collapse').off('click').on('click', function () {
          $("#tree").fancytree("getTree").expandAll(false);
        });
        $('.fancy-expand').off('click').on('click', function () {
          $("#tree").fancytree("getTree").expandAll();
        });
        /* Handle custom checkbox clicks */
        $("#tree").on("click keyup", "input[name=code]", function (e) {
          if (e.keyCode == 13) {
            var node = $.ui.fancytree.getNode(e),
              $input = $(e.target);
            var code = $input.val(),
              dataValue = node.data,
              key = node.key,
              title = node.title,
              obj = {
                key: key,
                code: code,
                title: title,
                levelnumber: dataValue.levelnumber,
                parentid: dataValue.parentid
              };
            console.log(obj)
            levelAdminController.rename(obj)
            levelAdminController.loadData()
          }
          e.stopPropagation();  // prevent fancytree activate for this row

        });
        levelAdminController.init();
      });

      var levelAdminController = {
        init() {
          levelAdminController.registerEvent();
        },
        registerEvent() {
          $('#btnSave').off('click').on('click', function () {
            levelAdminController.addOrUpdateData();
          });
          $('.btnAddLevel').off('click').on('click', function () {
            levelAdminController.resetForm();
          })
        },
        rename(obj) {
          var level = {
            key: Number(obj.key),
            code: obj.code,
            title: obj.title,
            levelnumber: obj.levelnumber,
            parentid: obj.parentid,
          };
          HTTP.post("http://10.4.4.224:98/AdminLevel/Rename",JSON.stringify(level))
          .then(result=>{
            if (result) {
                success('Edit successfully!');
                levelAdminController.loadData(true);
              }
              else {
                error('his code has already existed!');
              }
          }).catch(err =>{
              console.log("err");
          })
          // $.ajax({
          //   url: "http://10.4.4.224:98/AdminLevel/Rename",
          //   data: JSON.stringify(level),
          //   type: "POST",
          //   contentType: "application/json;charset=utf-8",
          //   dataType: "json",
          //   success: function (result) {
          //     if (result) {
          //       success('Edit successfully!');
          //       levelAdminController.loadData(true);

          //     }
          //     else {
          //       error('his code has already existed!');
          //     }
          //   },
          //   error: function (errormessage) {
          //     console.log(errormessage);
          //   }
          // });
        },
        remove(id) {
          var value = id;
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              HTTP.get(`http://10.4.4.224:98/AdminLevel/Remove/${JSON.stringify(value)}`)
              .then(result =>{
                success('Delete successfully.');
                levelAdminController.loadData();
              }).catch(errormessage =>{
                console.log(errormessage);
              })
              success('Reacord has been deleted.');
              }
              else if (result.dismiss === Swal.DismissReason.cancel) {
                error('Your imaginary file is safe.');
                levelAdminController.loadData();
              }
          });
        },
        add(obj) {
          var mObj = {
            key: Number(obj.key),
            Code: obj.code,
            Name: obj.title,
            LevelNumber: obj.levelnumber,
            ParentID: obj.parentid
          };
          HTTP.post("http://10.4.4.224:98/AdminLevel/Add",JSON.stringify(mObj))
          .then(result=>{
            if (result) {
                success('Add successfully!');
                levelAdminController.loadData();
              }
              else {
                error('This code has already existed!');
              }
          })
        },
        addOrUpdateData() {
          var res = levelAdminController.validate();
          if (res === false) {
            return false;
          };
          var mObj = {
            ID: $('#addKPI .ID').val(),
            Code: $('#addKPI .Code').val(),
            Name: $('#addKPI .Name').val(),
            LevelNumber: $('#addKPI .LevelID').val(),
            ParentID: $('#addKPI .ParentID').val()
          };
          HTTP.post("http://10.4.4.224:98/AdminLevel/AddOrUpdate",JSON.stringify(mObj)).then(result =>{
            if (result) {
                success('Add successfully!');
                levelAdminController.loadData();
                levelAdminController.resetForm();
              }
              else {
                error('This code has already existed!');
              }
          }).catch(err =>{
            console.log(err);
          })
          // $.ajax({
          //   url: "http://10.4.4.224:98/AdminLevel/AddOrUpdate",
          //   data: JSON.stringify(mObj),
          //   type: "POST",
          //   contentType: "application/json;charset=utf-8",
          //   dataType: "json",
          //   success: function (result) {
          //     if (result) {
          //       success('Add successfully!');
          //       levelAdminController.loadData();
          //       levelAdminController.resetForm();
          //     }
          //     else {
          //       error('This code has already existed!');
          //     }
          //   },
          //   error: function (errormessage) {
          //     console.log(errormessage);
          //   }
          // });
        },
        loadData() {
          $.ui.fancytree.getTree("#tree").reload().done(x => {
            $("#tree").fancytree("getTree").expandAll();
          });
        },
        loadDetail(id) {
          var value = id;
          $.ajax({
            url: 'http://10.4.4.224:98/AdminLevel/GetByID',
            data: {
              id: Number(value)
            },
            type: "GET",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
              $('#addKPI .Name').val(result.Name);
              $('#addKPI .Code').val(result.Code);
              $('#addKPI .LevelID').val(result.LevelNumber);
              $('#addKPI .ParentID').val(result.ParentID);
              $('#addKPI .ID').val(result.ID);

            },
            error: function (err) {
              console.log(err);
            }
          });
        },
        resetForm() {
          $('.ID').val("");
          $('.Name').val("");
          $('.Code').val("");
          $('.LevelID').val("");
          $('.ParentID').val("");

          $('.ID').css('border-color', 'lightgrey');
          $('.Name').css('border-color', 'lightgrey');
          $('.Code').css('border-color', 'lightgrey');
          $('.LevelID').css('border-color', 'lightgrey');
          $('.ParentID').css('border-color', 'lightgrey');
        },
        validate() {
          var isValid = true;
          if ($('.Name').val().trim() === "") {
            $('.Name').css('border-color', 'Red');
            isValid = false;
          }
          else {
            $('.Name').css('border-color', 'lightgrey');
          }
          if ($('.Code').val().trim() === "") {
            $('.Code').css('border-color', 'Red');
            isValid = false;
          }
          else {
            $('.Code').css('border-color', 'lightgrey');
          }
          if ($('.LevelID').val().trim() === "") {
            $('.LevelID').css('border-color', 'Red');
            isValid = false;
          }
          else {
            $('.LevelID').css('border-color', 'lightgrey');
          }
          if ($('.ParentID').val().trim() === "") {
            $('.ParentID').css('border-color', 'Red');
            isValid = false;
          }
          else {
            $('.ParentID').css('border-color', 'lightgrey');
          }
          return isValid;
        },
      }
    }
  }
};
</script>