<template>
<div>
<nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
<router-link class="navbar-brand" :to="`/`">{{usert.nickName}}专栏</router-link>
<ul v-if="!usert.isLogin" class="list-inline mb-0">
<li class="list-inline-item"><router-link :to="`/login`" class="btn btn-outline-light">登陆</router-link></li>
<li class="list-inline-item"><router-link :to="`/register`" class="btn btn-outline-light">注册</router-link></li>
</ul>
<div v-else class="list-inline mb-0">
     <drop-down :title="`你好 ${usert.nickName}`">
     <drop-down-item><router-link :to="`/createpost/${usert.column}`" class="dropdown-item">新建文章</router-link></drop-down-item>
      <drop-down-item><router-link :to="`/column/${usert.column}`" class="dropdown-item">我的专栏</router-link></drop-down-item>
     <drop-down-item ><router-link :to="`/edit/${usert.column}`" class="dropdown-item">编辑资料</router-link></drop-down-item>
     <drop-down-item><a  @click.prevent="goout" class="dropdown-item">退出登录</a></drop-down-item>
    </drop-down>
</div>
</nav>
</div>
</template>

<script lang="ts">

import DropDown from './DropDown.vue'
import { defineComponent,computed } from "vue";
import DropDownItem from './DropDownItem.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import createMessage from './createMessage';

export default defineComponent({
    name:'GlobalHeader',
    components:{
        DropDown,
        DropDownItem
    },
    setup(){
        
        const router=useRouter()
        const store=useStore()
        const usert=computed(()=>store.state.user)
        const goout=()=>{
            store.commit('goout')
            createMessage('退出成功','success')
            router.push('/login')
        }
        return {
            goout,
            usert
        }
    }
})
</script>
