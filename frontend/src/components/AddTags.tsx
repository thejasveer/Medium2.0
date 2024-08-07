import { RefObject, useEffect, useRef, useState } from "react"
import {  useRecoilState } from "recoil"
import {  tagsAtom ,TagType} from "../store/EditorAtom"
import { useBlogCrud } from "../hooks/apis"
 

export const AddTags = ({blogTags,placeholderId}: {blogTags: any,placeholderId:string}) =>{
    const [input,setInput]  = useState<string>("")
    const [tags, setTags] = useRecoilState<TagType[]>(tagsAtom)
    const [showError,setShowError] = useState(false);
    const [activeTagIndex,setActiveTagIndex ] =useState<number>(-1);
    const inputRef: RefObject<HTMLInputElement>= useRef(null)
    const { updateBlog} = useBlogCrud(placeholderId)
             
    useEffect(()=>{
        console.log(blogTags)
         setTags(blogTags);
      
    },[])
    
    useEffect(()=>{
        updateBlog()
    },[tags])
 

    useEffect(()=>{
        if(activeTagIndex<0) inputRef?.current?.focus() 
            
    },[activeTagIndex])
    function rmTag(tag: TagType)
    { 
       const index = tags.findIndex((t: TagType) => t.tag == tag.tag)
        const newTags = [...tags]
        newTags.splice(index,1)
        setTags(newTags )
        setActiveTagIndex(-1)
        return;
    }   
    
    
    function handleKeyDown(e: any){
        console.log("yes1")
        e.stopPropagation()
        if(input!=""){
            if (e.key === 'Enter') {
                const tag: TagType = {
                    tag: e.target.value,
                     }
                const index = tags.findIndex((t: TagType) => t.tag == tag.tag)
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
        if (e.key === 'Backspace' && input.length==0) {
                console.log("yes")
            if (tags.length > 0) {
                const lastTagIndex = tags.length - 1;
               
                if(lastTagIndex=== activeTagIndex){
                    const newTags = [...tags.slice(0, lastTagIndex)];
                 
                    setTags(newTags);
                }else{
                    const updatedTags = tags.map((tag, index) => {
                        if (index === lastTagIndex) {
                           setActiveTagIndex(lastTagIndex) // Update active property of the last tag
                        }
                        return tag;
                    });
                     setTags(updatedTags);
                }
               
                
              
            }
        }else{
            setActiveTagIndex(-1)
        }
        if(e.target.value!='') setActiveTagIndex(-1)
    }
    //   Todo: Add tooltip
    return <div  onClick={()=>{
        setActiveTagIndex(-1)
   

    }} className="min-h-14 max-h-max flex gap-1 flex-wrap items-center border border-slate-300 bg-slate-100  p-3">
        {tags.length>0 && 
        tags.map((tag,i)=>(
            
                    <Tag key={Math.random()*10000} active={i==activeTagIndex}  tag={tag} onClick={rmTag}/>
                 
              ))  
        } 

         {tags.length < 5  &&
                <div className="flex flex-col relative">
                    <div >
                      <input ref={inputRef} className="border-none bg-transparent p-2  text-xs outline-none" onKeyDown={handleKeyDown} onChange={e=> setInput(e.target.value)} placeholder="Add a topic..."/>
                    {showError&& <div className="  p-1 absolute text-xs max-w-max top-12 bg-white rounded-md text-slate-500 border  ">You already added this tag </div>
                    } 
                        </div>        
                </div>
  }   
    </div>
}

const  Tag = ({tag,onClick,active}: {tag: TagType, onClick: any,active:boolean})=> {
    return <div className={` rounded-md  px-2 py-1 text-sm ${ active? 'bg-green-700 text-white ':'bg-white'} `}>
        {tag.tag}
    <button   className="px-1" onClick={()=>{
    onClick(tag)}}> &times;</button> </div>
}

 