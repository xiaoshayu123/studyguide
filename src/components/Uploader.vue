<template>
<div>
    <div   @click.prevent="triggerUpload" v-bind="$attrs">
    <slot v-if="fileStatus==='loading'" name="loading">
      <button class="btn btn-primart">正在上传</button></slot>
    <slot v-else-if="fileStatus==='success'" name="uploaded" :uploadedData="uploadedData">
      <button class="btn btn-primary">上传成功</button></slot>

        <slot v-else name="default">
            <button class="btn btn-primary">点击上传</button>
        </slot>
    
    </div>
    <input type="file"
    class="d-none"
    ref="fileInputRef"
    @change="handleFileChange"
    >
</div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent,ref ,PropType, watch} from "vue";
import { useRoute } from "vue-router";

export type UoloadStatus='ready'|'loading'|'success'|'error'
export type checkFunction=(file:File)=>boolean
export default defineComponent({
    name:'Uploader',
    props:{
        action:{
            type:String,
            required:true
        },
        beforeUpload:{
            type:Function as PropType<checkFunction>,
        },
        editUp:{
            type:String
        }
    },
    inheritAttrs:false,
    emits:['file-uploaded'],
    setup(props,context)
    {
        const fileInputRef=ref<null|HTMLInputElement>(null)
        const route=useRoute()
           const fileStatus=ref<UoloadStatus>(props.editUp?'success':'ready')
        const uploadedData=ref(props.editUp?props.editUp:'')
        watch(()=>props.editUp,(newValue)=>{
           if(newValue){
               uploadedData.value=newValue
              fileStatus.value='success'
           }
        })
        const triggerUpload=()=>{
            if(fileInputRef.value)
            {
                fileInputRef.value.click()
            }
        }
     
        
        const handleFileChange=(e:Event)=>{
            const currentTarget=e.target as HTMLInputElement
            if( currentTarget.files){
                   const files=Array.from(currentTarget.files)
                if(props.beforeUpload){
                        const result=props.beforeUpload(files[0])
                        if(!result){
                            return 
                        }
                }
                fileStatus.value='loading'
                const formData=new FormData()
                formData.append('file',files[0])
                axios.post(props.action,formData,{
                    headers:{
                        'Content-Type':'multipart/form-data'
                    }
                }).then(res=>{
                    console.log(res.data.data.url);
                    uploadedData.value=res.data.data.url
                    fileStatus.value='success'
                    context.emit('file-uploaded',res.data.data)
                }).catch(err=>{
                    fileStatus.value='error'
                }).finally(()=>{
                   if(fileInputRef.value){
                       fileInputRef.value.value=''
                   }
                })
            }
        }

        return{
            triggerUpload,
            fileInputRef,
            fileStatus,
            handleFileChange,
            uploadedData
        }
    }
 
})
</script>