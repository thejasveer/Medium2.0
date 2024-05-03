import { useRecoilValue } from "recoil";
import { useFormatDate } from "../hooks/apis";
import { reviewToggleAtom } from "../store/EditorAtom";
import { Avatar } from "./Avatar";
import { RenderHtml } from "./RenderHtml";
import { ReadingListIcon } from "./ReadingListIcon";
import { memo, useEffect, useState } from "react";
import { ImageIO } from "./ImageIO";
import { Blog } from "../interfaces";
 
export const Fullblog =memo(({blog } : {blog:Blog})=>{
 
  const [date,setDate]= useState('')
  useEffect(()=>{
    const d = useFormatDate(blog?.createdAt|| '=')
    setDate(d)
  },[setDate,blog])
   
    return  <div className="flex justify-center p-10  ">
            <div className="  w-full  max-w-screen-lg p-3  space-x-11 sm:p-5" >
                <div className={`flex flex-col gap-7  `}>
                        <div className="grid grid-cols-12 "><div  className="col-span-10 text-4xl md:text-5xl font-bold max-w-2xl break-words capitalize">{blog.title} </div> <div className="col-span-2"> <ReadingListIcon  id={blog.id}/></div></div>
                        <div className=" flex gap-5  items-end">
                            <div className=" flex jusitfy-center items-center"><Avatar size={"size-10"} name={blog.author.name}  text=""/></div>
                            <div className=" ">
                            <div className="text-2xl font-light capitalize">{blog.author.name}</div>
                            
                            <div className= "text-sm font-light text-slate-500">
                                {`${Math.ceil(blog.content?.length/100)} mins read`}
                            </div>
                            </div>
                            <div className="text-slate-400   text-sm ">Posted on {date}</div>
                          
                           
                        </div>
                  
                    <ImageIO imgSrc={blog.img} placeholderId={blog.id}/> 
                    <div className="text-xl leading-10  text-slate-700 ">< RenderHtml  html={blog.content}/></div>
                </div>
                
        
            
         </div>
    </div>
   
         
})