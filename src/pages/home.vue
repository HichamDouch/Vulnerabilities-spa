<template>
   <div class="pt-6">
        <div class="flex flex-wrap items-center justify-between flex-col-reverse  md:flex-row">
            <label for="search" class="flex items-center bg-primary py-[.9rem] px-4 w-full rounded-sm lg:rounded-sm lg:w-[29rem]">
                <span class="opacity-80"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 14.775 14.775"><g id="Icon_feather-search" data-name="Icon feather-search" transform="translate(1 1)"><path id="Path_7" data-name="Path 7" d="M15.487,9.993A5.493,5.493,0,1,1,9.993,4.5,5.493,5.493,0,0,1,15.487,9.993Z" transform="translate(-4.5 -4.5)" fill="none" stroke="#aaa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path id="Path_8" data-name="Path 8" d="M27.962,27.962l-2.987-2.987" transform="translate(-15.602 -15.602)" fill="none" stroke="#aaa" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></g></svg></span>
                <input class="border-none bg-transparent outline-none px-2 text-[.8rem] text-white" v-model="searchValue" type="text" name="search" id="search" placeholder="Search...">
            </label>
            <router-link to="post/create" class="w-full md:w-fit"><button class="bg-primary-btn-color px-4 py-2 rounded-xs my-2 lg:rounded-sm text-lg lg:text-sm font-medium w-full md:w-fit hover:bg-violet-800 hover:transition-all delay-75 uppercase ">create new post</button></router-link> 
        </div>

        <div class="grid gap-4 grid-cols-1 py-4 align-center lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
            <div v-for="vulnerability in filteredList" :key="vulnerability.id" class="text-center text-white">
                <div class="flex items-center justify-center flex-col rounded-xs lg:rounded-sm  bg-primary p-4  relative">
                    <div class="flex items-center justify-between w-full relative">
                        <span class="hover:text-star-color cursor-pointer" :class="starred.includes(vulnerability.id) ? 'text-star-color' : 'text-zinc-500'" @click="addToStarred(vulnerability.id)"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 27.128 25.965"><path id="Icon_awesome-star" data-name="Icon awesome-star" d="M13.55.9,10.239,7.616,2.831,8.7a1.623,1.623,0,0,0-.9,2.769l5.36,5.223L6.025,24.065a1.622,1.622,0,0,0,2.353,1.709l6.627-3.484,6.627,3.484a1.623,1.623,0,0,0,2.353-1.709l-1.268-7.378,5.36-5.223a1.623,1.623,0,0,0-.9-2.769l-7.408-1.08L16.461.9A1.624,1.624,0,0,0,13.55.9Z" transform="translate(-1.441 0.001)" fill="currentColor"/></svg></span>
                        <span class="text-zinc-500 cursor-pointer transition delay-75 hover:text-zinc-200 relative z-40" :class="{'text-zinc-200':isActionListOpen && activeCardId == vulnerability.id}" @click="openActionList(vulnerability.id)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></span>
                        <ul v-if="isActionListOpen && activeCardId == vulnerability.id" class=" absolute right-0 top-8 bg-secondary rounded-xs lg:rounded-sm z-40">
                            <li class="text-sm p-2 px-7 rounded-xs lg:rounded-sm cursor-pointer transition delay-75 hover:bg-primary-text-color" @click="$router.push(`/post/update/${vulnerability.id}`)">Update</li>
                            <li class="text-sm p-2 px-7 rounded-xs lg:rounded-sm cursor-pointer transition delay-75 hover:bg-primary-text-color" @click="showAlert">Delete</li>
                        </ul>
                    </div>
                    <div class="w-24 h-24 m-4 lg:w-20 lg:h-20">
                        <!-- <img src="../assets/images/access_control.png" class="w-full h-full drop-shadow-lg" alt="" srcset=""> -->
                        <img v-if="vulnerability.image_name" :src="`images/${vulnerability.image_name}.png`" class="w-full h-full drop-shadow-lg" alt="" srcset="">
                        <img v-else src="vulnerability.image" class="w-full h-full drop-shadow-lg" alt="" srcset="">
                    </div>
                    <router-link :to="`posts/${vulnerability.id}`"><h2 class="text-xl md:text-xl lg:text-2xl font-bold h-20 mb-3 hover:text-active-bg-color cursor-pointer">{{vulnerability.title}}</h2></router-link>
                    <span class=" p-[.1rem] w-40 bg-white border-white opacity-20"></span>
                    <p class="py-4 font-light text-p-color lg:text-md opacity-60 lg:opacity-70 text-ellipsis overflow-hidden h-[14.8rem] md:h-[12rem]">{{vulnerability.truncat}}...</p>
                    <router-link :to="`posts/${vulnerability.id}`" class="w-full"> <button class="w-full bg-primary-btn-color py-2 my-3 rounded-xs lg:rounded-sm text-lg lg:text-md font-medium hover:bg-violet-800 hover:transition-all delay-75">READ MORE</button></router-link>
                </div>
            </div>
        </div>
   </div>

   <button v-if="isModelOpen" class="absolute top-0 bottom-0 right-0 left-0 z-30" :class="isAlertOpen ? 'bg-black opacity-30':'bg-transparent opacity-10 '" @click="disableModel"></button>
   <div v-if="isAlertOpen && activeCardId" class="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center z-40">
        <div class="bg-secondary lg:w-[25rem] lg:rounded-sm flex flex-col">
            <span class="bg-orange-400 p-2 lg:rounded-tl-sm lg:rounded-tr-sm text-lg font-medium uppercase flex items-center justify-between">Alert<svg xmlns="http://www.w3.org/2000/svg" class="cursor-pointer feather feather-x hover:text-red-600" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" @click="cancel"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>
            <p class="lg:text-base font-light p-2 py-8">Do you want to delete <span class="font-medium text-red-500">{{store.vulnerabilities.find(item => item.id == activeCardId ).title}}</span> ?</p>
            <div class="p-3 flex items-center justify-end">
                <button type="button" class="border border-primary-btn-color text-zinc-300 uppercase p-3 rounded-xs font-light text-lg lg:my-0 lg:text-xs lg:font-normal mx-4 lg:px-6 lg:py-2 hover:border-violet-800 hover:bg-violet-800 hover:transition-all delay-75" @click="cancel">cancel</button>
                <button class="bg-primary-btn-color text-white uppercase p-3 rounded-xs font-bold text-lg  lg:text-xs lg:font-medium lg:py-2 lg:px-6 hover:bg-violet-800 hover:transition-all delay-75" @click="deletePost" >Accept</button>
            </div>
        </div>
   </div>
