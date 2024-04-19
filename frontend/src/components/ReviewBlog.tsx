import { useSetRecoilState , useRecoilValue} from "recoil"
import { blogAtom } from "../store/blogAtoms"
import { contentAtom, reviewToggleAtom } from "../store/EditorAtom"
import { AddTags } from "./AddTags"
import { Fullblog } from "./Fullblog"
import { PublishButton } from "./PublishButton"

export const ReviewBlog = () =>{
    const setReviewToggle= useSetRecoilState(reviewToggleAtom)

    const blog = useRecoilValue(contentAtom)

    function publish(){

    }
    return <div className="flex justify-center absolute h-screen bg-white top-0 w-full  ">
            <div className="w-full sm:w-8/12  h-full p-3">
            <button onClick={()=>{setReviewToggle(false)}} className="p-2 flex justify-end w-full  text-3xl font-thin text-slate-400  ">&times;</button>
        <div className="grid grid-cols-12 mt-20 gap-10">
               <div className="col-span-12 md:col-span-6 space-y-2  ">
                 <div className="text-sm text-slate-500 font-semibold">Story Preview </div>
                 <div className="bg-slate-50 rounded-lg ">
                 <Fullblog blog={blog} />
                 </div>
                
                 </div> 
               <div className="col-span-12 md:col-span-6 space-y-3">
                <div className="tetxt=sm text-slate-400">Publishing to: <span className="text-slate-500 font-semibold">Jasveer Singh</span></div>
                
                <div className=" space-y-3">
                    <div className="text-xs">Add or change topics (up to 5) so readers know what your story is about</div>
                    <AddTags/>

                </div>

                <div className="flex gap-2 items-center">
                    <PublishButton text={"Publish Now"} onclick={publish}/>
                    <div className="text-slate-400 text-xs">Make it a draft</div>
                </div>
                </div> 
               <div></div> 
        </div>
            </div>
           </div>
}