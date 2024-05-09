import { Link,   useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authAtom, userAtom } from "../store/userAtom";
import {   useState } from "react";
import { PopUpDiv } from "./PopUpDiv";
  

export function Avatar({name="Ano",size="size-8",text="text-lg",showlogout=false}: {name?: string, size?: string,text?:string,showlogout?:boolean}){
 
    const initial = name[0];
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userAtom)
   const setAuthenticated = useSetRecoilState(authAtom)
   const [showDropdown,setShowDrowpdown] = useState(false)
 
    const handleLogout = ()=>{
        localStorage.removeItem("token")
        setAuthenticated(null)
        setUser({})
        navigate("/signin")
    }
 

return   <div onClick={()=>setShowDrowpdown(!showDropdown)} className={`relative group  cursor-pointer flex items-center justify-center  ${size} first: bg-red-500 rounded-full `}>
<div className={`font-medium ${ text} text-slate-100  `}>{initial}</div>
{showlogout?  <Dropdown onClick={handleLogout} name={name} showDropdown={showDropdown}/>  
                           :""} 
</div> 

}

const Dropdown=({onClick,name,showDropdown}: {onClick: any,name: string,showDropdown:boolean})=>{
    const location = useLocation()
    const {pathname}= location;
    const active= " text-slate-700 font-semibold"
    return <PopUpDiv showDropdown={showDropdown}>
        <div className="space-y-3 border-b p-5 ">
            <Link to={`/@${name}`}>
            <div className={`${pathname.includes(name) && active} flex gap-2 items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <div>Profile</div>

            </div>
            </Link>
            

        </div>
        <div onClick={onClick} className="p-5 space-y-2 hover:text-slate-700 hover:font-light">
            <div>
                Sign out
            </div>
            <div className="flex items-center ">
                <span>{name[0]}{name[1]}</span><span className="flex items-center">*******@gmail.com</span>
            </div>
        </div>

    </PopUpDiv>
}

