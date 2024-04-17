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

   
    <div className="  max-w-xl mt-20 ">
            {blogs.map(blog =>{
               return <Link  key={blog.id}  to={"/blog/"+blog.id}>
                 <BlogCard

                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.createdAt}
                    />
             </Link> 
            })}
    </div>
    </div>
}