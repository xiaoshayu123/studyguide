import {createRouter,createWebHistory} from 'vue-router'
import store from './Store'
import axios from 'axios'
const router=createRouter({
//history:createWebHistory('pic/dist'),
history:createWebHistory(),
routes:[
    {
        path:'/',
        name:'home',
        component:()=>import('./views/Home.vue')
       
    },
    {
        path:'/register',
        name:'register',
        component:()=>import('./views/Register.vue')
       
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('./views/Login.vue'),
        meta:{
            redirectAlreadyLogin:true
        }
    },
    {
        path:'/column/:id',
        name:'column',
        component:()=>import('./views/ColumnDetail.vue')
    },
    {
      path:'/posts/:id',
      name:'posts',
      component:()=>import('./views/PostDetail.vue')
  },
    {
        path:'/createpost/:id',
        name:'createpost',
        component:()=>import('./components/CreatePost.vue'),
        meta:{
            requiredLogin:true
        }
    },
    {
      path:'/edit/:id',
      name:'edit',
      component:()=>import('./views/UpdateProfie.vue'),
      meta:{
        requiredLogin:true
      }
    }
]
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token){
      console.log(token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        store.commit('goout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router