import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import { userAtom } from "../../store/userAtom"
import { BlogCard } from "../BlogCard";
import { myBlogsAtom } from "../../store/blogAtoms";
import { Loading } from "../Loading";

export const Home= ()=>{

    const blogs = useRecoilValueLoadable(myBlogsAtom)
 
    
    if(blogs.state=="loading"){
        return <Loading/>
    }
 
 
        return <div className="mt-10">
                { blogs.contents.map((blog)=>{
                    return <BlogCard key={blog.id} blog={blog}/> 
                })}
        </div>
    





}