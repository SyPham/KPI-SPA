import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "./components/auth/Auth.vue";
import Login from "./components/auth/Login.vue";
// import Register from "./components/auth/Register.vue";
// import AdminKPI from "./components/dash/AdminKPI.vue";
import Dash from "./components/dash/Dash.vue";
// import Profile from "./components/dash/Profile.vue";
// import Settings from "./components/dash/Settings.vue";
import Home from "./components/dash/Home.vue";

//AdminKPI
import AdminKPI from "./views/AdminKPI/Index";
import UpdateKPI from "./views/AdminKPI/Update";
import CreateKPI from "./views/AdminKPI/Create";

//AdminUsers
import AdminUser from "./views/AdminUser/Index";
import UpdateUser from "./views/AdminUser/Update";
import CreateUser from "./views/AdminUser/Create";

//AdminCategory
import AdminCategory from "./views/AdminCategory/Index";
import UpdateCategory from "./views/AdminCategory/Update";
import CreateCategory from "./views/AdminCategory/Create";

//AdminMenu
import AdminMenu from "./views/AdminMenu/Index";
import UpdateMenu from "./views/AdminMenu/Update";
import CreateMenu from "./views/AdminMenu/Create";

//AdminOC
import AdminOC from "./views/AdminOC/Index";

//AddUserToLevel
import AddUserToLevel from "./views/AddUserToLevel/Index";

//AddUserToLevel
import UserFavourite from "./views/UserFavourite/Index";

//AdminLevel
import AdminLevel from "./views/AdminLevel/Index";

//AdminCategoryOC
import AdminCategoryOC from "./views/AdminCategoryOC/Index"

//AdminOCCategoryKpi
import AdminOCCategoryKpi from "./views/AdminOCCategoryKpi/Index"

//UserKPI
import UserKPI from "./views/UserKPI/Index"

//ChartPeriod
import ChartPeriod from "./views/ChartPeriod/Index"

//Datasets
import Dataset from "./views/Datasets/Index"

//Datasets
import Workplace from "./views/Workplace/Index"

//Compare
import Compare from "./views/Compare/Index"

//LateOnUpload
import LateOnUpload from "./views/LateOnUpload/Index"

//ListHistoryNotification
import ListHistoryNotification from "./views/ListHistoryNotification/Index"

