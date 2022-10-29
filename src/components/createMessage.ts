
import { createApp,h,render} from 'vue'
import useDomCreate from '../hooks/useDomCreate'
import Message from './message.vue'
export type MessageType='success'|'error'|'defalut'
const createMessage=(message:string,type:MessageType,timeout=2000)=>{
        const messageVnode=h(Message,{
            message,
            type
        })
        const node=useDomCreate('message')
        render(messageVnode,node)
        setTimeout(() => {
            render(null,node)
            document.body.removeChild(node)
        }, timeout);

}
export default createMessage