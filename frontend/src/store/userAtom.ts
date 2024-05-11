import axios from "axios";
import { atom, selector , useSetRecoilState } from "recoil";
import { BACKEND_URL } from "../config";
import { User } from "../interfaces";



export const userAtom = atom<User  >({
    key:"userAtom",
    default: {}
})
export const authAtom = atom <string|null>({
    key:"authAtom",
    default:localStorage.getItem('token') 
})
 
export const activeUserAtom = selector<User>({
    key:'activeUserAtom',
    get: async ({})=>{
 
            const token = localStorage.getItem('token');
            debugger
            let user ={};
            let setUser= useSetRecoilState(userAtom);
    
            if(token){
                try {
                 const res = await axios.get(BACKEND_URL+'/user/me',{headers:{
                        Authorization: 'Bearer ' + token
                      }});
                   
            const user = res.data.user;
                setUser(res.data.user)
                return user;
                } catch (error) {
                    // debugger
                    // setUser({})
                    // // console.log(error)
                 } 
              
                }
         
          return user ;
     
       
    }
  })
 