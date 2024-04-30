import { MouseEvent, useEffect, useMemo, useState } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { contentAtom, draftState, placeholderIdAtom } from "../store/EditorAtom";
import { ButtonSpinner } from "./ButtonSpinner";
import { useLocation, useParams } from "react-router-dom";

interface props{
    text: string;
    onclick: (e: MouseEvent<HTMLButtonElement>) => void
}
export const PublishButton = ({text,onclick}: props)=>{
    const placeholderId= useRecoilValue(placeholderIdAtom)
   const[showPublish,setShowPublish] = useState(true)
    const blog = useRecoilValueLoadable(contentAtom(placeholderId))
    const {pathname} = useLocation();
    useEffect(()=>{
      
        if(blog.state=='hasValue'){
             if(blog.contents.title!=''&& blog.contents.content!=''&& pathname?.includes('edit') )
            {
                setShowPublish(true)
            }  else{
                setShowPublish(false)
            }
        }

    },[blog,pathname])
 

    return   <button
            onClick={showPublish?onclick:()=>{}}
            className={`bg-green-700 px-3 ${!showPublish&&'opacity-50'} text-sm py-1 flex gap-2 items-center text-white rounded-full`}
        >
        {text}
        </button> 
    ;

}