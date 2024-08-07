import { ChangeEvent, memo, useEffect, useState } from "react"
 
interface props {
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
}
export const TitleEditor=memo( ({onchange,value }: props)=>{
 
    const [show,setShow]= useState("visible")
    // const placeholderId= useRecoilValue(placeholderIdAtom)
    // const blog = useRecoilValueLoadable(contentAtom(placeholderId))
    useEffect(() =>{
 
        if(value!="")
        {
            setShow("visible")
        }else{
            setShow("invisible")
        } 
 
     
    },[value]);
  
    
    return (
        <a className="flex items-center -ml-12 ">
            <span className={`px-3 ${show}  text-xs text-slate-400   mb-4`}>Title</span>
            <input
                onChange={onchange}
                value={value}
                type="text"
                placeholder="Title"
                className="w-full caret-slate-400 px-3 font-serif text-5xl focus:outline-none text-slate-800 placeholder:text-slate-300 sm:border-l-2 max-h-96 overflow-y-scroll border-slate-400"
            />
        </a>
    );
});