import { Link } from "react-router-dom"
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
  useEffect(()=>{
    if(userExist){
        
        if(user.userId== blog.author.id){
            setShowActions(true)
        }
      }
    
  },[])

    
  const {update,loading} = useReadingList();
  const handleReadingList = ()=>{
         update(blog.id)
  } 

  const handleEdit =()=>{
    console.log('edit')
  }
  const handleDelete=()=>{
    console.log('delete')
  }

return  <div   className=" gap-1 flex flex-col p-2">
            <Link  key={blog.id}  to={"/blog/"+blog.id}>
                <div className="flex gap-2 items-center ">
                    <div>
                    <Avatar name={blog.author.name||''}  />
                        </div>
                    <div className="font-light capitalize">{blog.author.name}</div>
                    <div className="font-light text-slate-500">- {date}</div>

                </div>
                <div className="font-bold text-xl text-left">
                    {blog.title}
                </div>
                <div className="font-light ">
                <RenderHtml html={blog.content?.slice(0,100)+"..."}/>
                </div>
        </Link>
        

        <div className="flex justify-between py-5">
            <div className="flex space-x-2 items-center">
            <div className="bg-gray-200 text-light text-center rounded-full p-1 text-sm w-max overflow-hidden px-3 ">
                {blog.tags.length>0? <span>{blog.tags[0].tag}</span>:0}
            </div>
            <div className= "text-sm font-light text-slate-500">
                {`${Math.ceil(blog.content?.length/100)} mins read`}
            </div>
           
            </div>
        
        
            <div className="flex space-x-2 text-slate-400">
             <ReadingListIcon handleReadingList={handleReadingList } id={blog.id}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            
                {showActions?<BlogMenu  handleDelete={handleDelete} handleEdit={handleEdit}/>:""}
           
        </div>
          

        </div>
        <hr className="mt-5" />
        </div>
 

}

