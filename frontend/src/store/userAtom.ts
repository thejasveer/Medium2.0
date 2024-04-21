import axios from "axios";
import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";
import { BACKEND_URL } from "../config";

interface User{
    userId?:string
    username?:string
    email?:string
}
export const userAtom = atom<User  >({
    key:"userAtom",
    default: {}
})

export const activeUserAtom = selector({
    key:'activeUserAtom',
    get: async ({get})=>{
        const token = localStorage.getItem('token');
       
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
                setUser({})
                console.log(error)
             } 
          
            }
     
      return user ;
    }
  })