import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/userAtom";
  

export function Avatar({name,size="size-8",text="text-lg",showlogout=false}: {name: string, size?: string,text?:string,showlogout?:boolean}){
 
    name = name[0];
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userAtom)
   
    const handleLogout = ()=>{
        localStorage.setItem("token","")
        setUser({})
        navigate("/signin")
    }

return   <div className={`relative group  cursor-pointer flex items-center justify-center  ${size} first: bg-red-400 rounded-full `}>
<span className={`font-medium ${ text} text-slate-100  `}>{name}</span>
{showlogout?<span onClick={handleLogout} className='cursor-pointer  group-hover:visible  visible  absolute  top-10 right-1  z-20 shadow-md'><Dropdown onClick={handleLogout} name={name}/> </span>
        :""} 
</div> 

}

const Dropdown=({onClick,name}: {onClick: any,name: string})=>{
    const location = useLocation()
    const {pathname}= location;
    const active= " text-slate-700 font-semibold"
    return <div className="h-max  text-slate-500 font-light rounded-md  border bg-white w-max min-w-60 text-sm ">
        <div className="space-y-3 border-b p-5 ">
            <Link to={`/@${name}`}></Link>
            <div className={`${pathname.includes(name) && active} flex gap-2 items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <div>Profile</div>

            </div>

        </div>
        <div onClick={onClick} className="p-5 space-y-2 hover:text-slate-700 hover:font-light">
            <div>
                Sign out
            </div>
            <div className="flex items-center ">
                <span>{name[0]}{name[1]}</span><span className="flex items-center">*******@gmail.com</span>
            </div>
        </div>

    </div>
}