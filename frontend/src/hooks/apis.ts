import { signinParams, signupParams } from '@codewithjass/common';
import axios, { AxiosError, AxiosResponse } from 'axios' 
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { BACKEND_URL } from '../config';
import {blogAtom} from "../store/blogAtoms"
import DOMPurify from 'isomorphic-dompurify';
export const useSignup= (inputs: signupParams)=>{
    const [response,setRes] = useState();
    const [errors,setErrors] = useState([]);
    const [loading,setLoading] = useState(false);
           const navigate = useNavigate()
    async function signupPost(){
    try {
            setLoading(true);
            let response = await axios.post(BACKEND_URL+"/user/signup",inputs);
             const data = response.data;
             const token: string = data.token;
            localStorage.setItem('token',token)
            navigate('/blogs')
            setLoading(false);

            } catch (err: any) {
                 setLoading(false);
                 setErrors(err.response.data.error)
            }
    }

    return {response,errors,signupPost,loading};
}

export const useSignin=(inputs: signinParams) => {
    const [response,setRes] = useState();
    const [errors,setErrors] = useState([]);
    const [loading,setLoading] = useState(false);
           const navigate = useNavigate()
    async function signinIn(){
        try {
            setLoading(true);
            let response = await axios.post(BACKEND_URL+"/user/signin",inputs);
             const data = response.data;
             const token: string = data.token;
            localStorage.setItem('token',token)
            navigate('/blogs')
            setLoading(false);
            } catch (err: any) {
                 setLoading(false);
                setErrors(...[],[err.response.data.error[0]])
            }
    }

    return {response,errors,signinIn,loading};
}

export const Auth=()=>{
    
    async function isAuthenticated(){
        const token: string|null = localStorage.getItem('token');

        if(token){
            const response = await axios.post(`${BACKEND_URL}/api/user/me`,token);
            const data = response.data();
            


        }
    }
   
}

interface Blog {
    "id":string;
    "title":string;
    "content": string;
    "published": string
    "createdAt": string;
    "author": {
        "name": string;
        "description": string;
    }
}
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
    console.log(str)
    const clean = DOMPurify.sanitize(str);
      
       return clean;
}
 