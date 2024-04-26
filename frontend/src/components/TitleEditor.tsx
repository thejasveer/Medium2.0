import { ChangeEvent, useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil"
import { contentAtom, placeholderIdAtom } from "../store/EditorAtom"
import { useParams } from "react-router-dom"
interface props {
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
 
}
export const TitleEditor=({onchange }: props)=>{
 
    const [show,setShow]= useState("visible")
    const placeholderId= useRecoilValue(placeholderIdAtom)
    const blog = useRecoilValueLoadable(contentAtom(placeholderId))
    useEffect(() =>{
 
        if(blog.contents.title!="")
        {
            setShow("visible")
        }else{
            setShow("invisible")
        } 
 
     
    },[blog]);
  
 
    return (
        <a className="flex items-center -mx-14">
            <span className={`px-3 ${show} text-xs text-slate-400 mb-4`}>Title</span>
            <input
                onChange={onchange}
                value={blog.contents.title}
                type="text"
                placeholder="Title"
                className="caret-slate-400 px-3 font-serif text-5xl focus:outline-none text-slate-800 placeholder:text-slate-300 border-l-2 border-slate-400"
            />
        </a>
    );
}