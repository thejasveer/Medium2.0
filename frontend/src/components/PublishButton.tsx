import { MouseEvent } from "react";

interface props{
    text: string;
    onclick: (e: MouseEvent<HTMLButtonElement>) => void
}
export const PublishButton = ({text,onclick}: props)=>{

    return <button onClick={onclick} className="bg-green-700 px-3 text-sm py-1 text-white rounded-full"> 
                {text}
            </button>
}