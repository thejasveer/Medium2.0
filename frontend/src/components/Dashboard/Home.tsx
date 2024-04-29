import {  useRecoilValueLoadable } from "recoil"
 
import { myBlogsAtom } from "../../store/blogAtoms";
import { Loading } from "../Loading";
import { BlogsHtml } from "../../pages/Blogs";

export const Home= ()=>{

    const blogs = useRecoilValueLoadable(myBlogsAtom)
 
    
        if(blogs.state=="loading"){
            return <Loading/>
        }
        if(blogs.state=="hasValue"){
 
 
        return <div className="mt-5">
               <BlogsHtml blogs={blogs.contents}/>
        </div>
        }
 
}