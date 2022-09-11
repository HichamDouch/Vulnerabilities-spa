<template>
    <router-link to="/" class="text-active-bg-color text-base font-normal flex items-center py-3 lg:pt-8"><svg xmlns="http://www.w3.org/2000/svg"  class="mr-1" width="9.772" height="9.772" viewBox="0 0 9.772 9.772"><path id="Icon_material-arrow_back" data-name="Icon material-arrow_back" d="M15.772,10.275H8.339l3.414-3.414L10.886,6,6,10.886l4.886,4.886.861-.861L8.339,11.5h7.433Z" transform="translate(-6 -6)" fill="#8e77d5"/></svg>Back</router-link>
    <h2 class="text-4xl font-bold text-center py-10 z-10 relative w-[21rem] lg:text-start lg:w-[58rem]">{{post && post.title ? post.title : ''}}</h2>
    <div class="lg:p-16 ">
        <div class="flex items-center cursor-pointer relative">
            <div class="w-12 h-12 rounded-full bg-indigo-200 border-[.2rem] border-[#F348AA]">
                <img src="/images/ITEM_PREVIEW1.jpeg" class="w-full h-full object-cover rounded-full " alt="" srcset=""/>
            </div>
            <div class="flex items-start flex-col px-2">
                <span class="font-medium text-sm text-[#F348AA] capitalize">hicham douch</span>
                <span class="text-[.6rem] font-light text-gray-200 opacity-60">September 06 2022</span>
            </div>
            <div v-if="post" class="absolute w-44 right-0 bottom-0 z-0 lg:bottom-16 lg:w-48">
                <img v-if="post.image_name" :src="`/images/${post.image_name}.png`" class="w-full h-full" alt="" srcset="">
                <img v-else :src="post.image" class="w-full h-full" alt="" srcset="">
            </div>
        </div>
        <div v-if="post && post.description" class="relative h-fit overflow-hidden">
            <p v-html="post.description" class="py-10 leading-8 text-lg relative z-10"></p>
            <div class="absolute w-44 top-96 left-0 z-0  opacity-60">
                <img v-if="post.image_name" :src="`/images/${post.image_name}.png`" class="w-full h-full" alt="" srcset="">
                <img v-else :src="post.image" class="w-full h-full" alt="" srcset="">
            </div>
            <div class="absolute w-44 top-[120rem] right-0 z-0 opacity-60  lg:top-[100rem]" :class="mainStore.getScreenWidth <= 600 ? 'right-0' : 'left-0'">
                <img v-if="post.image_name" :src="`/images/${post.image_name}.png`" class="w-full h-full" alt="" srcset="">
                <img v-else :src="post.image" class="w-full h-full" alt="" srcset="">
            </div>
            <div class="absolute w-44 bottom-[120rem] z-0  opacity-60 lg:bottom-[80rem] "  :class="mainStore.getScreenWidth <= 600 ? 'left-0' : 'right-0'">
                <img v-if="post.image_name" :src="`/images/${post.image_name}.png`" class="w-full h-full" alt="" srcset="">
                <img v-else :src="post.image" class="w-full h-full" alt="" srcset="">
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useVulnerabilityStore } from '../stores/vulnerabilityStore'
import { useMainStore } from '../stores/mainStore'

const mainStore = useMainStore()
const store = useVulnerabilityStore()
const route = useRoute()
const post = ref(null)

onMounted(() => {
    //get the selected post to preview
    post.value = store.getPost(route.params.id)
    window.scrollTo(0,0);
})
</script>