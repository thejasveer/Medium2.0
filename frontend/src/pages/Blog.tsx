import { useParams } from "react-router-dom"
import { Fullblog } from "../components/Fullblog";
import { Loading } from "../components/Loading";
import { useBlog } from "../hooks/apis";
 
 
 
export const Blog=()=>{
    const {id}:{ id?: string } = useParams();
    const {blog} = useBlog(id);
    return blog.state!="hasValue" ?
       <Loading/>
    :
     <Fullblog  blog={blog.contents}/>
  
}
