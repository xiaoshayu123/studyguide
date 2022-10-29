
import axios, { AxiosRequestConfig } from "axios";
import { createStore,Commit } from "vuex";
import { arrToObj,objToArr } from "./helper";
export interface UserProps{
    isLogin:boolean;
    nickName?:string;
    _id?:string;
    column?:string;
    avatar?:string;
    description?:string;

}
export interface PostProps{
    _id:string;
    title:string;
    excerpt?:string;
    content?:string;
    image?:string;
    createdAt:string;
    column:string;
    isHTML?: boolean;
}
export interface ImageProps{
    _id:string;
    url:string;

}
export interface GlobalErrorProps{
    status:boolean;
    message?:string;
}
export interface gloablColumnsProp{
    data:ListProps<ColumnProps>;
    total:number,
   currentPage:number;
}
export interface globalPostsProp{
    data:ListProps<PostProps>,
    total:number;
    loadedColumns:string[]
    loadedPosts:{[_id:string]:number}
}
export interface ColumnProps{
    _id:string;
    avatar?:string;
    title:string;
    description:string;
}
interface ListProps<T>{
    [id:string]:T
}
//优化请求，减少次数的数据结构
export interface GlobalProps{
    error:GlobalErrorProps,
    user:UserProps,
    columns:gloablColumnsProp,
    Posts:globalPostsProp,
    loading:boolean,
    token:string
}
const asyncAndCommit=async (url:string,mutationName:string,commit:Commit,config:AxiosRequestConfig={method:'GET'})=>{
   const res=await axios(url,config)
   commit(mutationName,res.data)
   return res.data
}


const store=createStore<GlobalProps>({
    state:{
        error:{
          status:false  
        },
        user:{
            isLogin:false
        },
        Posts:{data:{},loadedColumns:[],total:0,loadedPosts:{}},
        columns:{data:{},total:0,currentPage:0},
        loading:false,
        token:localStorage.getItem('token')||''
    },
    mutations:{
        addPost(state,newpost){
            //state.Posts.push(newpost)
            state.Posts.data[newpost._id]=newpost
        },
        fetchColumns(state,columns){
            const data1=state.columns.data
            const {count,data,currentPage}=columns
            console.log(data);
            state.columns={
                data:{...data1,...arrToObj(data)},
                currentPage:currentPage*1,
                total:count
            }
        },
        fetchCurrentColumn(state,currentColumn){
            //state.columns=[currentColumn]
            console.log(currentColumn);
            state.columns.data[currentColumn._id]=currentColumn
        },
        fetchPosts(state,rawdata){
            console.log(rawdata);
            const {data,count,currentPage}=rawdata
            state.Posts.data={...state.Posts.data, ...arrToObj(data)}
            state.Posts.loadedColumns.push(data[0].column)
            state.Posts.total=count
            state.Posts.loadedPosts[data[0].column]=currentPage
        },
        setLoading(state,loadings)
        {
            state.loading=loadings
        },
        setError(state,status){
            state.error=status
        },
        login(state,resdata)
        {
            localStorage.setItem('token',resdata.data.token)
    
            state.token=resdata.data.token
            axios.defaults.headers.common['Authorization']=`Bearer ${resdata.data.token}`
        },
        fetchCurrentUser(state,rawdata){
            state.user={isLogin:true,...rawdata.data}
        },
        fetchCurrentPost(state,rawdata){
            state.Posts.data[rawdata._id]=rawdata
        },
        updatePost(state,rawdata)
        {
                state.Posts.data[rawdata._id]=rawdata
        },
        goout(state){
            state.user={
                isLogin:false
            }
            state.token=''
            localStorage.removeItem('token')
           delete axios.defaults.headers.common['Authorization']
        },
        deletePost(state,cid)
        {
            //state.Posts=state.Posts.filter(item=>item._id!==cid)
            delete state.Posts.data[cid]
        },
        patchCurrentUser(state,res)
        {
            state.user=res.data
        }  
    },
    actions:{
      async  fetchColumns(content,params={}){
          const {currentPage=1,pageSize=6}=params
          if(content.state.columns.currentPage>currentPage)return ;
          const res=await axios.get(`columns/all?currentPage=${currentPage}&pageSize=${pageSize}`)  
          content.commit('fetchColumns',res.data.data)
        },
        async  fetchCurrentColumn(context,cid){
            //if(context.state.columns.data[cid])return ;
            const res=await axios.get(`/columns/get?id=${cid}`)
           console.log(res.data);
            context.commit('fetchCurrentColumn',res.data.data)
            return res.data.data
        },
        async fetchPosts(context,params={cid:String}){
            const {cid,currentPage=1,pageSize=5}=params
            if(context.state.Posts.loadedColumns.find(item=>item===cid)===undefined||(context.state.Posts.loadedColumns.find(item=>item===cid)&&context.state.Posts.loadedPosts[cid]<currentPage))
            {
                const res=await axios.get(`/posts/getall?id=${cid}&currentPage=${currentPage}&pageSize=${pageSize}`)
           
                context.commit('fetchPosts',res.data.data)
                return res.data
            }
            return 
            
        },
        async login(context,payload){
            const res=await axios.post('/user/login',payload)
            context.commit('login',res.data)
            return res.data
        },
        async register(context,payload){
            const res=axios.post('/user/register',payload)
            return res
        },
        async fetchCurrentUser(context){
            const res=await axios.get('/user/current')
            context.commit('fetchCurrentUser',res.data)
            return res.data.data
        },
        loginAndFetch(context,logindata){
            return context.dispatch('login',logindata).then(()=>{
                return  context.dispatch('fetchCurrentUser')
            })
        },
        async addPost(context,payload){
            const res=await axios.post('/posts/new',payload)
            context.commit('addPost',payload)
            return res
        },
        async fetchCurrentPost(context,cid){
            const currentPost=context.state.Posts.data[cid]
            if(!currentPost||!currentPost.content){
                
                const res=await axios.get(`/posts/get?id=${cid}`)
             console.log(res.data);
                context.commit('fetchCurrentPost',res.data.data)
                return res.data.data
              
            }
            return Promise.resolve({data:context.state.Posts.data[cid]})
        },
        async deletePost(context,cid)
        {
            const res=await axios.delete(`/posts/${cid}`)
            context.commit('deletePost',cid)
         
            return res.data
        },
        async updatePost(context,payload)
        {
            const cid=payload.id
            delete payload.id
            const res=await axios.patch(`/posts/${cid}`,payload)
            context.commit('updatePost',res.data)
            return res.data
        },
        async patchCurrentUser(context,payload)
        {
            const cid=payload._id
            const res=await axios.patch(`/user/update`,payload)
            context.commit('patchCurrentUser',res.data)
            return res.data
        },
        async patchCurrentColumn(context,payload)
        {
            const cid=payload.id
            delete payload.id

            const res=await axios.patch(`/columns/update`,payload)
            console.log(res.data);
            context.commit('fetchCurrentColumn',res.data)
            return res.data
        },
        async fetchOneUser(content,id){
            const res=await axios.get(`/user/one?id=${id}`);
            return res;
        }
    },
    getters:{
        getColumnByid: (state) => (id:string) => {
            console.log(state.columns.data[id]);
            return state.columns.data[id]
          },
        getPostsById:(state) => (id:string) => {
            return  objToArr(state.Posts.data).filter(item=>item.column===id)
        },
        getPostById:(state)=>(id:string)=>{
            return state.Posts.data[id]
        },
        getColumns:(state)=>{
            return objToArr(state.columns.data)
        }
    }
})
export default store