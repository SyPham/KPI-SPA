<template>
  <div id="appHeader" >
    <!-- Navbar -->
    <nav  class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#"
            ><i class="fas fa-bars"></i
          ></a>
        </li>
        
      </ul>
      
      <!-- Right navbar links -->
      <ul  class="navbar-nav ml-auto">
        <!-- Messages Dropdown Menu -->
        <!-- <button v-for="entry in languages" :key="entry.title" >
          <flag :iso="entry.flag" v-bind:squared=false />
            {{entry.title}}
        </button> -->
        <!-- language -->

        <li>
          <div class="henry-pham">
            <ul>
              <li
                v-for="entry in languages"
                :key="entry.title"
                @click="changeLocale(entry.language)"
                :title="entry.title"
                >
                <flag
                  style="fontsize:"
                  :iso="entry.flag"
                  v-bind:squared="false"
                />
                {{ entry.title }} |
              </li>
            </ul>
          </div>
        </li>

        <!-- notification -->
        <li  class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="false" data-id="123">
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge">{{listdata.total}}</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-lg2 dropdown-menu-right" style="border-radius: 11px" >
            <span class="dropdown-item dropdown-header">You have {{ listdata.total }} Notifications</span>
            <div  class="dropdown-divider"></div>

            <li>
              <ul style="list-style: none ; padding: 0 ; margin: 0 ; overflow-x: scroll ; height:240px"  class="box-scrollbar"> 
                <li v-for="(item, key, index) in data" :key="index">

                    <!-- comment -->
                    <a v-if="item.Action == 'Comment' && item.SenderID !== userid "  :href="item.Link" class="dropdown-item" style="cursor: pointer" :data-id="item.ID" >
                      <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Comment <i class="fas fa-comment"></i><small class="float-right"><i class="far fa-clock"></i> {{JSONDateWithTime(item.CreateTime)}} </small></h6>
                      <p style="font-size:14px">The account {{item.SenderID == userid ? "you" : item.Sender}} mentioned {{item.RecipientID == userid ? "you" : item.Recipient}} in {{item.Title}}</p>
                      <p>{{item.Content}}</p>
                    </a>

                    <div  class="dropdown-divider"></div>

                    <!-- Task -->
                    <a v-if="item.Action == 'Task' && item.SenderID !== userid " @click="gettask(item.URL)"   class="dropdown-item" style="cursor: pointer" :data-id="item.ID" >
                      <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Add Task <i class="fas fa-tasks"></i><small class="float-right"><i class="far fa-clock"></i> {{JSONDateWithTime(item.CreateTime)}} </small></h6>
                      <p style="font-size:14px">The account {{item.Sender}} assigned  {{item.RecipientID == userid ? "you" : item.Recipient}} the task {{item.TaskName}} </p>
                      <p>{{item.Title}}</p>
                      <p>KPI - {{item.KPIName}}</p>
                    </a>

                     <!-- Task-Auditor -->
                    <a v-if="item.Action == 'Task-Auditor' && item.SenderID !== userid " href="#/Workplace" class="dropdown-item" style="cursor: pointer" :data-id="item.ID" >
                      <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Add Task (Auditor) <i class="fas fa-tasks"></i><small class="float-right"><i class="far fa-clock"></i> {{JSONDateWithTime(item.CreateTime)}} </small></h6>
                      <p class="wordWrap">The account {{item.Sender}} created the task "{{item.TaskName}}", assigned to {{item.RecipientID === sessionUserID ? "you" : item.Recipient}} are Auditor. </p>
                      <p class="wordWrap">{{item.Title}}</p>
                      <p class="wordWrap">KPI Name "{{item.KPIName}}"</p>
                    </a>

                    <!-- Done -->
                    <a v-if="item.Action == 'Done' && item.SenderID !== userid " :href="item.URL" class="dropdown-item" style="cursor: pointer" :data-id="item.ID" >
                      <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Update Task Status <i class="fas fa-tasks"></i><small class="float-right"><i class="far fa-clock"></i> {{JSONDateWithTime(item.CreateTime)}} </small></h6>
                      <p style="font-size:14px">The account {{item.Sender}} has finished the task {{item.TaskName}}</p>
                      <p>{{item.Title}}</p>
                      <p>KPI - {{item.KPIName}}</p>
                    </a>

                    <!-- Approval -->
                    <a v-if="item.Action == 'Approval' && item.SenderID !== userid " :href="item.URL" class="dropdown-item" style="cursor: pointer" :data-id="item.ID" >
                    <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Approval Task  <i class="fas fa-tasks"></i><small class="float-right"><i class="far fa-clock"></i> {{JSONDateWithTime(item.CreateTime)}} </small></h6>
                      <p style="font-size:14px">Your task {{item.TaskName}} was approved by {{item.Sender}}</p>
                    </a>

                    <!-- UpdateApproval -->
                    <a v-if="item.Action == 'UpdateApproval' && item.SenderID !== userid " href="#/Workplace" class="dropdown-item" style="cursor: pointer" :data-id="item.ID" >
                      <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Update Approval Task <i class="fas fa-tasks"></i><small class="float-right"><i class="far fa-clock"></i> {{JSONDateWithTime(item.CreateTime)}} </small></h6>
                      <p style="font-size:14px">The account {{item.Sender}} hasn't approved status the task {{item.TaskName}}</p>
                    </a>

                    <!-- LateOnTask -->
                    <a v-if="item.Action == 'LateOnTask' " href="#/Workplace" class="dropdown-item" style="cursor: pointer" :data-id="item.ID" >
                      <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Late On Task  <i class="fas fa-tasks"></i><small class="float-right"><i class="far fa-clock"></i> {{JSONDateWithTime(item.CreateTime)}} </small></h6>
                      <p style="font-size:14px">Some of task are overdue. Please check your email</p>
                    </a>

                    <!-- LateOnUploadData -->
                    <a v-if="item.Action == 'LateOnUploadData' " @click="getnotifi(item.NotificationID)"  style="cursor: pointer" class="dropdown-item" :data-id="item.ID" >
                      <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Late On Upload Data  <i class="fas fa-tasks"></i><small class="float-right"><i class="far fa-clock"></i> {{JSONDateWithTime(item.CreateTime)}} </small></h6>
                      <p style="font-size:14px">There are some KPIs that haven't uploaded their data on time. Please check your email</p>
                    </a>

                    <!-- Upload -->
                    <a v-if="item.Action == 'Upload' || item.SenderID === userid || item.RecipientID === userid || item.UserID === userid " href="#/Workplace" class="dropdown-item" style="cursor: pointer" :data-id="item.ID" >
                      <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Upload Successfully <small class="float-right"><i class="far fa-clock"></i> {{JSONDateWithTime(item.CreateTime)}} </small></h6>
                      <p style="font-size:14px">{{item.SenderID == userid ? "You" : "The account " + item.Sender}} has uploaded KPIs data successfully!</p>
                    </a>
                </li>
              </ul>
            </li>
            <div class="dropdown-divider"></div>

            <a href="#/ListHistoryNotification" style="text-align: center" class="dropdown-item dropdown-footer">See All Notifications</a>
          </ul>
        </li>

        <!-- changepassword -->
        <li  class="nav-item dropdown">
          <a  class="nav-link" data-toggle="dropdown" href="#">
            {{username}}
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a  style="cursor:pointer" data-toggle="modal" data-target="#modal-group-change-password" class="dropdown-item">
              <i class="fas fa-key"></i> Change Password
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" @click.prevent="logout" class="dropdown-item">
              <i class="fas fa-sign-out-alt"></i> Logout
            </a>
            <div class="dropdown-divider"></div>
          </div>
        </li>

        <!-- logout -->
        <li class="nav-item">
          <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#">
            <i class="fas fa-th-large"></i>
          </a>
        </li>

      </ul>
      
    </nav>

    
    <!-- /.navbar -->
    <!-- @* ChangePassword *@ -->
    <div class="modal fade" id="modal-group-change-password" style="display: none">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Change password </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="box-body" id="ChangePassword">
                            <div class="form-group">
                                <label for="username">Username </label>
                                <input type="text"  v-model="username" class="form-control username disabled" placeholder="username" disabled>
                            </div>
                            <div class="form-group">
                                <label for="password">Password </label>
                                <input type="password" v-model="password" class="form-control password" placeholder="Enter password">
                            </div>

                        </div>
                        <!-- /.box-body -->

                        <div class="box-footer">
                            <button id="btnChangePassword" @click="changepassword" class="btn btn-primary">Save</button>
                            <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Close</button>
                        </div>
                    </div>
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
import VueJwtDecode from "vue-jwt-decode";
import i18n from "../../lang/i18n";
import signal from "../../hub";
import EventBus from "../../utils/EventBus.js";
export default {
  name: "appHeader",
  data: function() {
    return {
      userid: 0,
      username: null,
      password : null,
      time: 0,
      arrayID: [],
      data: [],
      listdata: [],
      languages: [
        { flag: "tw", language: "tw-zh", title: "中文" },
        { flag: "us", language: "en", title: "English" },
        { flag: "vn", language: "vi", title: "Tiếng Việt" }
      ]
    };
  },
  created: function() {

    let seft = this;
    seft.username  =  localStorage.getItem("User")
    seft.getAllNotifications();
    // Listen to score changes coming from SignalR events
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://10.4.4.224:98/henry-hub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
    connection.start().then(function () {
        console.log("connected");
    });

    connection.on("ReceiveMessage", (user, message) => {
      console.log("ReceiveMessage");
    seft.getAllNotifications();
    });
  },
  methods: {
    gettask(URL){
      EventBus.$emit('hello', URL);
      window.location.href = URL
      
    },
    getnotifi(NotificationID){
      EventBus.$emit('hello', NotificationID);
      return this.$router.push(`/LateOnUpload/${NotificationID}`)
    },
    changepassword(){
      // debugger
      HTTP.post("https://localhost:44309/AdminUser/ChangePassword",{
        id: VueJwtDecode.decode(localStorage.getItem("authToken")).nameid,
        username: this.username ,
        password: this.password
      }).then(r=>{
        success("ChangePass successfully!");
        $("#modal-group-change-password").modal("hide");
      })
    },
    JSONDateWithTime(dateStr){
      var d = new Date(dateStr);
      var m, day;
      m = d.getMonth() + 1;
      if (m < 10)
          month = '0' + m;
      else
          month = m;
      if (d.getDate() < 10)
          day = '0' + d.getDate();
      else
          day = d.getDate();

      var year = d.getFullYear();
      var formattedDate = day + "/" + month + "/" + year;
      var hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      var seconds = d.getSeconds();
      var formattedTime = hours + ":" + minutes;
      formattedDate = formattedTime + " - " + formattedDate;

      //Ngày giờ hiện tại
      var dateObj = new Date();
      var dayNow = dateObj.getDate();
      var monthNow = dateObj.getMonth() + 1;
      var yearNow = dateObj.getFullYear();
      var hoursNow = dateObj.getHours();
      var minutesNow = dateObj.getMinutes();
      var secondsNow = dateObj.getSeconds();

      dateObj = formattedDate;

      if (hoursNow - hours === 0 && minutesNow - minutes === 0 && yearNow - year === 0 && monthNow - month === 0 && dayNow - day === 0) {
          if (secondsNow - seconds === 0)
              dateObj = "just recently";
          else if (secondsNow - seconds === 1)
              dateObj = secondsNow - seconds + " second ago";
          else
              dateObj = secondsNow - seconds + " seconds ago";
      }

      if (hoursNow - hours === 0 && minutesNow - minutes > 0 && yearNow - year === 0 && monthNow - month === 0 && dayNow - day === 0) {


          if (minutesNow - minutes === 1)
              dateObj = minutesNow - minutes + " minute ago";
          else
              dateObj = minutesNow - minutes + " minutes ago";
      }

      if (hoursNow - hours > 0 && yearNow - year === 0 && monthNow - month === 0 && dayNow - day === 0) {
          if (hoursNow - hours === 1)
              dateObj = hoursNow - hours + " hour ago";
          else
              dateObj = hoursNow - hours + " hours ago";
      }

      if (yearNow - year === 0 && monthNow - month === 0 && dayNow - day > 0 && dayNow - day <= 7) {
          if (dayNow - day === 1)
              dateObj = dayNow - day + " day ago";
          else
              dateObj = dayNow - day + " days ago";
      }

      if (yearNow - year === 0 && monthNow !== month) {
          day = dayNow - day;
          var month = monthNow - month;
          day = month * 30 + day;
          if (0 < day && day <= 7) {
              dateObj = day + " days ago";
          }

      }

      return dateObj;
    },
    onScoreChanged({ user, message }) {
      //console.log(user);
    },
    changeLocale(locale) {
      i18n.locale = locale;
    },
    getAllNotifications() {
      let seft = this;
      HTTP.get("Home/GetNotifications").then(r => {
        seft.arrayID = r.data.arrayID;
        //console.log(seft.arrayID);
        seft.data = r.data.data;
        seft.listdata = r.data;
        seft.userid = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid;
        console.log(seft.userid);
      });
    },
    logout: function() {
      this.$auth.destroyToken();
      // this.user = {};
      this.$router.push("/login");
      success("success!");
    }
  }
};
</script>

