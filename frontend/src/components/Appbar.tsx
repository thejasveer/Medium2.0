import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar =()=>{
    return<div className=" flex justify-between  p-5 border-b ">
        <div className="flex flex-col items-center"><Link to={'/'}>Medium</Link> </div>
        <div className="grid grid-cols-2 space-x-4">
        
        <Link to={"/publish"} className="col-span-1 flex gap-1 items-center text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 sm:size-8 ">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>

            <span className="text-sm">Write</span>
        </Link>
       
            <div className="col-span-1">
            <Avatar  size={"size-10"} text={"text-xl"} name="sing"/></div>

            </div>
           
    
    </div>
}