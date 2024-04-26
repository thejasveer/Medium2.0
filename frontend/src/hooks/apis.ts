import { signinParams, signupParams } from '@codewithjass/common';
import axios, { AxiosError, AxiosResponse } from 'axios' 
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { BACKEND_URL } from '../config';
import {blogAtom, myBlogsAtom} from "../store/blogAtoms"
 
import {  activeUserAtom, authAtom, userAtom } from '../store/userAtom';
import {  contentAtom, placeholderIdAtom, tagsAtom } from '../store/EditorAtom';
import  DOMPurify from 'dompurify';
import { Blog ,User} from '../interfaces';

// Authentication 
export const useSignup= (inputs: signupParams)=>{
    const [response,setRes] = useState();
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

    return {response,errors,signupPost,loading};
}

export const useSignin=(inputs: signinParams) => {
    const [response,setRes] = useState();
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

    return {response,errors,signinIn,loading};
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
export const useBlogs= ()=>{
    const [blogs,setBlogs] = useState<Blog[]>([]);
    const [loading,setLoading] = useState(false);
    const getBlogs = async()=>{
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/blog/bulk`);
            const data = response.data;
            setBlogs(data.blogs);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            
        }

    }
    return {getBlogs,blogs,loading};


}



export const useBlog = (id: string = "") => {
    const blog = useRecoilValueLoadable<Blog>(blogAtom(id));
    return { blog };
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
export const useBlogCrud =  ( )=>{ 
 
    const placeholderId= useRecoilValue(placeholderIdAtom)
    console.log("from apis",placeholderId)
    const [publish,setPublish] = useState<boolean>(false)
    const [blog,setblog]= useRecoilStateLoadable(contentAtom(placeholderId));
    debugger
    const tagsArr = useRecoilValue(tagsAtom);
    const tags = tagsArr.map(t=>t.tag).join(',');
    const navigate = useNavigate()
    useEffect(()=>{
        
        setblog({...blog,published:publish})
    },[publish])

    const postBlog = async () =>{
        try {
         
            if(blog.state=='hasValue'){
                const res = await axios.put(BACKEND_URL+'/blog/my',{
                    title:blog.contents.title,
                    content:blog.contents.content,
                    published:blog.contents.published,
                    placeholder:false,
                    tags:tags,
                    id:blog.contents.id
                },{ 
                 headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token") //the token is a variable which holds the token
                    }, 
                });
            }
       
          } catch (error) {
            console.error(error)
        }
    }

    const getPlaceholderId = async()=>{
       
        try {
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
            const url = `/p/${res.data.blog.id}/edit`
            navigate(url);
          } catch (error) {
            console.error(error)
            }
        }

    return {setPublish,postBlog,getPlaceholderId }

    

}       

export const useReadingList = ()=>{
const auth = useRecoilValue(authAtom);
const [loading,setLoading] = useState(false)
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
        
        } catch (error) {
            setLoading(true)
            console.log(error)
        }
    
    }
 
return {update,loading}


}