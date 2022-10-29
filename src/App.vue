
<template>
<div class="container">
<global-header :user="user"></global-header>
  <loader v-if="isLoading" text="正在加载中" background="rgba(0,0,0,0.5)"></loader>
  <modal :visible="offlineReady||needRefresh" title="删除文章"
    @model-click-close="close"
    @model-click-confirm="updateServiceWorker">
    <h4>检测到了更新，需要立即更新吗</h4>
    </modal>
<router-view/>
<global-footer></global-footer>
</div>
</template>
<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import { defineComponent,watch,computed} from 'vue';
import GlobalHeader  from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'
import { useStore } from 'vuex';
import Loader from './components/Loader.vue';
import   Modal from './components/Modal.vue'
import createMessage from './components/createMessage';
import { GlobalProps} from './Store';
import { useRegisterSW } from 'virtual:pwa-register/vue'
const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW()

export default defineComponent({
  
  name:'App',
  components:{
    GlobalHeader,
    GlobalFooter,
    Loader,
    Modal
  },
  setup()
  {
    const store=useStore<GlobalProps>()
    const user=computed(()=>store.state.user)
    const error=computed(()=>store.state.error)
    const isLoading=computed(()=>store.state.loading)
    const token=computed(()=>store.state.token)
     watch(()=>error.value.status,()=>{
       const {status,message}=error.value
       if(status&&message){
         createMessage(message,'error')
       }
    })
    const close=()=>{
    offlineReady.value = false
  needRefresh.value = false
    }

    return {
      user,
      isLoading,
    offlineReady,
  needRefresh,
  updateServiceWorker,
  close
    }
  }
})
</script>

