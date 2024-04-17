import { Avatar } from "./BlogCard"

export const Appbar =()=>{
    return<div className=" flex justify-between  p-5 border-b ">
        <div className="flex flex-col items-center"> Medium</div>
        <div> <Avatar  size={"size-10"} text={"text-xl"} name="sing"/></div>
    
    </div>
}