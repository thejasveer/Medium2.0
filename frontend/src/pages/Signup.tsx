import { Qoute } from "../components/Qoute"
import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState , useEffect} from "react"
import { signupParams } from "@codewithjass/common"
import { useSignup } from "../utils/apis"
import {Errors} from "../components/Errors"
export const Signup= () =>{
    const [inputs, setInputs] = useState<signupParams>({
        name: "",
        email: "",
        password: "",
    })

 
     const {errors, signupPost,loading} = useSignup(inputs);
    

    return (
        <>
        
        <div className="flex ">
            <div className="w-full lg:w-1/2    h-screen flex flex-col justify-center items-center">
                <div className="w-full p-16">
                <Heading text={"Create an account"}></Heading>
                <Subheading text={"Already have an account?"} link={"Signin"} />
                <Input label="Username"  value={inputs.name}   onchange={(e)=>{ setInputs({...inputs, name:e.target.value})}}  type={"text"} placeholder="Enter your username"/>  
                <Input label="Email" value={inputs.email}  onchange={(e)=>{ setInputs({...inputs, email:e.target.value})}}   type={"text"} placeholder="Enter your email"/>  
                <Input label="Password"  value={inputs.password}   onchange={(e)=>{ setInputs({...inputs, password:e.target.value})}}   type={"password"} placeholder="******* "/>  
                <Errors errors={errors}/>
                <Button text="Sign Up" onclick={signupPost} loading={loading} ></Button>

                </div>
             
            </div>
            <Qoute />
        </div>
        
        </>
       
    )
}
