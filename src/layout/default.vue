<template>
    <div class=" p-4 px-5 lg:p-6 lg:px-32 md:p-6 md:px-32  bg-bg-color text-white">
        <Header class="sticky top-0 bg-inherit lg:bg-primary shadow-sm z-20"/>
        <RouterView/>
        <Footer/>
    </div>
</template>

<script setup>
import {RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'


</script>