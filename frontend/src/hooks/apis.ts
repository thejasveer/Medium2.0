import { signinParams, signupParams } from '@codewithjass/common';
import axios  from 'axios' 
import { useCallback, useEffect , useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { BACKEND_URL } from '../config';
import {AllBlogsAtom, AllBlogsTrigger, BlogTrigger, MyBlogsTrigger, blogAtom, clapClassAtom, myBlogsAtom} from "../store/blogAtoms"
 
import {  activeUserAtom, authAtom, userAtom } from '../store/userAtom';
import {  ImgAtom, contentAtom, draftState, reviewToggleAtom, tagsAtom } from '../store/EditorAtom';
import  * as DOMPurify from 'dompurify';
import DRAFTSTATE, { Blog ,User} from '../interfaces';
 
import { alertAtom } from '../store/alertAtom';

// Authentication 
export const useSignup= (inputs: signupParams)=>{
    
    const [errors,setErrors] = useState([]);
    const [loading,setLoading] = useState(false);
    const setAuth = useSetRecoilState(authAtom)
    const setUser= useSetRecoilState(userAtom)
           const navigate = useNavigate()
    async function signupPost(){
    try {
            setLoading(true);
            let response = await axios.post(BACKEND_URL+"/user/signup",inputs);
             const data = response.data;
             const token: string = data.token;
            localStorage.setItem('token',token);
            setAuth(token);
            navigate('/blogs')
            setLoading(false);
            setUser(data.user)

            } catch (err: any) {
                 setLoading(false);
                 setErrors(err.response.data.error)
            }
    }

    return {errors,signupPost,loading};
}

export const useSignin=(inputs: signinParams) => {
 
    const [errors,setErrors] = useState<any>([]);
    const [loading,setLoading] = useState(false);
    const setAuth = useSetRecoilState(authAtom)
    const setUser= useSetRecoilState(userAtom)
    const navigate = useNavigate()
          

        async function signinIn(){
            try {
                setLoading(true);
                let response = await axios.post(BACKEND_URL+"/user/signin",inputs);
                const data = response.data;
                const token: string = data.token;
                localStorage.setItem('token',token)
                setAuth(token);
                setUser(data.user)
                navigate('/blogs')
                setLoading(false);
                
            } catch (err: any) {
                    console.log(err)
                    setLoading(false);
                    setErrors(...[],[err.response.data.error[0]])
                    console.log(errors)
                }
        }

    return {errors,signinIn,loading};
}
export const useAuth = ()=>{
   
    const userLoadable = useRecoilValueLoadable<User>(activeUserAtom);
 
    const userExist = userLoadable.state === 'hasValue';
    
    return {
      user: userLoadable.contents,
      res: userLoadable,
      userExist,
    };
}

 
 // Authentication end

//  blogs
export const useBlogs = ()=>{
    
    // const [myblogs,setMyblogs] = useState<Blog[]>([]);
    const blogs  = useRecoilValueLoadable<Blog[]>(AllBlogsAtom);
    const  myblogs  = useRecoilValueLoadable<Blog[]>(myBlogsAtom);
    const resetMyblogs = useSetRecoilState(MyBlogsTrigger);
    const resetAllblogs = useSetRecoilState(AllBlogsTrigger);
    const [loading,setLoading] = useState(false);
    const token = useRecoilValue(authAtom)
    const setUser = useSetRecoilState(userAtom)
 

    
        const deleteBlog=async(id: string)=>{
           try{
                setLoading(true); 
               await axios.delete(`${BACKEND_URL}/blog/my/${id}`,{
                    headers:{
                      Authorization: "Bearer "+  token
                    }
                  })  .then(async(response) => { 
 
                    setUser(prev=>({
                        ...prev,
                        list:response.data.readingList
                    }))
                  
                  }) .finally(() => {
                    resetMyblogs((x)=>x+1)
                    resetAllblogs((x)=>x+1)
                    setLoading(false)
                  }
                  );

         
               
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }
    return {blogs,myblogs,loading,deleteBlog};
  }
 



export const useBlog = (id: string = "") => {
    const [blog,setBlog]= useRecoilStateLoadable(blogAtom(id))
    const token = useRecoilValue(authAtom)
    const [clapClass,setClapClass] = useRecoilState(clapClassAtom)
   
  
 
    const clap= async()=>{
        try {   
         
            if(blog.contents){
             
              setClapClass(()=>'') 
              setBlog({...blog.contents,claps:blog.contents.claps+1});
               setTimeout(()=>{
                setClapClass(()=>'animate-jump fill-slate-900')
               },0) 
            }
 
         await axios.put(BACKEND_URL+ '/blog/clap',{id:id},{
            headers: {   Authorization: 'Bearer '+ token   }
                     });
              } catch (error) {
            console.log(error)
        }
    }
    return { blog,clap,clapClass,setClapClass};
  };
 
  export const useFormatDate=(str: string)=>{
    const options: any = {  year: 'numeric', month: 'long', day: 'numeric' };
    const date = (new Date(str)).toLocaleDateString("en-US",options)
      return date;
}

export const useSanitize = (str: string)=>{
     const clean = DOMPurify.sanitize(str);
        return clean;
}
 

// :save as dashboard of user , update , delete, 
export const useBlogCrud =  ( placeholderId: string)=>{ 
 
    const [,setPublish] = useState<boolean>(false)
    const [blog,setblog]= useRecoilStateLoadable(contentAtom(placeholderId));
    const [currDraftState,setDraftState] = useRecoilState(draftState)
    const [tagsArr,setTagsArr] = useRecoilState(tagsAtom);
    const resetMyblogs = useSetRecoilState(MyBlogsTrigger);
    const resetAllblogs = useSetRecoilState(AllBlogsTrigger);
    const resetBlog = useSetRecoilState(BlogTrigger);
    // const [blogs] = useRecoilStateLoadable(blogAtom)
 
   
    let [imgObj,setImgObj] = useRecoilState(ImgAtom)
    
    const navigate = useNavigate()
    const setAlerts= useSetRecoilState(alertAtom);
    const setReviewToggle= useSetRecoilState(reviewToggleAtom)
    const user  = useRecoilValue(userAtom)
 
    const postBlog = async (publish: boolean) =>{
 
        try {
         
            if(blog.state=='hasValue'&& blog.contents.title!='' && blog.contents.content!="" && currDraftState==''){
               
                 await   manageImage();
                 setImgObj({...imgObj,newSrc:""})
                 const tags = tagsArr.length>0 ?tagsArr.map(t=>t.tag).join(',') :"";
                manageDraftState( DRAFTSTATE.SAVING)
                const res = await axios.put(BACKEND_URL+'/blog/my',{
                    title:blog.contents.title,
                    content:blog.contents.content,
                    published:publish,
                    placeholder:false,
                    tags:tags,
                    
                    id:blog.contents.id
                },{ 
                 headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token") //the token is a variable which holds the token
                    }, 
                });
              
                const updatedBlog= res.data.blog
              await  setblog((prevBlog:any) => ({
                    ...prevBlog,
                    id: updatedBlog.id,
                    title: updatedBlog.title,
                    createdAt:updatedBlog.createdAt,
                    content:updatedBlog.content,
                    published: publish,
                    tags: updatedBlog.tags,
                    author:updatedBlog.author,
                    img:updatedBlog.img
                    
                  }));
                  setTagsArr([])
                  resetMyblogs((x)=>x+1)
                  resetAllblogs((x)=>x+1)
                  resetBlog((x)=>x+1)
                if(publish){
                    

                    navigate('/blog/'+updatedBlog.id)
                }else{
                    navigate('/@'+user.username)
                }

               
                manageDraftState( DRAFTSTATE.SAVED)
                if(publish){
                    setAlerts([{msg:"New story published",bgColor:"bg-green-500"}])
                }else{
                    setAlerts([{msg:"Story saved as draft",bgColor:"bg-black"}])
                }
                
            }else{
                  const msg= [{ msg: 'Oops, did you mean to write something so short? Please write more and try publishing again.',bgColor:'bg-red-500'}]
                    if(blog.contents.title=="" || blog.contents.content==""){ 
                        setAlerts(msg) 
                      
                    } 
            }
            setReviewToggle(false)
          } catch (error) {
            console.error(error)
        }
    }
    const manageImage= async()=>{
    try {
    
            if(blog.state=='hasValue'&& (blog.contents.title!='' || blog.contents.content!="") && currDraftState==''){
    
            
                await axios.put(BACKEND_URL+'/blog/img',{
                    img: imgObj.newSrc==""?blog.contents.img:imgObj.newSrc,
                    id:blog.contents.id
                },{ 
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token") ,
                    //the token is a variable which holds the token
                    }, 
                });
                
            }
        } catch (error) {
        console.log(error)
        }
    }


    const updateBlog = async () =>{
 
        try {
      
            if(blog.state=='hasValue'&& (blog.contents.title!='' || blog.contents.content!="") && currDraftState==''){
                let tags = blog.contents.tags;
             
                tags = tags.length>0 ?tags.map((t: any)=>{t.tag.join(',')}) :"";
                manageDraftState( DRAFTSTATE.SAVING)
                const res = await axios.put(BACKEND_URL+'/blog/my',{
                    title:blog.contents.title,
                    content:blog.contents.content,
                    published:blog.contents.published,
                    placeholder:blog.contents.placeholder,
                    tags:tags,
                      
                    id:blog.contents.id
                },{ 
                 headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token") ,
                      //the token is a variable which holds the token
                    }, 
                });
               const updatedBlog= res.data.blog
             
                setblog((prevBlog:any) => ({
                    ...prevBlog,
                    id: updatedBlog.id,
                    title: updatedBlog.title,
                    createdAt:updatedBlog.createdAt,
                    content:updatedBlog.content,
                    
                    published: false,
                    tags: updatedBlog.tags,
                    author:updatedBlog.author,
                    img:updatedBlog.img
                    
                  }));
            }
            manageDraftState( DRAFTSTATE.SAVED)

          } catch (error) {
            console.error(error)
        }
    };

   const manageDraftState = useCallback((state: any) =>{
 
        setDraftState(state)
      
        setTimeout(()=>{
            setDraftState("")
         },2000)

   },[])

    const getPlaceholderId =async()=>{
 
        try {
     
            
            if(blog.state=='hasValue'&& (blog.contents.title!='' || blog.contents.content!="")  && currDraftState==''){
                const tags = tagsArr.length>0 ?tagsArr.map(t=>t.tag).join(',') :"";
                const res = await axios.post(BACKEND_URL+'/blog/my',{
                    title:blog.contents.title,
                    content:blog.contents.content, 
                    placeholder:true,
                    tags:tags,
                  
                },{ 
                 headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token") //the token is a variable which holds the token
                    }, 
                });
                
              
                const updatedBlog= res.data.blog
              
                const url = `/p/${updatedBlog.id}/edit`;
                setblog((prevBlog:any) => ({
                    ...prevBlog,
                    id: updatedBlog.id,
                    title: updatedBlog.title,
                    createdAt:updatedBlog.createdAt,
                    content:updatedBlog.content,
                    published: updatedBlog.published,
                    tags: updatedBlog.tags,
                    author:updatedBlog.author,
                    img:updatedBlog.img
                    
                  }));
                
                navigate(url,{ replace: true });
                 
            }
            
          } catch (error) {
            console.error(error)
            }
        }

    return {setPublish,postBlog,getPlaceholderId,updateBlog,manageImage,manageDraftState}

    

}       

