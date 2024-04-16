import { ChangeEvent } from "react"

interface LabelledInputType{
    label:  string
    placeholder: string
    type: string
    value: string
    onchange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Input = ({label, onchange,placeholder,type,value}: LabelledInputType)=>{

    return <div className="flex flex-col gap-2 mb-5">
        <label className="font bold  ">
            {label}
        </label>
        <input placeholder={placeholder} value={value} type={type} onChange={onchange} className=" p-2 border rounded-md"/>

    </div>
}