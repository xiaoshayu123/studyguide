<template>
<div class="row">
    <div v-for="column in columnlist" :key="column._id" class="col-4 mb-4">
    <div class="card  h-100 shadow-sm">
        <div class="card-body text-center">
                    <img :src="column.avatar" alt="" class="rounded-circle border border-light my-3">
            <h5 class="card-title">{{column.title}}</h5>
        <p class="card-text text-left">{{column.description}}</p>
        <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏</router-link>
        </div>
    </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent,PropType,computed } from "vue";
import { ColumnProps,ImageProps } from "../Store";
import { objToArr } from "../helper";

export default defineComponent({
    name:'ColumnList',
    props:{
        list:{
            type:Object  as PropType<{[key:string]:ColumnProps}>,
            required:true
        }
    },
    setup(props,context){
      const columnlist=computed(()=>{
          objToArr<ColumnProps>(props.list).map(item=>{
              if(!item.avatar){
                item.avatar=new URL('../assets/pkq.jpg', import.meta.url).href
                  return item
              }
          })
            return props.list
      })
      return {
          columnlist
      }
    }
})
</script>

<style scoped>
.card-body img{
    width: 50px;
    height: 50px;
}
.test{
    height: 272px;
}
</style>