<template>
    <div class="modal fade" id="modalTambahBarang" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Tambah Barang</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label for="name" class="col-form-label">Nama Barang</label>
                            <input type="text" class="form-control" v-model="payload.name" placeholder="Cth: Kecap sedap 100ml">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="col-form-label">Kategori Barang</label>
                            <input type="text" class="form-control" v-model="payload.category_id" placeholder="Cth: Kecap sedap 100ml">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="col-form-label">No. Barang</label>
                            <input type="text" class="form-control" v-model="payload.sku" placeholder="Nomor barang (kosongi jika tidak ada)">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="col-form-label">Harga</label>
                            <input type="text" class="form-control" v-model="payload.price" placeholder="Harga barang">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="col-form-label">Keuntungan</label>
                            <input type="text" class="form-control" v-model="payload.profit" placeholder="Untung per barang">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="col-form-label">Satuan</label>
                            <input type="text" class="form-control" v-model="payload.uom" placeholder="Harga barang">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Keluar</button>
                    <button @click="create()" type="button" class="btn btn-primary">Simpan</button>
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
            payload: {
                'name': null,
                'sku': null,
                'price': null,
                'uom': null,
                'category_id': 1,
                'profit': 0
            }
        }
    },
    methods:{
        async create(){
            await axios.post(`http://guarded-journey-48387.herokuapp.com/public/api/item`, this.payload)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>