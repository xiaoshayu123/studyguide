import { ComputedRef,ref,computed } from "vue"
import { useStore } from "vuex"

interface loadPrams{
    currentPage:number,
    pageSize:number
}
const  useLoadMore=(actionName:string,total:ComputedRef<number>,params:loadPrams={currentPage:2,pageSize:6},cid:string='')=>{
    const store=useStore()
    const currentPage=ref(params.currentPage)
    const requestParams=computed(()=>({
        
        currentPage:currentPage.value,
        pageSize:params.pageSize
        
    }))

    const loadMordPage=()=>{
        if(cid)
        {
           let paramst={
              currentPage:currentPage.value,
              pageSize:params.pageSize,
              cid
            }
            store.dispatch(actionName,paramst).then(()=>{
                currentPage.value++
            })
        }
        else
        {
             store.dispatch(actionName,requestParams.value).then(()=>{
            currentPage.value++
        })
        }
       
    }
    const isLastPage=computed(()=>{ 
        console.log(currentPage.value);
        console.log(Math.ceil(total.value/params.pageSize));
        return  currentPage.value<=Math.ceil(total.value/params.pageSize)
    })
    return {
        loadMordPage,
        isLastPage,
        currentPage
    }

}
export default useLoadMore