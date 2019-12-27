<template>
  <div id="appHeader">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#"
            ><i class="fas fa-bars"></i
          ></a>
        </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <!-- Messages Dropdown Menu -->
        <!-- <button v-for="entry in languages" :key="entry.title" >
          <flag :iso="entry.flag" v-bind:squared=false />
            {{entry.title}}
        </button> -->
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
        <li class="nav-item dropdown">
          <a
            class="nav-link"
            data-toggle="dropdown"
            href="#"
            aria-expanded="false"
            data-id="123"
          >
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge">{{
              listdata.total
            }}</span>
          </a>
          <div  class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span class="dropdown-item dropdown-header"
              >{{ listdata.total }} Notifications</span
              >
            <div class="dropdown-divider"></div>

            <div  v-for="(item, key, index) in data" :key="index">

            <a v-if="item.Action == 'Comment' && item.SenderID !== userid " href="#" class="dropdown-item" :data-id="item.ID" >
              <h4><span v-if="item.Seen === false" class="badge bg-green">New</span> Comment <i class="fa fa-comment fa-fw"></i><small class="pull-right"><i class="fa fa-clock-o"></i> </small></h4>
              <p>The account {{item.SenderID === sessionUserID ? "you" : item.Sender}} mentioned {{item.RecipientID === sessionUserID ? "you" : item.Recipient}} in {{item.Title}}</p>
              <p>{{item.Content}}</p>
            </a>

            <a v-if="item.Action == 'Task' && item.SenderID !== userid " href="#" class="dropdown-item" :data-id="item.ID" >
              <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Add Task <i class="fa fa-tasks fa-fw"></i><small class="pull-right"><i class="fa fa-clock-o"></i> </small></h6>
              <p>The account {{item.Sender}} assigned  {{item.RecipientID === sessionUserID ? "you" : item.Recipient}} the task {{item.TaskName}} </p>
              <p>{{item.Title}}</p>
              <p>KPI - {{item.KPIName}}</p>
            </a>

            <a v-if="item.Action == 'Done' && item.SenderID !== userid " href="#" class="dropdown-item" :data-id="item.ID" >
              <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Update Task Status <i class="fa fa-tasks fa-fw"></i><small class="pull-right"><i class="fa fa-clock-o"></i> </small></h6>
              <p>The account {{item.Sender}} has finished the task {{item.TaskName}}</p>
              <p>{{item.Title}}</p>
              <p>KPI - {{item.KPIName}}</p>
            </a>

            <a v-if="item.Action == 'Approval' && item.SenderID !== userid " href="#" class="dropdown-item" :data-id="item.ID" >
             <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Approval Task  <i class="fa fa-tasks fa-fw"></i><small class="pull-right"><i class="fa fa-clock-o"></i> </small></h6>
              <p>Your task {{item.TaskName}} was approved by {{item.Sender}}</p>
            </a>

            <a v-if="item.Action == 'UpdateApproval' && item.SenderID !== userid " href="#" class="dropdown-item" :data-id="item.ID" >
              <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Update Approval Task  <i class="fa fa-tasks fa-fw"></i><small class="pull-right"><i class="fa fa-clock-o"></i> </small></h6>
              <p>The account {{item.Sender}} hasn't approved status the task {{item.TaskName}}</p>
            </a>

            <a v-if="item.Action == 'LateOnTask' " href="#" class="dropdown-item" :data-id="item.ID" >
              <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Late On Task  <i class="fa fa-tasks fa-fw"></i><small class="pull-right"><i class="fa fa-clock-o"></i> </small></h6>
              <p>Some of task are overdue. Please check your email</p>
            </a>

            <a v-if="item.Action == 'LateOnUploadData' " href="#" class="dropdown-item" :data-id="item.ID" >
              <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Late On Upload Data  <i class="fa fa-tasks fa-fw"></i><small class="pull-right"><i class="fa fa-clock-o"></i> </small></h6>
              <p>There are some KPIs that haven't uploaded their data on time. Please check your email</p>
            </a>

            <a v-if="item.Action == 'Upload' || item.SenderID === userid || item.RecipientID === userid || item.UserID === userid " href="#" class="dropdown-item" :data-id="item.ID" >
              <h6><span v-if="item.Seen === false" class="badge bg-green">New</span> Upload Successfully <small class="pull-right"><i class="fa fa-clock-o"></i> </small></h6>
              <p>{{item.SenderID == userid ? "You" : "The account " + item.Sender}} has uploaded KPIs data successfully!</p>
            </a>

            </div>

            <div class="dropdown-divider"></div>

            <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            User
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a href="#" class="dropdown-item">
              <i class="fas fa-envelope mr-2"></i> Change Password
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" @click.prevent="logout" class="dropdown-item">
              <i class="fas fa-users mr-2"></i> Logout
            </a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            data-widget="control-sidebar"
            data-slide="true"
            href="#"
          >
            <i class="fas fa-th-large"></i>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->
  </div>
</template>

<script>
import { HTTP } from "../../http-constants";
import VueJwtDecode from "vue-jwt-decode";
import i18n from "../../lang/i18n";
import signal from "../../hub";
export default {
  name: "appHeader",
  data: function() {
    return {
      userid: 0,
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

  computed: {
    user: function() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    onScoreChanged({ user, message }) {
      console.log(user);
    },
    changeLocale(locale) {
      i18n.locale = locale;
    },
    getAllNotifications() {
      let seft = this;
      HTTP.get("Home/GetNotifications").then(r => {
        seft.arrayID = r.data.arrayID;
        console.log(seft.arrayID);
        seft.data = r.data.data;
        console.log(seft.data);
        seft.listdata = r.data;
        seft.userid = VueJwtDecode.decode(localStorage.getItem("authToken")).nameid;
        console.log(seft.listdata);
      });
    },
    logout: function() {
      this.$auth.destroyToken();
      // this.user = {};
      this.$router.push("/login");
      swal.fire({
        title: "Success!",
        text: "Logout successfully!",
        type: "success"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
