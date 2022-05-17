<template>
    <div class="container">
        <div class="row">
            <div class="col-8">
                <div class="row mt-4">
                    
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="input-group">
                            <input type="text" class="form-control w-50"
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder="Cari nama barang" v-model="payload.keyword">
                            <button @click="fetchData()" class="btn btn-primary ml-3">Cari</button>
                        </div>
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col-12 d-flex justify-content-between align-items-center">
                        <h3 class="fw-bold">Daftar Barang</h3>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTambahBarang">Tambah Barang</button>
                    </div>
                    <div class="col-4 mb-3 mt-3" v-for="(i,index) in items" :key="index">
                        <div class="bg-body rounded-3 cursor-pointer p-2">
                            <div class="row p-3">
                                <div class="d-flex flex-column align-items-center text-center">
                                    <img src="https://dev-api.simplyvilla.id/storage/images/business/1/1/item/39/1647917471010718600.jpg" class="rounded-2"
                                            style="height: 72px;">
                                    <div class="mx-2">
                                        <h6 class="fw-bold">{{i.name}}</h6>
                                        <p>{{i.sku}} - {{i.location}}</p>
                                        <span>Rp. {{parseFloat(i.price) + parseFloat(i.profit ?? 0)}}</span>
                                    </div>
                                </div>
                                <button @click="addBill(i)" type="button" class="btn btn-primary btn-sm mt-3 fw-bold"><small>Tambah ke Nota</small></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4 bg-body rounded-3" style="min-height:100vh" ref="exportedBody">
                <div class="row" v-if="bills.length != 0">
                    <div class="col-12 p-3">
                        <h3 class="fw-bold">Bills</h3>
                    </div>
                    <div class="col-12" v-for="(i, index) in bills" :key="index">
                        <div class="bg-body rounded-3 cursor-pointer">
                            <div class="row p-3">
                                <div class="d-flex align-items-start">
                                    <img src="https://dev-api.simplyvilla.id/storage/images/business/1/1/item/39/1647917471010718600.jpg" class="rounded-2 mr-2"
                                            style="height: 72px;">
                                    <div class="mx-3 d-flex flex-column">
                                        <h6 class="fw-bold">{{i.name}}</h6>
                                        <p>{{i.sku}}</p>
                                        <span>Rp. {{parseFloat(i.price)+parseFloat(i.profit) ?? 0 * i.qty}}</span>
                                        <input class="quantity mt-2" min="0" name="quantity" v-model="i.qty" type="number">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 d-flex justify-content-between fw-bold">
                        <div>Total</div>
                        <div>{{total}}</div>
                    </div>
                    <div class="col-12 d-flex justify-content-between mt-4">
                        <div class="w-100">
                            <button @click="print()" class="btn btn-primary btn-block w-100" type="button">Bayar dan Cetak Nota</button>
                        </div>
                    </div>
                </div>
                <div class="row p-2" v-else>
                    <p class="text-center fw-bold">No Item</p>
                </div>
            </div>
        </div>
        <ModalTambahBarang/>
    </div>
</template>

<script>
import ModalTambahBarang from '../../components/ModalTambahBarang.vue'
import axios from "axios"
 import { jsPDF } from "jspdf"
import html2PDF from 'jspdf-html2canvas'


export default {
    components: {
        ModalTambahBarang
    },
   data(){
       return {
           total: 0,
           bills: [],
           items: [],
           payload: {
               'keyword': null
           }
       }
   },
   watch: {
       bills: {
           handler(newValue, oldvalue){
               let tempTotal = 0
               newValue.forEach(element => {
                   tempTotal += (element.qty * parseFloat(element.price) + parseFloat(element.profit ?? 0))
               });

               this.total = tempTotal
           },
           deep: true
       }
   },
   methods:{
       fetchData(){
           if(this.payload.keyword != null){
               axios.get(`http://guarded-journey-48387.herokuapp.com/public/api/item?keyword=${this.payload.keyword}`, {
                    headers: {
                        Authorization: 'Bearer ' +localStorage.getItem('token')
                    }
                })
                .then((response) => {
                    this.items = response.data.data;
                })
                .catch((error) => {
                    console.log(error)
                })
           } else {
               axios.get(`http://guarded-journey-48387.herokuapp.com/public/api/item`, {
                    headers: {
                        Authorization: 'Bearer ' +localStorage.getItem('token')
                    }
                })
               .then((response) => {
                   this.items = response.data.data;
               })
               .catch((error) => {
                   console.log(error)
               })
           }

       },
       addBill(item){
           let index = this.bills.findIndex(bill => bill.id === item.id)

           if(index === -1){
               this.bills.push({...item, 'qty': 1, 'item_id': item.id})
           } else {
               this.bills[index].qty += 1
           }
       },
       async print(){
           await this.bills.map((e,index) => {
               this.bills[index].total = e.price * e.qty
           })

           axios.post(`http://guarded-journey-48387.herokuapp.com/public/api/bill`, {'bills':this.bills}, {
                    headers: {
                        Authorization: 'Bearer ' +localStorage.getItem('token')
                    }
                })
           .then((response) => {
               window.print()
               this.bills = []
           })
           .catch((err) => {
               console.log(err)
           })
           //this.$router.push({path: '/printbill'})
           /* setTimeout(function () {
                html2PDF(this.$refs.exportedBody, {
                    jsPDF: {format: 'a4'},
                    html2canvas: {
                        //allowTaint: true,
                    },
                    imageType: 'jpg',
                    output: 'form-registration-pdf.pdf'
                })
                this.$Progress.finish()
            }.bind(this), 1000) */
       }
   },
   async created(){
       this.fetchData()
   }
}
</script>