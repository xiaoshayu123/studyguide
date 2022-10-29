
import { ColumnProps } from "./store";

interface checkCondition{
    format?:string[];
    size?:number;
}

type ErrorType='size'|'format'|null
function beforeUploadeCheck(file:File,condition:checkCondition){
    const {format,size}=condition
    const isValidateFormat=format?format.includes(file.type):true
    const isValidateSize=size?file.size/1024/1024<size:true
    let error:ErrorType=null
    if(!isValidateFormat)error='format'
    if(!isValidateSize)error='size'

    return {
        passed:isValidateFormat&&isValidateSize,
        error
    }
}
export default beforeUploadeCheck

interface TestProps{
    _id:string;
    name:string;
}

const testData:TestProps[]=[{
    _id:'1',
    name:'lzc'
},
{
    _id:'2',
    name:'lac'
}
]

const testData2:{[key:string]:TestProps}={
    '1':{_id:'1',name:'a'},
    '2':{_id:'2',name:'b'}
}

export const arrToObj=<T extends {_id:string}>(arr:Array<T>)=>{

    return arr.reduce((prev,current)=>{
        if(current._id){
            prev[current._id]=current
        }
        return prev

    },{} as {[key:string]:T})
}

export const objToArr=<T>(obj:{[key:string]:T})=>{

    //return  Object.keys(obj).map(key=>obj[key])
    return Object.values(obj)
}



