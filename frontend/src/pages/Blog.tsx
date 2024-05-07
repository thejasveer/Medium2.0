import { useParams } from "react-router-dom"
import { Fullblog } from "../components/Fullblog";
import { Loading } from "../components/Loading";
import { useBlog } from "../hooks/apis";
import { useEffect } from "react";
import { useRecoilStateLoadable } from "recoil";
import { blogAtom } from "../store/blogAtoms";
import { Blog as BlogInterface} from "../interfaces";
 
 
 
export const Blog=()=>{
    const {id}:{ id?: string } = useParams();
   const {blog,loading,getBlog} = useBlog(id)
   
    
    return !loading?
             <Fullblog  blog={blog}/>
         
     :          <Loading/>
     
  
}
