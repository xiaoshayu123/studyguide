<template>
<div class="dropdown" ref="dropdownref">
<a href="#" class="btn btn-outline-light dropdown-toggle" @click.prevent="toggleopen">{{title}}</a>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" :style="{display:'block'}" v-if="isopen" >
  <slot></slot>
  </ul>
</div>
</template>

<script lang="ts">

import { defineComponent,onMounted,onUnmounted,ref,watch } from "vue";
import useclickoutside from '../hooks/useclickoutside'
export default defineComponent({
    name:'DropDown',
    props:{
        title:{
            type:String,
            required:true
        }
    },
      setup(props){
        let dropdownref=ref<null|HTMLElement>(null)
        let isopen=ref(false)
        let isclickoutside=useclickoutside(dropdownref)
        watch(isclickoutside,()=>{
            isopen.value=isclickoutside.value
        })
        const toggleopen=()=>{
            isopen.value=!isopen.value
        }

        return {
            toggleopen,
            isopen,
            dropdownref
        }
    }
})
</script>