<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Dashboard</h1>
            </div>
            <div class="col-12 mt-4">
                <h4>Pendapatan</h4>
            </div>
            <div class="col-4">
                <div class="card border-primary p-4">
                    <h5 class="card-title">Hari Ini</h5>
                    <div>Rp. {{datas.profit_daily}}</div>
                </div>
            </div>
            <div class="col-4">
                <div class="card border-primary p-4">
                    <h5 class="card-title">Bulan Ini</h5>
                    <div>Rp. {{datas.profit_monthly}}</div>
                </div>
            </div>
            <div class="col-4">
                <div class="card border-primary p-4">
                    <h5 class="card-title">Tahun Ini</h5>
                    <div>Rp. {{datas.profit_annually}}</div>
                </div>
            </div>
            <div class="col-12 mt-4">
                <h4>Transaksi</h4>
            </div>
            <div class="col-4">
                <div class="card border-primary p-4">
                    <h5 class="card-title">Hari Ini</h5>
                    <div>{{datas.transaction_daily}}</div>
                </div>
            </div>
            <div class="col-4">
                <div class="card border-primary p-4">
                    <h5 class="card-title">Bulan Ini</h5>
                    <div>{{datas.transaction_monthly}}</div>
                </div>
            </div>
            <div class="col-4">
                <div class="card border-primary p-4">
                    <h5 class="card-title">Tahun Ini</h5>
                    <div>{{datas.transaction_annually}}</div>
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
    async created(){
        console.log(localStorage.getItem('token'))
        await axios.get('http://guarded-journey-48387.herokuapp.com/public/api/dashboard', {
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