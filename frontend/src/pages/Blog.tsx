import { useParams } from "react-router-dom"
import { Fullblog } from "../components/Fullblog";
import { Loading } from "../components/Loading";
import { useBlog } from "../hooks/apis";
 
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
