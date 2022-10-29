<template>
<div class="column-detail-page w-75 mx-auto">
        <div class="column-info row mb-4 border-bottom pb-4 align-items-center">
           <div class="col-3">
      <img v-if="columnt.avatar" :src="columnt.avatar" class="rounded-circle border w-100" alt="...">
  </div>
  <div class="col-9 text-center">
    <h4 >{{columnt.title}}</h4>
    <p class="text-muted">{{columnt.description}}</p>
  </div>
  </div>
  <post-list :list="lists"></post-list>
  <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25  d-block"
@click="loadMordPage"
v-if="isLastPage"
>
    加载更多
</button>
</div>

</template>

<script lang="ts">
import { defineComponent,computed, onMounted,ref, watch } from "vue";
import { useRoute } from "vue-router";
import PostList from '../components/PostList.vue'
import { useStore } from "vuex";
import {GlobalProps} from '../Store'
import useLoadMore from "../hooks/useLoadMore";
export default defineComponent({
    name:'ColumnDetail',
    components:{
      PostList,
    },
    setup()
    {
        const router=useRoute();
        const store=useStore<GlobalProps>();
        //为了让computed响应对应的变化，添加相应式对象
        const currentId=ref(router.params.id);
        watch(()=>router.params,(params)=>{
          const jumpId=params&&params.id
          const column=store.state.user.column
          if(jumpId&&column&&(jumpId===column)){
             // 重新发送请求，在 store 中有对应的缓存设置
            store.dispatch('fetchCurrentColumn', jumpId)
            store.dispatch('fetchPosts', {cid:jumpId})
        // 重新赋值，这样 computed 会变化
          currentId.value = params.id
          }
        })

          store.dispatch('fetchCurrentColumn',currentId.value);
          store.dispatch('fetchPosts',{cid:currentId.value});
        // onMounted(()=>{
        //   console.log(1);
        //   store.dispatch('fetchCurrentColumn',currentId.value);
        //   store.dispatch('fetchPosts',{cid:currentId.value})
        // })
        const columnt=computed(()=>store.getters.getColumnByid(currentId.value))
        const lists=computed(()=>store.getters.getPostsById(currentId.value))
        const total=computed(()=>store.state.Posts.total) 
        const {loadMordPage,isLastPage}=useLoadMore('fetchPosts',total,{pageSize:5,currentPage:2},currentId.value as string)
        return {
            lists,
            columnt,
            loadMordPage,
            isLastPage
        }
    }
})
</script>