import { useLocation, useNavigate } from "react-router-dom"
import { PopUpDiv } from "./PopUpDiv"
import { useState } from "react"

export const BlogMenu = ({handleEdit,handleDelete}: {handleEdit: any,handleDelete: any})=>{
    const navigate= useNavigate();

    const [showDropdown,setShowDrowpdown] = useState(false)

    return  <div className="relative">
            <svg onClick={e=> setShowDrowpdown(!showDropdown)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
           
               
            
            {showDropdown?  <Dropdown showDropdown={showDropdown} handleEdit={handleEdit} handleDelete={handleDelete}/>  
                           :""} 
            </div> 
}
    const Dropdown=({showDropdown,handleDelete,handleEdit}: {showDropdown:boolean,handleEdit:any, handleDelete: any})=>{


 
 
    return <PopUpDiv showDropdown={showDropdown}>
        
 
        <div className="space-y-3 border-b p-5 ">
                        <div onClick={handleEdit}>Edit</div>
                    </div>
                    <button onClick={handleDelete} className="p-5 space-y-2 hover:text-slate-700 hover:font-light">
                     Delete story 
                   </button>
                  
                    
                    

    </PopUpDiv>
}
