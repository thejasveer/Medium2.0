 
import { ChangeEvent } from "react"

interface t {
    text: string
    onclick:  (e: ChangeEvent<HTMLInputElement>)=> void
}
export const Button=({text,onclick}: t)=>{
    
    return <button onClick={onclick} className="p-3 rounded-md w-full  bg-black text-white">{text}</button>
}