import { Link, useNavigate } from "react-router-dom"
import { useAuth, useFormatDate, useReadingList } from "../hooks/apis"
import { Blog } from "../interfaces"
import { Avatar } from "./Avatar"
import ActiveReadingListIcon, { ReadingListIcon, ReadingListicon } from "./ReadingListIcon"
import { BlogMenu } from "./BlogMenu"
import { RenderHtml } from "./RenderHtml"
import { useEffect, useState } from "react"
 
export const BlogCard=({blog  }: {blog: Blog})=>{
  const date =useFormatDate(blog.createdAt) ;
  const [showActions,setShowActions] = useState(false)
  const {user,userExist}= useAuth();
  const navigate = useNavigate()
  useEffect(()=>{
    if(userExist){
        
        if(user.userId== blog.author.id){
            setShowActions(true)
        }
      }
    
  },[])

 

  const handleEdit =()=>{
    navigate( `/p/${blog.id}/edit`)
  }
  const handleDelete=()=>{
    console.log('delete')
  }

return  <div   className=" gap-1 flex flex-col p-2  ">
          
                <div className="flex gap-2 items-center ">
                    <div>
                    <Avatar name={blog.author.name||''}  />
                        </div>
                    <div className="font-light capitalize">{blog.author.name}</div>
                    <div className="font-light text-slate-500">- {date}</div>
                    {!blog.published || 
                    <svg className="size-7 text-green-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"/>
                    <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"/>
                    </svg>
                    } 

                </div>
                <div className="grid grid-cols-12">
                <div className="font-bold text-xl text-left col-span-11">
                    {blog.title}
                </div>
                  <div className="col-span-1 flex justify-end"><ReadingListIcon  id={blog.id}/>
                  </div>
                
                </div>
               
                <div className="font-light flex flex-col gap-4 ">
                <RenderHtml html={blog.content?.slice(0,100)+"..."}/>   <Link className="mt-4 text-blue-500 focus:outline-none" key={blog.id}  to={blog.published?"/blog/"+blog.id:''}>Read More</Link>
                </div>
    
        

        <div className="flex justify-between py-5">
            <div className="flex space-x-2 items-center">
              {blog.tags.length>0?<div className="bg-gray-200 text-light text-center rounded-full p-1 text-sm w-max overflow-hidden px-3 ">
               <span>{blog.tags[0].tag}</span>
            </div>:''}
            <div className= "text-sm font-light text-slate-500">
                {`${Math.ceil(blog.content?.length/100)} mins read`}
            </div>
           
            </div>
        
        
            <div className="flex space-x-2 text-slate-400">
        
            
                {showActions?<BlogMenu  handleDelete={handleDelete} handleEdit={handleEdit}/>:""}
           
        </div>
          

        </div>
        <hr className="mt-5" />
        </div>
 

}

