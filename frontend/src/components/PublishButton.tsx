import { MouseEvent, useEffect, useMemo } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { contentAtom, draftState, placeholderIdAtom } from "../store/EditorAtom";
import { ButtonSpinner } from "./ButtonSpinner";

interface props{
    text: string;
    onclick: (e: MouseEvent<HTMLButtonElement>) => void
}
export const PublishButton = ({text,onclick}: props)=>{
    const placeholderId= useRecoilValue(placeholderIdAtom)
   
    const blog = useRecoilValueLoadable(contentAtom(placeholderId))
    
         
        const currDraftState = useRecoilValue(draftState)
    
    

    return  <button
            onClick={onclick}
            className={`bg-green-700 px-3 text-sm py-1 flex gap-2 items-center text-white rounded-full`}
        >
        {text}
        </button>
    ;

}