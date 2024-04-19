import { ChangeEvent, useEffect, useState } from "react"
interface props {
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
}
export const TitleEditor=({onchange,value }: props)=>{
    const [show,setShow]= useState("visible")
    useEffect(() =>{
        if(value.length>0)
        {
            setShow("visible")
        }else{
            setShow("invisible")
        }   
    },[value]);

    return<a className="flex items-center -mx-14  ">
     <span className={`px-3 ${show} text-xs text-slate-400 mb-4`}>Title </span> 
       <input onChange={onchange}  
       type="text" placeholder="Title"
        className="  
         caret-slate-400 px-3 font-serif  
         text-5xl focus:outline-none
          text-slate-800 placeholder:text-slate-300 
          border-l-2 border-slate-400 "
           />
    </a>
}