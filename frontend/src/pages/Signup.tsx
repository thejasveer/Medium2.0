import { Qoute } from "../components/Qoute"
import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react"
import { signupParams } from "@codewithjass/common"
export const Signup= () =>{
    const [inputs, setInputs] = useState<signupParams>({
        name: "",
        email: "",
        password: "",
    })

    return (
        <>
        
        <div className="flex ">
            <div className="w-full lg:w-1/2 bg-red-500 sm:w-full h-screen flex flex-col justify-center items-center">
                <div>
                <Heading text={"Create an account"}></Heading>
                <Subheading text={"Already have an account?"} />
                <Input label="Username"  type={"text"} placeholder="Enter your username"/>  
                <Input label="Email"  type={"text"} placeholder="Enter your email"/>  
                <Input label="Password"  type={"password"} placeholder="******* "/>  
                <Button text="Sign Up"  ></Button>
                </div>
             
            </div>
            <Qoute />
        </div>
        
        </>
       
    )
}
