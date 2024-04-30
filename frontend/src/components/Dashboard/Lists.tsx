import { useRecoilValue } from "recoil"
import { useAuth } from "../../hooks/apis"
import { userAtom } from "../../store/userAtom"
import { BlogsHtml } from "../../pages/Blogs"
import { BlogCard } from "../BlogCard"

export const Lists=()=>{

    const user = useRecoilValue(userAtom)
 
    
    if(user?.list.length==0){
        return "no"
    }
    

    return <div className="mt-10 h-dvh overflow-scroll">
            {user.list?.map((l)=>{
                return <div >
                    <BlogCard blog={l.post} />
                </div> 
            })}
    </div>
   
}