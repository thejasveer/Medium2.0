import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "../components/BlogCard"
import { Loading } from "../components/Loading";
import { useBlogs } from "../hooks/apis"
import { Blog } from "../interfaces";
 

export const Blogs = ()=>{
    const {blogs,getBlogs,loading} = useBlogs();
    useEffect(()=>{
        getBlogs();
    },[])
    return loading ?
        <Loading/>
    : <div className="w-full flex justify-center">
 <BlogsHtml blogs={blogs} />
       
    </div>
}
 export const BlogsHtml = ({blogs}:{blogs: Blog[]})=>{
    return <div className="mt-20 ">{blogs.map(blog =>{
                return <BlogCard key={blog.id}
                                    blog={blog}
                                />
                        
                        })}
            </div> 
     
 }