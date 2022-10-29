<template>
<div class="register mx-auto p-3 w-330">
  <h5 class="my-4 text-center">注册专栏账户</h5>
<validate-form @form-submit="onFormSubmit">
   <div class="mb-3">
     <label class="form-label">邮箱地址</label>
<validate-input 
placeholder="请输入正确的邮箱地址"
:rules="emailrules" 
v-model="emailRef" 
 type="text"></validate-input>
  </div>
  <div class="mb-3">
     <label class="form-label">用户名</label>
<validate-input 
placeholder="请输入用户名"
:rules="namerules" 
v-model="nameRef" 
 type="text"></validate-input>
  </div>
  <div class="mb-3">
     <label class="form-label">密码</label>
<validate-input :rules="passwordrules" 
placeholder="密码为6-16位,不可以包含空格"
v-model="passwordRef"  type="password"></validate-input>
  </div>
  <div class="mb-3">
     <label class="form-label" >请重新输入密码</label>
<validate-input 

placeholder="两次输入需保持一致"
:rules="RepasswordRules" 
v-model="repasswordRef" 
 type="password"></validate-input>
  </div>
</validate-form>
</div>
</template>

<script lang="ts">

import { defineComponent,ref,Ref } from "vue";
import ValidateInput,{RuleProp,} from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import GlobalHeader  from '../components/GlobalHeader.vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import createMessage from "../components/createMessage";

export default defineComponent({
    name:'Register',
    components:{
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup(){
      const router=useRouter()
      const store=useStore()
      let users=store.state.user
      let emailRef=ref('')
      let passwordRef=ref('')
      let repasswordRef=ref('')
      let nameRef=ref('')
let emailrules:RuleProp[]=[
  {type:'required',message:'邮箱不能为空'},
  {type:'email',message:'邮箱格式不对'}
]
let namerules:RuleProp[]=[
  {type:'required',message:'名字不能为空'}
]

let passwordrules:RuleProp[]=[
    {type:'required',message:'密码不能为空'},
     {type:'range',min:{message:'你的密码至少包括六位，不能含有空格',length:6},max:{message:'你的密码最多包括十六位，不能含有空格',length:16}}
]
let RepasswordRules:RuleProp[]=[
    {type:'required',message:'密码不能为空'},
     {type:'repassword',validator:()=>{
         return repasswordRef.value===passwordRef.value
     },message:'两次密码输入不一致'}
]
      let refs:Ref<string>[]=[]
      refs.push(emailRef)
      refs.push(passwordRef)
      refs.push(repasswordRef)
      refs.push(nameRef)
      const onFormSubmit=(result:boolean)=>{
        if(result){
          const payload={
            email:emailRef.value,
            nickName:nameRef.value,
            password:passwordRef.value
          }
          store.dispatch('register',payload).then(res=>{
            console.log(res);
            const column=res.data.data.column
            refs.forEach(item=>{
            item.value=''
        })
        const pald={
          title:nameRef.value+'的专栏',
          description:nameRef.value+'的专栏十分有趣',
          avatar:'',
          id:column
        }
        // store.dispatch('patchCurrentColumn',pald).then(res=>{
        //   console.log(res);
        //   createMessage('注册成功，两秒后跳转到登陆界面','success')
        //   setTimeout(() => {
        //        router.push('/login')
        //   }, 2000);
         
        // })
          createMessage('注册成功，两秒后跳转到登陆界面','success')
          setTimeout(() => {
               router.push('/login')
          }, 2000);
          })
            // router.push({name:'column',params:{id:1}})
        }
      }
    return {
      users,
      emailrules,
      emailRef,
      passwordrules,
      passwordRef,
      onFormSubmit,
      RepasswordRules,
      repasswordRef,
      namerules,
      nameRef
    }
  }
})
</script>
<style>
.register{
  max-width: 330px;
}

</style>