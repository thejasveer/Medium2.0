import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "../components/BlogCard"
import { Loading } from "../components/Loading";
import { useBlogs } from "../hooks/apis"
 

export const Blogs = ()=>{
    const {blogs,getBlogs,loading} = useBlogs();
    useEffect(()=>{
        getBlogs();
    },[])
    return loading ?
        <Loading/>
    : <div className="w-full flex justify-center">

   
    <div className="w-3/4 mt-20 ">
            {blogs.map(blog =>{
               return <Link  key={blog.id}  to={"/blog/"+blog.id}>
                 <BlogCard
                        blog={blog}
                    />
             </Link> 
            })}
    </div>
    </div>
}