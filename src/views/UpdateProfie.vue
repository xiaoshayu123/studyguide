<template>
<div class="w-690">
    <ul class="nav nav-tabs my-4">
        <li class="nav-item"  @click="clicktrue">
            <a href="#"   :class="{active:checkto}" class="nav-link">更新个人资料</a>
        </li>
        <li    @click="clickfalse">
            <a href="#" :class="{active:!checkto}" class="nav-link">更新专栏信息</a>
        </li>
    </ul>
    <h4 v-if="checkto">编辑个人资料</h4>
    <h4 v-else>编辑专栏信息</h4>
  <uploader :action="`/upload/img`"
  @file-uploaded="handleFileUpdated"
    class="uploader-container d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
    <img :src="imgdata" v-if="checkto">
    <img  v-else :src="imgdata2" alt="">
    <template #loading> 
<div class="spinner-border text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<h2>正在上传</h2>
    </template>
    <template #uploaded="dataProps">
        <img  :src="dataProps.uploadedData">
    </template>
    </uploader>
    <validate-form v-if="checkto" @form-submit="updateUser">
   <div class="mb-3">
<validate-input 
:rules="passwordrules" v-model="nameRef"
 type="text"></validate-input>
  </div>
  <div class="mb-3">
<validate-input :rules="passwordrules" v-model="descriptionRef" tag="textarea"
></validate-input>
  </div>
    </validate-form>
 <validate-form v-else @form-submit="updateColumn">
   <div class="mb-3">
<validate-input 
:rules="passwordrules" v-model="columnNameRef"
 type="text"></validate-input>
  </div>
  <div class="mb-3">
<validate-input :rules="passwordrules" v-model="columnDesRef" tag="textarea"
></validate-input>
  </div>
    </validate-form>
</div>
</template>

<script lang="ts">
import { defineComponent,computed, onMounted,ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore} from "vuex";
import createMessage from "../components/createMessage";
import Uploader from "../components/Uploader.vue";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput,{RuleProp} from "../components/ValidateInput.vue";


export default defineComponent({
    name: "UpdateProfile",
    components: { Uploader ,
    ValidateForm,
    ValidateInput
    },
    setup()
    {
        let passwordrules:RuleProp[]=[
    {type:'required',message:'内容不能为空'},
]
        const checkto=ref(true)
        const store=useStore()
        const route=useRoute()
        const column=computed(()=>store.getters.getColumnByid(route.params.id))
        
        let columnNameRef=ref('')
        let columnDesRef=ref('')
        onMounted(()=>{
               store.dispatch('fetchCurrentColumn',route.params.id).then(res=>{
                columnNameRef.value=res.title
                columnDesRef.value=res.description
            })
        })
      
        let user=computed(()=>store.state.user)
        let columnId=route.params.id
        let nameRef=ref(user.value.nickName)
        let descriptionRef=ref(user.value.description)
        const router=useRouter()
        let imgdata= computed(()=>user.value.avatar?user.value.avatar:new URL('../assets/pkq.jpg',import.meta.url).href) 
        let imgdata2=computed(()=> column.value&&column.value.avatar?column.value.avatar:new URL('../assets/pkq.jpg',import.meta.url).href)
        let imageid=''
        function clicktrue()
        {
            checkto.value=true
        }
        function clickfalse()
        {
            checkto.value=false
        }
        const handleFileUpdated=(rawdata:any)=>{
            if(rawdata.url)
            {
                
                imageid=rawdata.url
            }
        }
        const updateUser=(result:boolean)=>{
                if(result)
                {
                    const nickName=nameRef.value
                    const description=descriptionRef.value
                    const avatar=imageid!==''?imageid:user.value.avatar
                    const payLoad={
                        ...user.value,
                        nickName,
                        description,
                        avatar  
                    }
                    store.dispatch('patchCurrentUser',payLoad).then(res=>{
                        createMessage('修改成功，2秒后跳回到首页','success')
                        setTimeout(()=>{
                            router.push({name:'home'})
                        },2000)
                    })
                    
                }
        }
        const updateColumn=(result:boolean)=>{
            if(result)
            {
                const title=columnNameRef.value
                const description=columnDesRef.value
                console.log(imageid);
                console.log(column.value);
                const avatar=imageid!==''?imageid:column.value.avatar
                const payload={
                    title,
                    description,
                    avatar,
                    _id:columnId

                }
                console.log(payload);
                store.dispatch('patchCurrentColumn',payload).then(res=>{
                     createMessage('修改成功，2秒后跳回到首页','success')
                        setTimeout(()=>{
                            router.push({name:'home'})
                        },2000)
                })
            }
        }
        return {
            descriptionRef,
            nameRef,
            imgdata,
            checkto,
            clicktrue,
            clickfalse,
            columnNameRef,
            columnDesRef,
            imgdata2,
            updateUser,
            handleFileUpdated,
            updateColumn,
            passwordrules
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
.w-690{
    width: 690px;
    margin: 0 auto;
}

</style>