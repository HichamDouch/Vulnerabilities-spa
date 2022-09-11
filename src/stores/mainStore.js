import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
    state : () => {
        return {
            screenWidth : 0
        }
    },
    actions : {
        setScreenWidth(width){this.screenWidth = width }
    },
    getters: {
        getScreenWidth(store){ return this.screenWidth }
    }

})