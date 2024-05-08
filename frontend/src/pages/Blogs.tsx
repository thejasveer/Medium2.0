import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "../components/BlogCard"
import { Loading } from "../components/Loading";
import { useBlogs } from "../hooks/apis"
import { Blog } from "../interfaces";
 

export const Blogs = ()=>{
    const {blogs} = useBlogs();
    
    if(blogs.state=='loading'){
        return <Loading/>
    }
    if(blogs.state=='hasValue'){
        return     <div className="w-full flex justify-center  ">
        <div className=" md:w-2/3"> <BlogsHtml  blogs={blogs.contents} /></div>
      </div>
    }
     

}
 export const BlogsHtml = ({blogs,showStatus=false}:{blogs: Blog[],showStatus?: boolean})=>{
 
    return <div className="mt-10 w-full h-dvh overflow-auto ">{blogs.map(blog =>{
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