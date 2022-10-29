<template>
<teleport to="#message">
<div class="alert  fixed-top  w-25 mx-auto d-flex justify-content-between mt-2"
:class="classObject"
v-if="isvisible"
>
  <span class="large">{{message}}</span>
  <button type="button" class="btn-close" data-bs-dismiss="alert" @click.prevent="hide" aria-label="Close"></button>
</div>
</teleport>

</template>

<script lang="ts">
import { defineComponent,PropType,ref ,h} from "vue";
export type MessageType='success'|'error'|'defalut'
export default defineComponent({

    name:'Message',
    props:{
        message:String,
        type:{
            type:String as PropType<MessageType>,
            default:'default'
        }
    },
    setup(props,context){
        const isvisible=ref(true);
        const classObject={
            'alert-success':props.type==='success',
            'alert-danger':props.type==='error',
            'alert-primary':props.type==='defalut'
        }
        const hide=()=>{
            isvisible.value=false
        }
        return{
            isvisible,
            classObject,
            hide
        }
    }
 
})
</script>