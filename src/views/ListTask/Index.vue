<template>
    <div>
        <!-- breadcrumb -->
        <ol class="breadcrumb mt-2" >
            <li class="breadcrumb-item">
                <a href="#/home">Home</a>
            </li>
            <li class="breadcrumb-item active">ChartPeriod</li>
            <li class="breadcrumb-item active">ListTasks</li>
        </ol>

        <div class="row">
        <div class="col-md-12">
        <div class="card">
            <div class="card-header">
            <h3 class="card-title">List Tasks</h3>
            </div>
            <div class="card-header">
            
            </div>
        
            <!-- /.card-header -->
            <div class="card-body">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>OC</th>
                    <th>DeadLine</th>
                    <th>KPI Name</th>
                    <th>Code</th>
                    <th>Year</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(kpi,key,index) in data" :key="index">
                    <td>{{key+1}}</td>
                    <td>{{kpi.Area}}</td>
                    <td>{{kpi.DeadLine}}</td>
                    <td>{{kpi.KPIName}}</td>
                    <td>{{kpi.Code}}</td>
                    <td>{{kpi.Year}}</td>
                </tr>
                </tbody>
            </table>
            </div>
            <div class="card-footer clearfix">
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
        </div>
    </div>
    </div>
</template>
<script>
import { HTTP } from "../../http-constants";
import Paginate from "vuejs-paginate";
import VueJwtDecode from 'vue-jwt-decode'
export default {
    data(){
        return {
            data: [],
            totalPage: 0,
            page: 1,
            skip: 0,
            pageSize: 5,
        }
    },
    components:{
        Paginate
    },
    created(){

    },
    methods: {
        changePage(pageNum){
            this.LoadAll(this.name,pageNum)
        }
    }
}
</script>