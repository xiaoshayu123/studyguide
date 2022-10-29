<template>
<div>
    <h3>{{isEditMode?'修改文章':'新建文章'}}</h3>
    <uploader :action="`/upload/img`"
    :before-upload="uploadCheck"
    :edit-up="editUp"
    @file-uploaded="handleFileUpdated"
    class="uploader-container d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
    <h2>点击上传头图</h2>
    <template #loading> 
<div class="spinner-border text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<h2>正在上传</h2>
    </template>
    <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData">
    </template>
    </uploader>
    <validate-form @form-submit="addNewPost">
        <div class="mb-3">
     <label class="form-label">文章标题</label>
<validate-input 
:rules="requirerules" 
v-model="titleVal"
 placeholder="请输入文章标题" 
 type="text"></validate-input>
  </div>
     <div class="mb-3">
     <label class="form-label">文章详情</label>
    <editor ref="editorRef"
    @blur="checkEditor"
    v-model="contentVal"
    :options="options"
    :class="{'is-invalid':!editorStatus.isValid}"
    ></editor>
      <span class="invalid-feedback" v-if="!editorStatus.isValid">{{editorStatus.message}}</span>
  </div>
    <template #submit>
        <!-- <a href="#" class="btn btn-primary btn-large">发表文章</a> -->
    </template>
    </validate-form>
</div>
</template>

<script lang="ts">
import {  defineComponent,onMounted,ref,reactive } from "vue";
import ValidateForm from "./ValidateForm.vue";
import ValidateInput from "./ValidateInput.vue";
import { RuleProp } from "./ValidateInput.vue";
import {useStore} from 'vuex';
import {useRoute,useRouter} from 'vue-router'
import Uploader from "./Uploader.vue";
import beforeUploadeCheck from '../helper'
import createMessage from "./createMessage";
import { GlobalProps } from "../Store";
import EasyMDE,{Options} from 'easymde'
import Editor from "./Editor.vue";
interface EditorInstance{
    clear:()=>void;
    getMedInstance:()=>EasyMDE|null
}
let requirerules:RuleProp[]=[
  {type:'required',message:'内容不能为空'},
]
export default defineComponent({
    name:'CreatePost',
    components:{
    ValidateForm,
    ValidateInput,
    Uploader,
    Editor
},
    inheritAttrs:false,
    setup(){
    const titleVal = ref('')
    const contentVal = ref('')
    const store=useStore<GlobalProps>()
    const route=useRoute()
    const router=useRouter()
    const editUp=ref()
    const columnid=+route.params.id
    const isEditMode=!!route.query.id
    const editorStatus=reactive({
        isValid:true,
        message:''
    })
    const editorRef=ref<EditorInstance|null>(null)
    const options:Options={
        spellChecker:false
    }
    let imageid=''
    const uploadCheck=(file:File)=>{
        const result=beforeUploadeCheck(file,{
            format:['image/jpg','image/png','image/jpeg',],
            size:5
        })
        if(!result.passed){
                if(result.error==='format'){
                    createMessage('图片只能是jpg，jpeg，png格式','error')
                }
                else if(result.error==='size'){
                    createMessage('图片不能超过5Mb','error')
                }
        }
        return result.passed
    }
    const checkEditor=()=>{
        if(contentVal.value.trim()===''){
            editorStatus.isValid=false
            editorStatus.message='文章详情不能为空'
        }
        else
        {
             editorStatus.isValid=true
            editorStatus.message=''
        }
    }
    const handleFileUpdated=(rawdata:any)=>{
            if(rawdata.url){
                imageid=rawdata.url
            }
    }
    const addNewPost=(result:boolean)=>{
        checkEditor()
        const {column,_id}=store.state.user
        if(result&&editorStatus.isValid){
            const newPost={
        title:titleVal.value,
        content:contentVal.value,
        column,
        author:_id,
       image:imageid
    }
        const actionsName=isEditMode?'updatePost':'addPost'
        console.log(newPost);
        const data=isEditMode?{
            id:String(route.query.id),
                title:titleVal.value,
                content:contentVal.value,
                image:imageid
        }:newPost
            store.dispatch(actionsName,data).then((res)=>{
                    if(isEditMode){
                         createMessage('修改成功，两秒后跳转到专栏','success')
                    }
                    else
                    {
                          createMessage('发表成功，两秒后跳转到专栏','success')
                  
                    }
                    setTimeout(() => {
                            router.push({name:'column',params:{id:column}})
                    }, 2000);
           
            })
        }
    }
        onMounted(()=>{
            if(isEditMode)
            {
                store.dispatch('fetchCurrentPost',route.query.id).then(res=>{
                    if(res.data.image.url){
                        editUp.value=res.data.image.url
                    }
                    titleVal.value=res.data.title
                    if(res.data.content)contentVal.value=res.data.content
                })
            }
        })
    return {
        titleVal,
        contentVal,
        requirerules,
        store,
        columnid,
        addNewPost,
        uploadCheck,
        handleFileUpdated,
        editUp,
        isEditMode,
       editorRef,
        options,
        checkEditor,
        editorStatus
    }

    }
 
})
</script>
<style>
.uploader-container{
    height: 200px;
    cursor: pointer;
}
.uploader-container img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

</style>