<style lang="scss" scoped>
.box-scrollbar::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    border-radius: 5px
}

.box-scrollbar::-webkit-scrollbar {
    width: 10px;
    background-color: #F5F5F5;
    border-radius: 5px;
}

.box-scrollbar::-webkit-scrollbar-thumb {
    background-color: black;
    border: 2px solid black;
    border-radius: 5px
}

.box-notification {
    -webkit-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.2);
    -moz-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
    box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
    background-color: #F4F4F4;
    border-radius: 10px;
}


.boxdataset-scrollbar::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    border-radius: 5px
}

.boxdataset-scrollbar::-webkit-scrollbar {
    width: 10px;
    background-color: #F5F5F5;
    border-radius: 5px
}

.boxdataset-scrollbar::-webkit-scrollbar-thumb {
    background-color: #808080;
    border: 2px solid #808080;
    border-radius: 5px
}

.textOverflow {
    white-space: nowrap;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.labelOverflow {
    overflow: hidden;
    text-overflow: ellipsis;
}
a.dropdown-item:hover {
    background: gainsboro;
}
.dropdown-menu-lg2 {
    max-width: 361px;
    min-width: 700px;
}
button {
  border: 1px solid green;
  font-size: 15px;
  margin: auto;
}

.henry-pham {
  padding-right: 12px;
  padding-left: 12px;
  display: block;
}

.henry-pham ul > li > :hover {
  background-color: rgba(60, 105, 101, 0.5);
}

.henry-pham li {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}

.henry-pham li img {
  width: 29px;
}

.ulbadge {
  position: relative;
  background: rgba(0, 0, 0, 0.1);
  display: block;
  cursor: pointer;
  text-decoration: none;
}

.ulbadge > .spabbadge {
  position: absolute;
  top: 0;
  transform: translate(70%, 30%);
}
</style>
