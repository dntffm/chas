<template>
  <div class="row">
        <div class="col-lg-12">
            <div class="card card-custom">
                <div class="card-header py-0">
                    <div class="row align-items-center">
                        <div class="row align-items-center">
                            <h1>Riwayat Transaksi</h1>
                        </div>
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
                                            <th scope="col" style="width: 20%">Tanggal</th>
                                            <th scope="col" style="width: 20%">Nama Barang</th>
                                            <th scope="col" style="width: 20%">Kategori</th>
                                            <th scope="col" style="width: 20%">Harga</th>
                                            <th scope="col" style="width: 10%">Jumlah Barang</th>
                                            <th scope="col" style="width: 10%">Total</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(i,index) in datas" :key="index">
                                            <td>{{index+1}}</td>
                                            <td>{{i.created_at}}</td>
                                            <td>{{i.item.name}}</td>
                                            <td>{{i.item.item_category}}</td>
                                            <td>{{i.item.price}}</td>
                                            <td>{{i.qty}}</td>
                                            <td>{{i.total}}</td>
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
        axios.get('http://guarded-journey-48387.herokuapp.com/public/api/bill', {
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