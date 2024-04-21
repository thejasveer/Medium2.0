import { ChangeEvent, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { contentAtom } from "../store/EditorAtom"
interface props {
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
}
export const TitleEditor=({onchange }: props)=>{
    const [show,setShow]= useState("visible")
    const blog = useRecoilValue(contentAtom)
    useEffect(() =>{
        if(blog.title.length>0)
        {
            setShow("visible")
        }else{
            setShow("invisible")
        }   
    },[blog.title]);

    return<a className="flex items-center -mx-14  ">
     <span className={`px-3 ${show} text-xs text-slate-400 mb-4`}>Title </span> 
       <input onChange={onchange}  
       value={blog.title}
       type="text" placeholder="Title"
        className="  
         caret-slate-400 px-3 font-serif  
         text-5xl focus:outline-none
          text-slate-800 placeholder:text-slate-300 
          border-l-2 border-slate-400 "
           />
    </a>
}