export const useReadingList = ()=>{
const auth = useRecoilValue(authAtom);
const [loading,setLoading] = useState(false)
const setAlert = useSetRecoilState(alertAtom)
 const [blogs,updateReadingList]= useRecoilState(userAtom)
 
    const update= async(id: string)=>{
        try {
            setLoading(true)
            const res= await axios.post(BACKEND_URL+'/user/reading-list',{
            id:id
            },{ 
            headers: {
                Authorization: 'Bearer ' + auth//the token is a variable which holds the token
                }, 
            });
            setLoading(false)
            updateReadingList({...blogs, list:res.data.list})
            setAlert([{msg: 'Updated reading list',bgColor:'bg-black'}])
        } catch (error) {
            setLoading(true)
            console.log(error)
        }
    
    }
 
return {update,loading}


}

interface recentSearch{
    id:string;
    title:string;
    content:string;
}
export const useRecentSearches = ()=>{
    const [recentSearches,setRecentSearches] = useState< recentSearch[]|any>([])

    useEffect(()=>{
        let r = localStorage.getItem('recent') 
  
        if(r){
           r = JSON.parse(r);

            setRecentSearches(r)
        }else{

            localStorage.setItem('recent', JSON.stringify([]));
        }
    },[])

    function add({title,content,id}:{title:string,content:string,id:string }){
         const newSearch = {title,content,id};
        if(!recentSearches.find((obj:recentSearch)=>obj.id==id)){
            let rec = recentSearches;
            if(recentSearches.length>4){
                 
                  rec = rec.slice(3);
             } 
            rec.push(newSearch);
            setRecentSearches(rec)
            localStorage.setItem('recent', JSON.stringify(recentSearches));
        }
    }

    function remove(index: number){
        const r = [...recentSearches]
         r.splice(index,1)
         setRecentSearches(r)
         localStorage.setItem('recent', JSON.stringify(r));
    }
    return {recentSearches,add,remove}

}