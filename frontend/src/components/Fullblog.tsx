import { useFormatDate } from "../hooks/apis";
import { Avatar } from "./BlogCard";

interface Blog {
    "id":string;
    "title":string;
    "content": string;
    "published": string
    "createdAt": string;
    "author": {
        "name": string
        "description": string; 
    }
}
export const Fullblog =({blog} : {blog:Blog})=>{
    const date = useFormatDate(blog.createdAt)
    return  <div className="flex justify-center">
            <div className="grid grid-cols-12  w-full  max-w-screen-lg p-3 sm:p-10" >
            <div className="order-last sm:order-first col-span-12 sm:col-span-8 space-y-2 ">
                    <div className="text-xl sm:text-4xl font-extrabold max-w-lg">{blog.title}</div>
                        <div className="text-slate-400   text-sm ">Posted on {date}</div>
                        <div className="text-sm text-slate-700">{blog.content}</div>
             </div>
                
            <div className="col-span-12 sm:col-span-4">
                <div className="text-sm px-3">Author</div>
                <div className="grid grid-cols-5 min-h-full p-3">
                    <div className="col-span-1 flex jusitfy-center items-center"><Avatar name={blog.author.name}  text=""/></div>
                    <div className="col-span-4 ">
                        <div className="text-2xl font-extrabold">{blog.author.name}</div>
                        <div className="text-sm text-slate-400">{blog.author.description}</div>
                    </div>
                </div>
            </div>
            
         </div>
    </div>
   
         
}