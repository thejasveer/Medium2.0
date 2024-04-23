import { useRecoilValue } from "recoil";
import { useFormatDate } from "../hooks/apis";
import { reviewToggleAtom } from "../store/EditorAtom";
import { Avatar } from "./Avatar";
import { RenderHtml } from "./RenderHtml";

interface Blog {
    "id":string;
    "title":string;
    "content": string;
    "published": boolean
    "createdAt": string;
    "author": {
        "name": string
        "description": string; 
    }
}
export const Fullblog =({blog } : {blog:Blog})=>{
    const inReview = useRecoilValue(reviewToggleAtom)
    console.log(inReview)
    const date = useFormatDate(blog.createdAt)
    return  <div className="flex justify-center">
            <div className="grid grid-cols-12  w-full  max-w-screen-lg p-3 sm:p-5" >
                <div className={`order-last sm:order-first col-span-12 ${!inReview?'sm:col-span-8' :'sm:col-span-12'} space-y-2 `}>
                        <div className="text-3xl md:text-4xl font-extrabold max-w-lg break-words">{blog.title}</div>
                            <div className="text-slate-400   text-sm ">Posted on {date}</div>
                            <div className="text-sm text-slate-700">< RenderHtml  html={blog.content}/></div>
                </div>
                
           {!inReview  &&  
           <div className="col-span-12 sm:col-span-4">
           <div className="text-sm px-3">Author</div>
           <div className="grid grid-cols-5 min-h-full p-3">
               <div className="col-span-1 flex jusitfy-center items-center"><Avatar name={blog.author.name}  text=""/></div>
               <div className="col-span-4 ">
                   <div className="text-2xl font-extrabold">{blog.author.name}</div>
                   <div className="text-sm text-slate-400">{blog.author.description}</div>
               </div>
           </div>
       </div> } 
            
         </div>
    </div>
   
         
}