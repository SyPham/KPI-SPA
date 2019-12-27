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
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span class="dropdown-item dropdown-header"
              >{{ listdata.total }} Notifications</span
            >
            <div class="dropdown-divider"></div>
            <a
              v-for="(item, key, index) in data"
              :key="index"
              href="#"
              class="dropdown-item"
            >
              <i class="fas fa-envelope mr-2"></i> 4 new messages
              <span class="float-right text-muted text-sm">3 mins</span>
            </a>
            <div class="dropdown-divider"></div>

            <a href="#" class="dropdown-item dropdown-footer"
              >See All Notifications</a
            >
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
