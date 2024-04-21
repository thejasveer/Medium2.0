import { MouseEvent } from "react";
import { useRecoilValue } from "recoil";
import { contentAtom } from "../store/EditorAtom";

interface props{
    text: string;
    onclick: (e: MouseEvent<HTMLButtonElement>) => void
}
export const PublishButton = ({text,onclick}: props)=>{
    const blog = useRecoilValue(contentAtom)
    
    return blog.title!==''&& blog.content!=''?<button onClick={onclick} className="bg-green-700 px-3 text-sm py-1 text-white rounded-full"> 
                {text}
            </button>: <button  className="invisible bg-green-700 px-3 text-sm py-1 text-white rounded-full"> 
                {text}
            </button>
}