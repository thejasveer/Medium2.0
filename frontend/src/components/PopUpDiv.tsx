export const PopUpDiv = ({children,showDropdown}: any)=>{


    
    return <div  className={`cursor-pointer
      ${showDropdown?'visible':'invisible'} 
       absolute  top-10 right-1 
        z-20 shadow-lg   h-max  text-slate-500 font-light rounded-md  border bg-white w-max min-w-60 text-sm `}>
        {children}
    </div>
}