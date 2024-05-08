import { useRecoilValue } from "recoil";
import { useFormatDate } from "../hooks/apis";
import { TagType, reviewToggleAtom } from "../store/EditorAtom";
import { Avatar } from "./Avatar";
import { RenderHtml } from "./RenderHtml";
import { ReadingListIcon } from "./ReadingListIcon";
import { memo, useEffect, useState } from "react";
import { ImageIO } from "./ImageIO";
import { Blog } from "../interfaces";
import { Claps } from "./Claps";
 
export const Fullblog =memo(({blog } : {blog:Blog})=>{
 
  const [date,setDate]= useState('');
  const reviewToggle = useRecoilValue(reviewToggleAtom)
  useEffect(()=>{
    const d = useFormatDate(blog?.createdAt|| '=')
    setDate(d)
 },[setDate,blog?.createdAt,])
  
    return  <div className="flex justify-center p-10  ">
            <div className="  w-full  max-w-screen-lg p-3 space-x-11 sm:p-5" >
                <div className={`flex flex-col gap-7  `}>
                        <div className="grid grid-cols-12 "><div  className="col-span-11 text-4xl md:text-5xl font-bold max-w-2xl break-words capitalize">{blog.title} </div> <div className="col-span-1 flex justify-end">
                       
                       </div>
                        
                           </div>
                        <div className=" flex gap-5  items-end">
                            <div className=" flex jusitfy-center items-center"><Avatar size={"size-12"} name={blog.author.name}  text=""/></div>
                            <div className=" ">
                            <div className="text-2xl font-light capitalize">{blog.author.name}</div>
                            
                            <div className= "text-sm font-light text-slate-500">
                                {`${Math.ceil(blog.content?.length/100)} mins read`}
                            </div>
                            </div>
                            <div className="text-slate-400   text-sm ">Postesd on {date}</div>
                          
                           
                        </div>
                 { !reviewToggle &&  <div className="  border-slate-200  flex justify-between p-3 h-max border-t border-b font-light ">
                    <div>
                      <Claps id={blog.id} />
                    </div>
                    <ReadingListIcon col={false} id={blog.id}/>
                    </div>}
                  
                    <ImageIO imgSrc={blog.img} placeholderId={blog.id}/> 
                    <div className="text-xl leading-10  text-slate-700 ">< RenderHtml  html={blog.content}/></div>
                    <Tags tags={blog.tags}/>
                    { !reviewToggle &&  <div className="  border-slate-200  flex justify-between p-3 h-max border-t border-b font-light ">
                    <div>
                      <Claps id={blog.id} />
                    </div>
                    <ReadingListIcon col={false} id={blog.id}/>
                    </div>}

                    <div className="p-5 rounded-lg w-full bg-slate-100 flex flex-col text-3xl gap-5 font-semibold font-sans">
                    <Avatar size={"size-12"} name={blog.author.name}  text=""/>
                    <div>Written by:<span className="capitalize"> {blog.author.name} </span> </div>
                    </div>


                   
                </div>
                
        
            
         </div>
    </div>
   
         
})

const Tags = ({tags}: {tags: TagType[]})=>{


  return   tags.length>0 && <div className="flex  gap-2">
          {tags.map((tag,i)=>{
        return <div key={i} className="bg-gray-200 text-light text-center rounded-full p-2 text-sm w-max overflow-hidden px-3 ">
              <span>{ tag.tag}</span>
            </div> 
        })}
  </div>
 
}