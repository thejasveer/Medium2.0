import { ChangeEvent } from "react"
interface props {
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const TitleEditor=({onchange }: props)=>{


    return<div className="flex items-center -mx-14 ">
       <span className="px-3">Title </span> <input onChange={onchange}  type="text" placeholder="Title" className="px-3 font-serif  text-5xl focus:outline-none text-slate-800 placeholder:text-slate-300 border-l-2 border-slate-400 " />
    </div>
}