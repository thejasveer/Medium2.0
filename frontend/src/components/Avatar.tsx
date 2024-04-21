import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../store/userAtom";

export function Avatar({name,size="size-8",text="text-lg",showlogout=false}: {name: string, size?: string,text?:string,showlogout?:boolean}){
 console.log(showlogout)
    name = name[0];
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userAtom)
   
    const handleLogout = ()=>{
        localStorage.setItem("token","")
        setUser({})
        navigate("/signin")
    }

return   <div className={`relative group  cursor-pointer flex items-center justify-center  ${size}   bg-red-400 rounded-full `}>
<span className={`font-medium ${ text} text-slate-100  `}>{name}</span>
{showlogout?<span onClick={handleLogout} className='cursor-pointer  group-hover:visible invisible  absolute  top-8 p-1 text-sm  right-1 bg-white text-black border rounded-md   '>logout </span>
        :""} 
</div> 

}