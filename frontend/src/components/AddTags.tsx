import { useState } from "react"
import { useRecoilState } from "recoil"
import { tagsAtom } from "../store/EditorAtom"
 
interface Tag{
    title:string
}
export const AddTags = () =>{
    const [tags, setTags] = useRecoilState(tagsAtom)
    const [showError,setShowError] = useState(false)

    function rmTag(tag: Tag)
    { 
       const index = tags.findIndex((t: Tag) => t.title == tag.title)
        const newTags = [...tags]
        newTags.splice(index,1)
        setTags(newTags )
        return;
    }   
    function addTag(e: any){
        if(e.target.value.length>0){
            if (e.key === 'Enter') {
                const tag: Tag = {
                    title: e.target.value
                }
                const index = tags.findIndex((t: Tag) => t.title == tag.title)
               if(index<0){
                setTags([...tags,tag])
                e.target.value=""
               } else{
                setShowError(true);
                setTimeout(()=>{
                    setShowError(false);
                },3000)
               }
                
              }
           
        }
    }
    //   Todo: Add tooltip
    return <div className="min-h-14 max-h-max flex gap-1 flex-wrap items-center border border-slate-300 bg-slate-100  p-3">
        {tags.length>0 && 
        tags.map((tag,i)=>(
                    <Tag key={Math.random()*10000} tag={tag} onClick={rmTag}/>
        )) 
        } 

         {tags.length <5 &&
                <div className="flex flex-col relative">
                      <input className="border-none bg-transparent p-2  text-xs outline-none" onKeyDown={addTag} placeholder="Add a topic"/>
               {showError&& <div className="p-1 absolute text-xs max-w-max top-12 bg-white rounded-md text-slate-400 border  ">You already added this tag </div>
               } 
                </div>        
  }   
    </div>
}

function Tag({tag,onClick}: {tag: Tag, onClick: any}){
    return <div className="rounded-md bg-white px-2 py-1 text-sm ">
        {tag.title}
<button   className="px-1" onClick={()=>{
    console.log("Dwdw")
    onClick(tag)}}> &times;</button> </div>
}