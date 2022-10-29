import {ref,onMounted,onUnmounted,Ref} from 'vue'
const useclickoutside=(dropdownref:Ref<null|HTMLElement>)=>{
    let isopen=ref(false)
    const handler=(e:MouseEvent)=>{
        if(dropdownref.value){
           if(!dropdownref.value.contains(e.target as HTMLElement)){
                isopen.value=false
           }
           else
           {
               isopen.value=true
           }
        }
    }
    onMounted(()=>{
        document.addEventListener('click',handler)
    })
    onUnmounted(()=>{
        document.removeEventListener('click',handler)
    })
    return isopen
}
export default useclickoutside