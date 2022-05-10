<template>
    <div class="row">
        <div class="col-3 m-auto">
            <form class="d-flex flex-column">
                <h1 class="mb-3">Welcome</h1>
                <div class="alert alert-warning alert-dismissible fade show" role="alert" v-if="message != null">
                    {{message}}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <!-- Email input -->
                <div class="form-outline mb-4">
                    <input type="email" id="form2Example1" class="form-control" v-model="email"/>
                    <label class="form-label" for="form2Example1">Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                    <input type="password" id="form2Example2" class="form-control" v-model="password"/>
                    <label class="form-label" for="form2Example2">Password</label>
                </div>

                <!-- Submit button -->
                <button @click="login()" type="button" class="btn btn-primary btn-block mb-4">
                    <div class="spinner-grow" role="status" v-if="isLoading">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-if="!isLoading">
                        Sign in
                    </div>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return { 
            datas: [],
            email: null,
            password: null,
            isLoading: false,
            message: null,
        }
    },
    methods:{
        login(){
            this.isLoading = true
            axios.post('http://guarded-journey-48387.herokuapp.com/public/api/login', {email: this.email, password: this.password})
            .then((response) => {
                console.log(response.data.token)
                localStorage.setItem('token', response.data.token)
                this.$router.push('/')
                this.isLoading = false
            })
            .catch((error) => {
                this.message = error.response.data.message
                this.isLoading = false
            })
        }
    }
}
</script>