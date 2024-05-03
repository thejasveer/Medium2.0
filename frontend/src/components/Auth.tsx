import { useRecoilValue } from "recoil";
import { useAuth } from "../hooks/apis";
import { Signin } from "../pages/Signin";
import { authAtom } from "../store/userAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const Auth=({children}: any)=>{
    const Authenticated = useRecoilValue(authAtom)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!Authenticated){
            navigate('/signin')
        }
    },[])
   
        return (Authenticated) ? children :  <Signin/>
   
  
 

}