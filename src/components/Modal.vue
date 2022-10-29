<template>
<teleport to="#modal">
<div class="modal d-block" v-if="visible" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{title}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click.prevent="onClick"></button>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click.prevent="onClick">取消</button>
        <button type="button" class="btn btn-primary" @click.prevent="onFirm">确定</button>
      </div>
    </div>
  </div>
</div>
</teleport>
</template>
<script lang="ts">
import { defineComponent,PropType } from "vue";
import useDomCreate from '../hooks/useDomCreate'

export default defineComponent({
    name:'Modal',
    props:{
        title:String,
        visible:{
            type:Boolean,
            default:false
        }
    },
    emits:['model-click-close','model-click-confirm'],
 setup(props,context){
     useDomCreate('modal')
     const onClick=(e:MouseEvent)=>{
         context.emit('model-click-close')
     }
     const onFirm=(e:MouseEvent)=>{
         context.emit('model-click-confirm')
     }
     return {
         onClick,
         onFirm
     }
 }
})
</script>