<template>
<div class="validate-input-container pb-3">
    <input class="form-control"
    v-if="tag!=='textarea'"
    :class="{'is-invalid':inputRef.error}"

    v-bind="$attrs"
    v-model="inputRef.val"
    @blur="validateInput">
    <textarea  v-else 
    class="form-control"
    rows="10"
    :class="{'is-invalid':inputRef.error}"
    v-bind="$attrs"
    v-model="inputRef.val"
    @blur="validateInput"
    ></textarea>
    <span class="invalid-feedback" v-if="inputRef.error">{{inputRef.message}}</span>
     </div> 
</template>

<script lang="ts">

import { computed } from "@vue/reactivity";
import { defineComponent,reactive ,PropType, onMounted} from "vue";
import {emitter,emitter1} from './ValidateForm.vue'
const emailrefReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export interface lengthProp{
    message:string;
    length:number
}
export type tag='input'|'textarea'
 type validateFunc=()=>boolean
export interface RuleProp{
    type:'required'|'email'|'range'|'repassword',
    message?:string,
    min?:lengthProp,
    max?:lengthProp,
    validator?:()=>boolean,
}
export default defineComponent({
    name:'ValudateInput',
    props:{
        rules:{
            type:Array as PropType<RuleProp[]>,
            required:true
        },
        modelValue:String,
        tag:{
            type:String as PropType<tag>,
           default:'input'
        }
    },
    inheritAttrs:false,
    setup(props,context)
    {
        const inputRef=reactive({
            val:computed({
                get:()=>props.modelValue||'',
                set:val=>{
                    context.emit('update:modelValue',val)
                }
            }
            ),
            error:false,
            message:''
        })

        //     :value="inputRef.val"
        //     @input="updateValue"
        // const updateValue=(e:Event)=>{
        //     const Targetvalue=(e.target as HTMLInputElement).value
        //     inputRef.val=Targetvalue
        //     context.emit('update:modelValue',Targetvalue)
        // }
        const validateInput=():boolean=>{
               if(props.rules)
               {
                const allpassed=props.rules.every(item=>{
                    let passed=true
                    inputRef.message=item.message||''
                    switch(item.type){
                        case 'required':passed=inputRef.val.trim()===''?false:true;break;
                        case 'email':passed=emailrefReg.test(inputRef.val);break;
                        case 'range':{
                            let ans=inputRef.val.trim().replace(' ','').length<(item.min as lengthProp).length?false:true;
                            if(ans===false){
                                passed=false
                                inputRef.message=(item.min as lengthProp).message
                                break;
                            }
                            ans=inputRef.val.trim().replace(' ','').length>(item.max as lengthProp).length?false:true;
                             if(ans===false){
                                passed=false
                                inputRef.message=(item.max as lengthProp).message
                                break;
                            }
                    
                        }
                        case'repassword':{
                            passed=item.validator?item.validator():true
                            break;
                        }
                    }
                    return passed
                })
                inputRef.error=!allpassed
                return allpassed
               }
               return true
        }
        const clears=()=>{
            inputRef.val=''
        }
        onMounted(()=>{
            emitter.emit('input-created',validateInput)
            emitter1.emit('clear-created',clears)
        })
        return {
            inputRef,
            validateInput,
            emitter
        }
    }
})
</script>