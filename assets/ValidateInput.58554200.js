import{d as b,y,_ as $,a as u,b as p,p as f,f as c,s as V,z as R,A as h,j as A,B as v,C as I,q as g,D as w,t as B,i as F}from"./index.6f9a7cbe.js";function k(e){return{all:e=e||new Map,on:function(a,t){var s=e.get(a);s?s.push(t):e.set(a,[t])},off:function(a,t){var s=e.get(a);s&&(t?s.splice(s.indexOf(t)>>>0,1):e.set(a,[]))},emit:function(a,t){var s=e.get(a);s&&s.slice().map(function(o){o(t)}),(s=e.get("*"))&&s.slice().map(function(o){o(a,t)})}}}const d=k(),m=k(),D=b({name:"ValidateForm",emits:["form-submit"],setup(e,a){let t=[],s=[];const o=n=>{t.push(n)},i=n=>{s.push(n)};return d.on("input-created",o),m.on("clear-created",i),y(()=>{d.off("input-created",o),m.off("clear-created",i),t=[]}),{submitForm:()=>{const n=t.every(l=>l());a.emit("form-submit",n),s.forEach(l=>l())},validatearr:t,clearArr:s}}}),M={action:"",class:"validate-form-container"},z={class:"submit-area"};function C(e,a,t,s,o,i){return u(),p("form",M,[f(e.$slots,"default"),c("div",z,[f(e.$slots,"submit",{},()=>[c("button",{type:"submit",class:"btn btn-primary",onClick:a[0]||(a[0]=V((...r)=>e.submitForm&&e.submitForm(...r),["prevent"]))},"\u63D0\u4EA4")])])])}const j=$(D,[["render",C]]),S=/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,q=b({name:"ValudateInput",props:{rules:{type:Array,required:!0},modelValue:String,tag:{type:String,default:"input"}},inheritAttrs:!1,setup(e,a){const t=R({val:h({get:()=>e.modelValue||"",set:i=>{a.emit("update:modelValue",i)}}),error:!1,message:""}),s=()=>{if(e.rules){const i=e.rules.every(r=>{let n=!0;switch(t.message=r.message||"",r.type){case"required":n=t.val.trim()!=="";break;case"email":n=S.test(t.val);break;case"range":{let l=!(t.val.trim().replace(" ","").length<r.min.length);if(l===!1){n=!1,t.message=r.min.message;break}if(l=!(t.val.trim().replace(" ","").length>r.max.length),l===!1){n=!1,t.message=r.max.message;break}}case"repassword":{n=r.validator?r.validator():!0;break}}return n});return t.error=!i,i}return!0},o=()=>{t.val=""};return A(()=>{d.emit("input-created",s),m.emit("clear-created",o)}),{inputRef:t,validateInput:s,emitter:d}}}),E={class:"validate-input-container pb-3"},U={key:2,class:"invalid-feedback"};function Z(e,a,t,s,o,i){return u(),p("div",E,[e.tag!=="textarea"?v((u(),p("input",g({key:0,class:["form-control",{"is-invalid":e.inputRef.error}]},e.$attrs,{"onUpdate:modelValue":a[0]||(a[0]=r=>e.inputRef.val=r),onBlur:a[1]||(a[1]=(...r)=>e.validateInput&&e.validateInput(...r))}),null,16)),[[I,e.inputRef.val]]):v((u(),p("textarea",g({key:1,class:["form-control",{"is-invalid":e.inputRef.error}],rows:"10"},e.$attrs,{"onUpdate:modelValue":a[2]||(a[2]=r=>e.inputRef.val=r),onBlur:a[3]||(a[3]=(...r)=>e.validateInput&&e.validateInput(...r))}),null,16)),[[w,e.inputRef.val]]),e.inputRef.error?(u(),p("span",U,B(e.inputRef.message),1)):F("",!0)])}const O=$(q,[["render",Z]]);export{O as V,j as a};