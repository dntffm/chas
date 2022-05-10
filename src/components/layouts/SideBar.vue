<template>
    <div class="d-flex flex-column flex-shrink-0 bg-body" style="width: 7.5rem;min-height: 100vh">
        <a href="/" class="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip"
            data-bs-placement="right" data-bs-original-title="Icon-only">
            <img src="/logo.svg" alt="">
            <span class="visually-hidden">Icon-only</span>
        </a>
        <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
            <li class="nav-item">
                <router-link to="/" class="text-secondary nav-link py-3 d-flex flex-column">
                    <i class="fa fa-home fa-lg"></i>
                    <span class="fw-bold"><small>Dashboard</small></span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="/shop" class="text-secondary nav-link py-3 d-flex flex-column">
                    <i class="fa fa-store fa-lg"></i>
                    <span class="fw-bold"><small>Toko</small></span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="transactions" class="text-secondary nav-link py-3 d-flex flex-column">
                    <i class="fas fa-history fa-lg"></i>
                    <span class="fw-bold"><small>Riwayat</small></span>
                </router-link>
            </li>
            <li class="nav-item">
                <router-link to="wallet" class="text-secondary nav-link py-3 d-flex flex-column">
                    <i class="fas fa-wallet fa-lg"></i>
                    <span class="fw-bold"><small>Dompet</small></span>
                </router-link>
            </li>
        </ul>
        <div class="border-top">
            <button @click="logout()"
                class="btn d-flex flex-column p-3 text-decoration-none">
                <i class="fas fa-sign-out"></i>
                <span>Log Out</span>
            </button>
        </div>
    </div>
</template>

<style>
    .nav-item:hover {
        background-color: #704232;
        border-radius: 10px;
    }

    .nav-item:hover .nav-link{
        color: #ffffff !important;
    }
</style>

<script>
import axios from "axios"

export default {
    methods:{
        logout(){
            axios.post('http://guarded-journey-48387.herokuapp.com/public/api/logout',{}, {
                headers: {
                    Authorization: 'Bearer ' +localStorage.getItem('token')
                }
            })
            .then((response) => {
                localStorage.removeItem('token');
                this.$router.push('/login')
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>