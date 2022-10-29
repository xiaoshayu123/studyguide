import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import Store from './Store'
import axios from 'axios'
import { useRegisterSW } from 'virtual:pwa-register/vue';
import 'easymde/dist/easymde.min.css'
import {performance} from 'vme100'
performance();

axios.defaults.baseURL='http://43.138.126.219:8001/api/'
axios.interceptors.request.use(function(config){
    Store.commit('setLoading',true)
    Store.commit('setError',{status:false})
    //get请求添加到params中
    return config
})
axios.interceptors.response.use((config)=>{
  Store.commit('setLoading',false)
    return config
},(e)=>{
 const error=e.response.data.error
 Store.commit('setError',{status:true,message:error})
 Store.commit('setLoading',false)
 return Promise.reject(error)
})

createApp(App).use(router).use(Store).mount('#app')
