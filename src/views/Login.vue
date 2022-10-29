<template>
<!-- <column-list :list="Columns"></column-list>  -->
<div class="login mx-auto p-3 w-330">
  <h5 class="my-4 text-center">登录专栏</h5>
<validate-form @form-submit="onFormSubmit">
   <div class="mb-3">
     <label class="form-label">邮箱地址</label>
<validate-input 
:rules="emailrules" 
v-model="emailRef"
 placeholder="请输入邮箱地址" 
 type="text"></validate-input>
  </div>
  <div class="mb-3">
     <label class="form-label">密码</label>
<validate-input :rules="passwordrules" v-model="passwordRef"  type="password"
placeholder="请输入密码"
></validate-input>
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
let emailrules:RuleProp[]=[
  {type:'required',message:'邮箱不能为空'},
  {type:'email',message:'邮箱格式不对'}
]

let passwordrules:RuleProp[]=[
    {type:'required',message:'密码不能为空'},
     {type:'range',min:{message:'你的密码至少包括六位，不能含有空格',length:6},max:{message:'你的密码最多包括十位，不能含有空格',length:10}}
]
export default defineComponent({
    name:'Login',
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
      let refs:Ref<string>[]=[]
      refs.push(emailRef)
      refs.push(passwordRef)
      const onFormSubmit=(result:boolean)=>{
        if(result){
          const payload={
            email:emailRef.value,
            password:passwordRef.value
          }
          store.dispatch('loginAndFetch',payload).then(res=>{
            refs.forEach(item=>{
            item.value=''
        })
          createMessage('登录成功,2秒后跳转到首页','success')
          setTimeout(() => {
               router.push('/')
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
      onFormSubmit
    }
  }
})
</script>
<style>
.login{
  max-width: 330px;
}
</style>