</template>
<script setup>
import { useVulnerabilityStore } from '../stores/vulnerabilityStore'
import { ref, computed, onMounted } from 'vue'
const store = useVulnerabilityStore()
const searchValue = ref(null)
//store favorite posts
const starred = ref([2,5])
//actions list update & delete options
let isActionListOpen = ref(false)
//store id of selected card with open actions 
let activeCardId = ref(null)
//model that handle outside clicking while a popup is open
let isModelOpen = ref(false)
//store warning alert state
let isAlertOpen = ref(false)

onMounted(() => { window.scrollTo(0,0)})
//show actions list update & delete
const openActionList = (id) => {
    isActionListOpen.value = !isActionListOpen.value
    isModelOpen.value = !isModelOpen.value
    activeCardId.value = id
}
//hide the model clone that take the all screen when popup shows
const disableModel = () => {
    isActionListOpen.value = false
    isModelOpen.value = false
}
const deletePost = () => {
    console.log("val id", activeCardId.value);
    store.deletePost(activeCardId.value)
    document.documentElement.style.overflow = 'auto'
    isAlertOpen.value = false
    isModelOpen.value = false
  }
//cancel the post delete
const cancel = () => {
    isAlertOpen.value = false
    isModelOpen.value = false
    document.documentElement.style.overflow = 'auto'
}
//show warning before deleting
const showAlert = () => {
    isModelOpen.value = true
    isActionListOpen.value = false
    isAlertOpen.value = true
    document.documentElement.style.overflow = 'hidden'
}
//save favorite posts to my account for future use or read
const addToStarred = (id) => {
    if(starred.value.includes(id)) starred.value.splice(starred.value.indexOf(id),1)
    else starred.value.push(id)
}
//return filtred list list in case of search or filtring 
const filteredList = computed(() => {
    if(!searchValue.value) return store.getPosts
    else return store.getPosts.filter(item => item.title.includes(searchValue.value))
})

</script>
