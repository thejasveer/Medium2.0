 
import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useEffect, useState } from "react"
import { signinParams } from "@codewithjass/common/dist" 
import { Qoute } from "../components/Qoute"
import {  useSignin } from "../hooks/apis"
import { Errors } from "../components/Errors"
 
import { useNavigate } from "react-router-dom"
import { authAtom } from "../store/userAtom"
import { useRecoilValue } from "recoil"
export const Signin= () =>{
     
    const navigate = useNavigate()
    const  authenticated= useRecoilValue(authAtom)
 

    const [inputs, setInputs] = useState<signinParams>({
        email: "",
        password: "",
    })
    useEffect(()=>{
        if(authenticated){
            navigate('/')
        }
    },[authenticated])
    
    const {errors,loading,signinIn} = useSignin(inputs)
 
    return  (
        <>
        
        <div className="flex ">
            <div className="w-full lg:w-1/2    h-screen flex flex-col justify-center items-center">
                <div className="w-full p-16">
                <Heading text={"Create an account"}></Heading>
                <Subheading text={"Don't have an account?"} link={"Signup"} />
                <Input label="Email" value={inputs.email} onchange={(e)=>{ setInputs({...inputs, email:e.target.value})}}   type={"text"} placeholder="Enter your email"/>  
                <Input label="Password" value={inputs.password}  onchange={(e)=>{ setInputs({...inputs, password:e.target.value})}}   type={"password"} placeholder="******* "/>  
                <Errors errors={errors} />
                <Button text="Sign in" onclick={signinIn} loading={loading} ></Button>
                </div>
             
            </div>
            <Qoute />
        </div>
        
        </>
       
    )
}
