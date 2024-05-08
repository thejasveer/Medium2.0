import { useParams } from "react-router-dom"
import { Fullblog } from "../components/Fullblog";
import { Loading } from "../components/Loading";
import { useBlog } from "../hooks/apis";
import { useEffect } from "react";
import { useRecoilStateLoadable, useSetRecoilState } from "recoil";
import { BlogTrigger, blogAtom } from "../store/blogAtoms";
import { Blog as BlogInterface} from "../interfaces";
 
 
 
export const Blog=()=>{
    const {id}:{ id?: string } = useParams();
   
   const {blog} = useBlog(id)
 
    if(blog.state=="loading"){
        return   <Loading/>
    }
    if(blog.state=="hasValue"){
        return <Fullblog  blog={blog.contents}/>
    }
  
  
}
