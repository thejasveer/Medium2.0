import { useFormatDate, useReadingList } from "../hooks/apis"
import { Blog } from "../interfaces"
import { Avatar } from "./Avatar"
 
export const BlogCard=({blog , author=true}: {blog: Blog,author: boolean})=>{
  const date =useFormatDate(blog.createdAt) 
    
  const {update,loading} = useReadingList();
  const handleReadingList = ()=>{
         update(blog.id)
  }

return <div   className=" gap-1 flex flex-col p-2">
        <div className="flex gap-2 items-center ">
            <div>
              <Avatar name={blog.author.name||''}  />
                </div>
            <div className="font-light">{blog.author.name}</div>
            <div className="font-light text-slate-500">- {date}</div>

        </div>
        <div className="font-bold text-xl text-left">
            {blog.title}
        </div>
        <div className="font-light ">
            {blog.content?.slice(0,100)}...
        </div>

        

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
            <svg onClick={handleReadingList}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        </div>
          

        </div>
        <hr className="mt-5" />
        
</div>

}

