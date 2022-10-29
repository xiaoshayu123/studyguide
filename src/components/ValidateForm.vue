<template>
<form action="" class="validate-form-container">
    <slot></slot>
    <div class="submit-area">
        <slot name="submit">
            <button type="submit" class="btn btn-primary" @click.prevent="submitForm" >提交</button>
        </slot>
    </div>
</form>
</template>

<script lang="ts">

import { defineComponent, onUnmounted } from "vue";
import mitt from 'mitt'
 type validateFunc=()=>boolean
 type clearFunc=()=>void
 type Events = {'input-created': validateFunc}
 type Events1={'clear-created':clearFunc}
export const emitter = mitt<Events>()
export const emitter1 = mitt<Events1>()
export default defineComponent({
    name:'ValidateForm',
    emits:['form-submit'],
    
    setup(props,context){
        let validatearr:validateFunc[]=[]
        let clearArr:clearFunc[]=[]
    const callback=(func:validateFunc)=>{
            validatearr.push(func)
        }
    const callback2=(func:clearFunc)=>{
            clearArr.push(func)
    }
        emitter.on('input-created',callback)
        emitter1.on('clear-created',callback2)
        onUnmounted(()=>{
            emitter.off('input-created',callback)
            emitter1.off('clear-created',callback2)
            validatearr=[]
        })
           const submitForm=()=>{
                const ans=validatearr.every(i=>i())
                context.emit('form-submit',ans)
                clearArr.forEach(item=>item())
        }
          return {
        submitForm,
        validatearr,
        clearArr
    }
    }
})
</script>