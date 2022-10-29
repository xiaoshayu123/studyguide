<template>
  <div class="user-profile-component">
    <div class="d-flex align-items-center">
      <img :src="usert.avatar" :alt="usert.nickName" class="rounded-circle img-thumbnail">
      <div class="detail ml-2">
        <h6 class="d-block mb-0">{{usert.nickName}}</h6>
        <span class="text-truncate text-muted d-block">{{usert.description}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, onMounted,ref } from 'vue'
import { useStore } from 'vuex';
import { UserProps } from '../store';
import { GlobalProps } from "../Store";
export default defineComponent({
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props)
  {
      let id=props.user;   
      const store=useStore<GlobalProps>()
      let usert=ref<UserProps>(store.state.user)
      onMounted(()=>{
       store.dispatch('fetchOneUser',id).then(res=>{
          usert.value=res.data.data;
          console.log(usert);
       })
      })
      return {
          usert
      }
  }
 
})
</script>

<style>

.user-profile-component img {
  width: 50px;
  height: 50px;
  /* border: 1px solid #ccc;
  border-radius: 50px; */
}

</style>
