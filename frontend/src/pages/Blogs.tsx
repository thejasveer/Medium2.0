import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "../components/BlogCard"
import { Loading } from "../components/Loading";
import { useBlogs } from "../hooks/apis"
import { Blog } from "../interfaces";
 

export const Blogs = ()=>{
    const {blogs,getBlogs,loading} = useBlogs();
    const ss= blogs;
    useEffect(()=>{
        getBlogs();
    },[])
    return loading ?
        <Loading/>
    : <div className="w-full flex justify-center">
        <BlogsHtml  blogs={ss} />
            
    </div>
}
 export const BlogsHtml = ({blogs,showStatus=false}:{blogs: Blog[],showStatus?: boolean})=>{
 
    return <div className="mt-10 w-full md:w-3/4 h-dvh overflow-auto ">{blogs.map(blog =>{
                return <div  key={blog.id}>
                     {(showStatus) && 
                            (
                                <div className="flex justify-end mt-2">
                                <span className={`${blog.published? 'bg-green-500 ' :'bg-red-500'  } h-2 w-2 rounded-full mx-1 inline-block`}></span>
                               </div> 
                            )
                       
                     } 
                    <BlogCard
                                    blog={blog}
                                />
                </div>
                        
                        })}
            </div> 
     
 }