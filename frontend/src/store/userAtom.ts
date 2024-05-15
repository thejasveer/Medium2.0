import axios from "axios";
import { atom, selector  } from "recoil";
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
        let user ={};
 
    
            if(token){
       
                 const res = await axios.get(BACKEND_URL+'/user/me',{headers:{
                        Authorization: 'Bearer ' + token
                      }});
                   
                    const user = res.data.user;
                   
                        return user;
              
              
                }
         
          return user ;
     
       
    }
  })
 