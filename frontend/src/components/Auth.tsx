import { useAuth } from "../hooks/apis";
import { Signin } from "../pages/Signin";
export const Auth=({children}: any)=>{
    const user = useAuth();
    if(user.state=='hasValue'){
        return Object.keys(user.contents).length > 0 ? children : <Signin/>
    }

}