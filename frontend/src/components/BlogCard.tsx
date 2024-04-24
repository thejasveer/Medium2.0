import { Link } from "react-router-dom"
import { useFormatDate, useReadingList } from "../hooks/apis"
import { Blog } from "../interfaces"
import { Avatar } from "./Avatar"
import ActiveReadingListIcon, { ReadingListIcon, ReadingListicon } from "./ReadingListIcon"
import { BlogMenu } from "./BlogMenu"
 
export const BlogCard=({blog , }: {blog: Blog})=>{
  const date =useFormatDate(blog.createdAt) 
    
  const {update,loading} = useReadingList();
  const handleReadingList = ()=>{
         update(blog.id)
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
                    {blog.content?.slice(0,100)}...
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
              <BlogMenu/>
             
        </div>
          

        </div>
        <hr className="mt-5" />
        </div>
 

}

