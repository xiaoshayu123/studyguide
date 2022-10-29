import { onUnmounted } from "vue"

const useDomCreate=(selector:string)=>{

    const node=document.createElement('div')
    node.id=selector
    document.body.appendChild(node)
    onUnmounted(()=>{
        document.body.removeChild(node)
    })
    return node
}


export default useDomCreate