//ChartPeriod/ListTasks
import ListTask from "./views/ListTask/Index"

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      //HOME
      path: "/",
      component: Dash,
      redirect: "/home",
      children: [
        { path: "home",component: Home , meta: { requiresAuth: true } }
      ]
    },
    //adminKPI
    {
      path: "/adminKPI",
      component: Dash,
      children: [ 
        {path: "/adminKPI",component: AdminKPI , meta: { requiresAuth: true } },
        { path: "/adminKPI/create",component: CreateKPI ,meta:{ requiresAuth: true} },
        { path: "/adminKPI/:id/edit", component: UpdateKPI ,meta:{ requiresAuth: true} }
      ]
    },

    //adminUser
    {
      path: "/adminUser",
      component: Dash,
      children: [ 
        {path: "/adminUser",component: AdminUser ,meta:{ requiresAuth: true} },
        { path: "/adminUser/create",component: CreateUser ,meta:{ requiresAuth: true} },
        { path: "/adminUser/:id/edit", component: UpdateUser, meta:{ requiresAuth: true} }
      ]
    },

    //adminCategory
    {
      path: "/adminCategory",
      name:"adminCategory",
      component: Dash,
      children: [
        { path: "/adminCategory",component: AdminCategory,meta:{ requiresAuth: true}},
        { path: "/adminCategory/create", component: CreateCategory,meta:{ requiresAuth: true}},
        { path: "/adminCategory/:id/edit",component: UpdateCategory,meta:{ requiresAuth: true}}
      ]
    },
    //adminMenu
    {
      path: "/Menus",
      component: Dash,
      children: [
        { path: "/Menus",component: AdminMenu,meta:{ requiresAuth: true}},
        { path: "/Menus/create", component: CreateMenu,meta:{ requiresAuth: true}},
        { path: "/Menus/:id/edit",component: UpdateMenu,meta:{ requiresAuth: true}}
      ]
    },

    //adminOC
    {
      path: "/adminOC",
      component: Dash,
      children: [
        { path: "/adminOC",component: AdminOC,meta:{ requiresAuth: true} }
      ]
    },

    //AddUserToLevel
    {
      path: "/AddUserToLevel",
      component: Dash,
      children: [
        { path: "/AddUserToLevel",component: AddUserToLevel,meta:{ requiresAuth: true} }
      ]
    },

    //adminLevel
    {
      path: "/adminLevel",
      component: Dash,
      children: [
        { path: "/adminLevel",component: AdminLevel,meta:{ requiresAuth: true} }
      ]
    },

    //adminCategoryOC
    {
      path: "/OCCategories",
      component: Dash,
      children: [
        { path: "/OCCategories",component: AdminCategoryOC,meta:{ requiresAuth: true}}
      ]
    },
    
    //AdminOCCategoryKpi
    {
      path: "/CategoryKPILevelAdmin",
      component: Dash,
      children: [
        { path: "/CategoryKPILevelAdmin",component: AdminOCCategoryKpi ,meta:{ requiresAuth: true} }
      ]
    },
    //Login
    {
      path: "/login",
      component: Auth,
      children: [ 
        { path: "/login", component: Login , meta: { requiresGuest: true} }
        
      ]
    },
    

    //UserFavourite
    {
      path: "/Favourite",
      component: Dash,
      children: [
        { path: "/Favourite",component: UserFavourite, meta:{ requiresAuth: true}  }
        
      ]
    },

    //UserKPI
    {
      path: "/CategoryKPILevel",
      component: Dash,
      children: [
        { path: "/CategoryKPILevel",component: UserKPI ,meta:{ requiresAuth: true} }
      ]
    },

    //ChartPeriod
    {
      path: "/ChartPeriod",
      component: Dash,
      children: [
        { name: 'chart', path: "/ChartPeriod/:kpilevelcode/:catid/:period/:year/:start/:end",component: ChartPeriod , meta:{ requiresAuth: true} },
        { name: 'chart2', path: "/ChartPeriod/:kpilevelcode/:catid/:period/:year/:start/:end/:type/:comID/:dataID/:title" ,component: ChartPeriod, meta:{ requiresAuth: true}  },
      ],
     
     },

    //ChartPeriod/ListTasks
    {
      path: "/ChartPeriod/ListTasks",
      component: Dash,
      children: [
        {  path: "/ChartPeriod/ListTasks/:kpilevelcode",component: ListTask,meta:{ requiresAuth: true}},
      ]
    },

    //Datasets
    {
      path: "/Dataset",
      component: Dash,
      
      children: [
        { name: 'dataset', path: "/Dataset/:catid/:period/:start/:end/:year/",component: Dataset},
        { name: 'dataset2', path: "/Dataset/:catid/:period/:start/:end/:year/:type/:comID/:dataID/:title",component: Dataset,meta:{ requiresAuth: true}}
      ]
    },

    //Workplace
     {
      path: "/Workplace",
      component: Dash,
      children: [
        { path: "/Workplace",component: Workplace,meta:{ requiresAuth: true}}
      ]
    },

    //Compare
    {
      path: "/Compare",
      component: Dash,
      
      children: [
        { name: 'compare', path: "/compare/:obj",component: Compare,meta:{ requiresAuth: true}},
      ]
    },
    

    //LateOnUpload
    {
      path: "/LateOnUpload",
      component: Dash,
      children: [
        { name: 'notification', path: "/LateOnUpload/:notification",component: LateOnUpload,meta:{ requiresAuth: true}}
      ]
    },

    //ListHistoryNotification
    {
      path: "/ListHistoryNotification",
      component: Dash,
      children: [
        { path: "/ListHistoryNotification",component: ListHistoryNotification,meta:{ requiresAuth: true}}
      ]
    },

  ]
});

export default router;
