<template>
    <div class="p-4 my-4 bg-primary lg-rounded-sm rounded-xs">
        <span class="capitalize text-xl font-medium">create new post</span>
        <form class="flex flex-col py-4" @submit.prevent="submit">
            <label for="title" class="flex flex-col" >
                <span class="capitalize font-normal text-lg py-3">title</span>
                <input type="text" name="title" id="title" placeholder="Title" v-model.trim="form['title']" class="p-3 bg-secondary rounded-xs outline-none">
            </label>
            <label for="description" class="my-4">
                <span class="capitalize font-normal text-lg">description</span>
                <textarea name="description" id="description" cols="30" rows="10" placeholder="Description" v-model="form['description']" class="w-full p-3 mt-3 bg-secondary outline-none rounded-xs"></textarea>
            </label>
            <div class="bg-secondary p-8 rounded-xs flex flex-col items-center justify-center cursor-pointer hover:opacity-80" @click="upload">
                <span class="font-medium text-base text-zinc-300 capitalize">click to Upload your image</span>
                <span class="font-light text-xs text-zinc-400 capitalize">file should be jpg,jpeg,png</span>
                <span v-if="form.image" class="text-green-500 text-xs pt-5">Uploaded Image :  {{imageFile.files[0].name}} ({{imageFile.files[0].size * 0.001}}Kb)</span>
            </div>
            <input type="file" name="image" id="image" hidden ref="imageFile" @change="uploadImage">
            <div class="py-3 flex flex-col align-center lg:flex-row-reverse lg:justify-between lg:py-8">
                <div class="flex flex-col align-center lg:flex-row-reverse">
                    <button type="submit" class="bg-primary-btn-color text-white uppercase p-3 rounded-xs font-bold text-lg lg:text-sm lg:font-medium lg:py-2 lg:px-6 hover:bg-violet-800 hover:transition-all delay-75">{{$route.name}}</button>
                    <router-link to="/" class="border border-primary-btn-color text-zinc-300 uppercase p-3 rounded-xs font-light text-lg my-4 text-center lg:my-0 lg:mx-3 lg:text-sm lg:font-normal lg:py-2 lg:px-6 hover:border-violet-800 hover:bg-violet-800 hover:transition-all delay-75">cancel</router-link>
                </div>
                <button type="button" class="border border-primary-btn-color text-zinc-300 uppercase p-3 rounded-xs font-light text-lg lg:my-0 lg:text-sm lg:font-normal lg:px-6 lg:py-2 hover:border-violet-800 hover:bg-violet-800 hover:transition-all delay-75">preview</button>
            </div>
        </form>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { useVulnerabilityStore } from '../stores/vulnerabilityStore'
    import { useRoute } from 'vue-router';

    const store = useVulnerabilityStore()
    const route = useRoute()
    
    const form = ref({})
    const imageFile = ref(null)
    onMounted(() => {
        //get the selected post for update
        if(route.params.method == 'update') form.value = store.getPost(route.params.id)
        //scroll to top by default
        window.scrollTo(0,0);
    })
    const submit = () => {
        if(form.value.title && form.value.description) {
            if(route.params.method == 'create') store.addPost(form.value)
            else store.updatePost(form.value)
        }
    }
    //redirect click to input file for image selecting
    const upload = () => { imageFile.value.click() }
    //get the selected image and create a link for it 
    const uploadImage = () => {
        form.value['image'] = URL.createObjectURL(imageFile.value.files[0])
        console.log("file", imageFile.value.files[0]);
    }
</script>