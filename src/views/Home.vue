<template>
<div class="homepage">

    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <img src="../assets/callout.svg" class="w-50" alt="">
                <h2 class="font-weight-light">随心写作，自由表达</h2>
                <p>
                    <router-link :to="`/createpost/${users.column}`" class="btn btn-primary my-2">开始写文章</router-link>
                </p>
            </div>
        </div>
    </section>
    <h4 class="font-weight-bold text-center">发现精彩</h4>
</div>
<column-list :list="Columns"></column-list>
<button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 d-block"
@click="loadMordPage"
v-if="isLastPage"
>
    加载更多
</button>
</template>

<script lang="ts">

import { defineComponent, onMounted,computed } from "vue";
import GlobalHeader from "../components/GlobalHeader.vue";
import ColumnList from '../components/ColumnList.vue'
import {useStore} from "vuex";
import { GlobalProps } from "../Store";
import Loader from "../components/Loader.vue";
import Uploader from "../components/Uploader.vue";
import createMessage from "../components/createMessage";
import useLoadMore from "../hooks/useLoadMore";
export default defineComponent({
    name:'Home',
    components:{
    GlobalHeader,
    ColumnList,
    Loader,
    Uploader
},
    setup(){
      const store=useStore<GlobalProps>()
      const users=computed(()=>store.state.user)
      onMounted(()=>{
        store.dispatch('fetchColumns',{pageSize:3})
        // store.dispatch('fetchCurrentColumn',users.value.column)
        console.log(store.state.columns);
      })
      const Columns=computed(()=>store.state.columns.data)
      const total=computed(()=>store.state.columns.total)
      const currentPage=computed(()=>store.state.columns.currentPage)
      const {loadMordPage,isLastPage}=useLoadMore('fetchColumns',total,{pageSize:3,currentPage:currentPage.value ?currentPage.value+1:2})
        return {
            Columns,
            users,
            loadMordPage,
            isLastPage
        }
    }
})

</script>