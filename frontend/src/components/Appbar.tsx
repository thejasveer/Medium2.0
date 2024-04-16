import { Avatar } from "./BlogCard"

export const Appbar =()=>{
    return<div className=" flex justify-between  p-5 border-b ">
        <div className="flex flex-col items-center"> Medium</div>
        <div> <Avatar  size={8} name="sing"/></div>
    
    </div>
}