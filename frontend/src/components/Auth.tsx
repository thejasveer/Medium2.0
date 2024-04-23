import { useRecoilValue } from "recoil";
import { useAuth } from "../hooks/apis";
import { Signin } from "../pages/Signin";
import { authAtom } from "../store/userAtom";
export const Auth=({children}: any)=>{
    const Authenticated = useRecoilValue(authAtom)
    return (Authenticated) ? children : <Signin/>
 

}