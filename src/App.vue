<template>
    <DefaultLayout />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import DefaultLayout from './layout/default.vue'
import { useMainStore } from './stores/mainStore'
const store = useMainStore()
//get current window width and the future changes and store it in the pinia store for global use
onMounted(() => {
  store.setScreenWidth(document.documentElement.clientWidth)
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', resize)

})
const resize = () => {
  store.setScreenWidth(document.documentElement.clientWidth)
}

</script>
<style>
  body {
    background-color : black;
  }
</style>



