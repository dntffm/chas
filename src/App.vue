<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Body from './components/layouts/Body.vue'
import SideBar from './components/layouts/SideBar.vue'
</script>

<template>
  <div class="wrapper d-flex bg-light">
    <SideBar v-if="$route.name != 'login'"></SideBar>
    <Body> 
    </Body>
  </div>
</template>

<style>
  .btn-primary {
    background-color: #704232 !important;
    border-color: #704232 !important;
  }
</style>