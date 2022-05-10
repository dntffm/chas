<template>
  <div class="row">
        <div class="col-lg-12">
            <div class="card card-custom">
                <div class="card-header py-0">
                    <div class="row align-items-center">
                        <h1>Dompet</h1>
                    </div>
                </div>
                <div class="card-body" v-if="datas.length == 0">No data</div>
                <div class="card-body" v-else>
                    <div class="row">
                        <div class="col-12 mt-4 p-0">
                            <div class="table-responsive table-responsive-sm table-sv-list">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col" style="width: 10%">#</th>
                                            <th scope="col" style="width: 40%">Tanggal</th>
                                            <th scope="col" style="width: 40%">Total Pemasukan</th>
                                            <th scope="col" style="width: 40%">Total Untung</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(i,index) in datas" :key="index">
                                            <td>{{index+1}}</td>
                                            <td>{{i.date}}</td>
                                            <td>Rp. {{i.total}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return { 
            datas: []
        }
    },
    created(){
        axios.get('http://guarded-journey-48387.herokuapp.com/public/api/sales',{
            headers: {
                Authorization: 'Bearer ' +localStorage.getItem('token')
            }
        })
        .then((response) => {
            this.datas = response.data.data
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
</script>