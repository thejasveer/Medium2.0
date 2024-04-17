import { useFormatDate } from "../hooks/apis";

interface Blog {
    "id":string;
    "title":string;
    "content": string;
    "published": string
    "createdAt": string;
    "author": {
        "name": string
    }
}
export const Fullblog =({blog} : {blog:Blog})=>{
    const date = useFormatDate(blog.createdAt)
    return  <div className="flex justify-center">
            <div className="grid grid-cols-12  w-full  max-w-screen-lg" >
            <div className=" col-span-8">
                    <div className="text-3xl font-extrabold max-w-lg">{blog.title}</div>
                    <div className="text-slate-400 font-thin text-sm ">Posted on {date}</div>
                </div>
                
            <div className=" bg-blue-500 col-span-4">{blog.title}</div>
            
         </div>
    </div>
   
         
}