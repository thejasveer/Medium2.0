import { useRecoilValue } from "recoil"
import { useAuth } from "../../hooks/apis"
import { userAtom } from "../../store/userAtom"
import { BlogsHtml } from "../../pages/Blogs"
import { BlogCard } from "../BlogCard"

export const Lists=()=>{

    const user = useRecoilValue(userAtom)
 
    
    if(user.list && user.list.length==0){
        return <div className="flex text-slate-500 text-sm text-center items-center justify-center border-dashed border-2 border-slate-300 h-32 mt-10">
        <h3 className="break-normal">Add your favorite stories to your list. Simply click the <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline-block w-4 h-4 mx-1"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/></svg> on any Medium story to get started.</h3>
      </div>
      
    }
    

    return <div className="mt-10 h-dvh overflow-scroll">
            {user.list?.map((l)=>{
                return <div key={l.id}>
                    <BlogCard blog={l.post} />
                </div> 
            })}
    </div>
   
}