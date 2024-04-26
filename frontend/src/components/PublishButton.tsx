import { MouseEvent, useEffect } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { contentAtom, placeholderIdAtom } from "../store/EditorAtom";

interface props{
    text: string;
    onclick: (e: MouseEvent<HTMLButtonElement>) => void
}
export const PublishButton = ({text,onclick}: props)=>{
    const placeholderId= useRecoilValue(placeholderIdAtom)
    console.log(placeholderId,"button")
    const blog = useRecoilValueLoadable(contentAtom(placeholderId))
    
        const hasValidContent = blog.state === "hasValue" &&
        blog.contents?.title !== '' &&
        blog.contents?.content !== '';
 
    
    

    return hasValidContent&&(
        <button
            onClick={onclick}
            className={`bg-green-700 px-3 text-sm py-1 text-white rounded-full ${!hasValidContent && "invisible"}`}
        >
            {text}
        </button>
    );

}