 
import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react"
import { signinParams } from "@codewithjass/common" 
import { Qoute } from "../components/Qoute"
import { useSignin } from "../utils/apis"
import { Errors } from "../components/Errors"
export const Signin= () =>{
    const [inputs, setInputs] = useState<signinParams>({
        email: "",
        password: "",
    })
    const {errors,loading,signinIn} = useSignin(inputs)
    return (
        <>
        
        <div className="flex ">
            <div className="w-full lg:w-1/2    h-screen flex flex-col justify-center items-center">
                <div className="w-full p-16">
                <Heading text={"Create an account"}></Heading>
                <Subheading text={"Don't have an account?"} link={"Singnup"} />
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
