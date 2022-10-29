<template>
  <div class="post-detail-page">
     <modal :visible="isShow" title="删除文章"
    @model-click-close="clickNo"
    @model-click-confirm="clickYes">
    <h4>确定要删除这篇文章吗</h4>
    </modal>
    <article class="w-75 mx-auto mb-5 pb-3" v-if="currentPost">
      <img :src="currentPost.image" alt="currentPost.title" class="rounded-lg img-fluid my-4" v-if="currentPost.image">
      <h2 class="mb-4">{{currentPost.title}}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile :user="currentPost.author" v-if="currentPost.author"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{currentPost.createdAt||`2022:4:24`}}</span>
      </div>
      <div v-html="handler">
      </div>
      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link
        :to="{name:'createpost',query:{
          id:currentPost._id
        }}"
          type="button"
          class="btn btn-success"
        >
          编辑
        </router-link>
        <button type="button" class="btn btn-danger" @click.prevent="deletePost" >删除</button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed,onMounted,ref } from "vue";
import {useRoute, useRouter}from 'vue-router';
import { useStore } from 'vuex';
import {marked} from 'marked'
import { GlobalProps } from "../Store";
import UserProfile from '../components/UserProfile.vue'
import createMessage from "../components/createMessage";
import Modal from "../components/Modal.vue";
export default defineComponent({
    name:'PostDetail',
    components:{
    UserProfile,
    Modal
},
    setup(){
        const route=useRoute()
        const store=useStore<GlobalProps>()
        const router=useRouter()
        const isShow=ref(false)
        const user=computed(()=>store.state.user)
          const postid=route.params.id
    onMounted(()=>{
            store.dispatch('fetchCurrentPost',postid)
    })
        const currentPost=computed(()=>store.getters.getPostById(postid))
        const handler=computed(()=>{
            if(currentPost.value&&currentPost.value.content){
                return currentPost.value.isHTML? currentPost.value.content:marked.parse(currentPost.value.content)
            }
        })
        const showEditArea=computed(()=>{
             if(currentPost.value&&currentPost.value.author)
             {
                return  user.value._id===currentPost.value.author._id
             }
        }),
        deletePost=()=>{
            isShow.value=true
        }
        const clickNo=()=>{
          isShow.value=false
        }
        const clickYes=()=>{
          isShow.value=false
          store.dispatch('deletePost',postid).then(res=>{
                createMessage('删除成功，两秒后跳转到专栏页面','success')
                setTimeout(() => {
                  router.push({name:'column',params:{id:res.data.column}})
                }, 2000);
                
                
            })
        }
        
    return {
        currentPost,
        handler,
        user,
        showEditArea,
        deletePost,
        isShow,
        clickNo,
        clickYes
    }

    }
    
 
})

</script>