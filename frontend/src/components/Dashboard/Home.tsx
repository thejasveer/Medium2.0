 
import { Loading } from "../Loading";
import { BlogsHtml } from "../../pages/Blogs";
import { useEffect, useState } from "react";
 
import { useBlogs } from "../../hooks/apis";

export const Home= ()=>{
    const [page, setPage] = useState(1);
    const { getMyBlogs,myblogs,loading } = useBlogs();
        useEffect(()=>{
            getMyBlogs(page);
         },[page])
 
     return <div className="mt-5  ">
                <div className="flex justify-center items-center gap-2 text-slate-400">
                    <div className="flex gap-1 items-center"> <div className= "bg-green-500  h-2 w-2 rounded-full mx-1 inline-bloc"></div>Publised</div>
                    <div className="flex gap-1 items-center"> <div className= "bg-red-500  h-2 w-2 rounded-full mx-1 inline-bloc"></div>Draft</div>
                </div>
               <BlogsHtml showStatus={true} blogs={myblogs}/>
        </div>
    
 
}