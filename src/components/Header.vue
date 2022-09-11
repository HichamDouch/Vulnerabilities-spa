<template>
    <div v-if="store.getScreenWidth <= 600" class="text-white flex items-center justify-between py-2 ">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 35 19"><g id="Group_70" data-name="Group 70" transform="translate(-34.5 -25.5)"><line id="Line_8" data-name="Line 8" x2="32" transform="translate(36 27)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="3"/><path id="Path_33" data-name="Path 33" d="M0,0H20" transform="translate(36 35)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="3"/><path id="Path_34" data-name="Path 34" d="M0,0H14" transform="translate(36 43)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="3"/> </g> </svg> </span>
        <div class="w-14 h-14  border-2 border-active-bg-color rounded-full bg-indigo-200">
            <img src="/images/ITEM_PREVIEW1.jpeg" class="w-full h-full object-cover rounded-full" alt="" srcset=""/>
        </div>
    </div>
    <div v-else class="bg-primary w-full p-3 rounded-sm flex items-center justify-between shadow-md">
        <div></div>
        <div class="flex items-center cursor-pointer">
            <div class="w-10 h-10 border-2 border-active-bg-color rounded-full bg-indigo-200">
                <img src="/images/ITEM_PREVIEW1.jpeg" class="w-full h-full object-cover rounded-full" alt="" srcset=""/>
            </div>
            <div class="flex items-start flex-col px-2">
                <span class="font-medium text-xs capitalize">hicham douch</span>
                <span class="text-xs font-light text-gray-200 opacity-60">@hichamD</span>
            </div>
        </div>
    </div>

</template>
<script setup>
import { useMainStore } from '../stores/mainStore'
const store = useMainStore()
</script>