import { signinParams, signupParams } from '@codewithjass/common';
import axios, { AxiosError, AxiosResponse } from 'axios' 
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from './config'
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