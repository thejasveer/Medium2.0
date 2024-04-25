import { MouseEvent } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { contentAtom, placeholderIdAtom } from "../store/EditorAtom";

interface props{
    text: string;
    onclick: (e: MouseEvent<HTMLButtonElement>) => void
}
export const PublishButton = ({text,onclick}: props)=>{
    const placeholderId= useRecoilValue(placeholderIdAtom)
    const blog = useRecoilValueLoadable(contentAtom(placeholderId))
 
    if(blog.state!="loading"){
        return blog.contents?.title!==''&& blog.contents?.content!=''?<button onClick={onclick} className="bg-green-700 px-3 text-sm py-1 text-white rounded-full"> 
        {text}
        </button>: <button  className="invisible bg-green-700 px-3 text-sm py-1 text-white rounded-full"> 
            {text}
        </button>
    }

}