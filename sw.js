if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let o={};const t=s=>l(s,r),u={module:{uri:r},exports:o,require:t};e[r]=Promise.all(i.map((s=>u[s]||t(s)))).then((s=>(n(...s),o)))}}define(["./workbox-3625d7b0"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/callout.e640eb6c.svg",revision:null},{url:"assets/ColumnDetail.3942e931.css",revision:null},{url:"assets/ColumnDetail.f9f1472f.js",revision:null},{url:"assets/CreatePost.1883cf9e.css",revision:null},{url:"assets/CreatePost.7fe8cc1c.js",revision:null},{url:"assets/Home.3cf33d5b.css",revision:null},{url:"assets/Home.8f760200.js",revision:null},{url:"assets/index.6f9a7cbe.js",revision:null},{url:"assets/index.be9cc3b9.css",revision:null},{url:"assets/Login.22406055.css",revision:null},{url:"assets/Login.7a357c1c.js",revision:null},{url:"assets/marked.esm.1c7943b9.js",revision:null},{url:"assets/pkq.7b8dade2.jpg",revision:null},{url:"assets/PostDetail.bbee3116.css",revision:null},{url:"assets/PostDetail.da4f1e2a.js",revision:null},{url:"assets/Register.0188e33c.js",revision:null},{url:"assets/Register.5430fd2d.css",revision:null},{url:"assets/UpdateProfie.4a062787.js",revision:null},{url:"assets/UpdateProfie.551edbd6.css",revision:null},{url:"assets/Uploader.ac001dde.js",revision:null},{url:"assets/useLoadMore.0ba5cf6b.js",revision:null},{url:"assets/ValidateInput.58554200.js",revision:null},{url:"assets/workbox-window.prod.es5.d2780aeb.js",revision:null},{url:"favicon.ico",revision:"1ba2ae710d927f13d483fd5d1e548c9b"},{url:"index.html",revision:"7c37f5e3af453cb1cb63015ca0ca630f"},{url:"manifest.webmanifest",revision:"179ef5ecb68dd2a02c1c27db0bcec89a"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
