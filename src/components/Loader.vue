<template>
<teleport to="#back">
    <div class="loader-container">
<div class="d-flex justify-content-center align-items-center h-100"
:style="{backgroundColor:background||''}"
>
        <div class="spinner-border text-primary" ></div>
            <span v-if="text" class="text-primary big">{{text||'loading'}}</span>

</div>
</div>
</teleport> 



</template>

<script lang="ts">
import { defineComponent, } from "vue";
import useDOMCreate from '../hooks/useDOMCreate'

export default defineComponent({
    name:'Loader',
    props:{
        text:String,
        background:{
            type:String
        }
    },
    setup()
    {
         useDOMCreate('back')
    }
 
})
</script>
<style>
.loader-container{
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .5);
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    text-align: center;
}
</style>