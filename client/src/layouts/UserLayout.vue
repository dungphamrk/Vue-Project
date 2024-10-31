<template>
  <div>
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script setup>
import Header from '@/components/user/Header.vue';
import Footer from '@/components/user/Footer.vue';
import "@/styles/home.css";

</script>

<style>

</style>