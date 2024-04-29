import { useRecoilState, useRecoilValue } from "recoil"
import { errorAtom } from "../store/errorAtoms"
import { memo, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export const SweetErrors = memo(()=>{
    const [errors,setErrors]= useRecoilState(errorAtom);
    const [animation,setAnimation] = useState("")
        useEffect(()=>{
               let timerId: number;
               setAnimation('animate-fade-down');
        if (errors.length > 0) {
            timerId = setTimeout(() => {
                const newErrors = errors.slice(1);
                setAnimation('animate-jump-out');
                setErrors(newErrors);
            }, 5000);
        }

        return () => {
            clearTimeout(timerId);
        }
    
        },[errors,setErrors])
 

        return errors.length>0 &&<div className={`absolute top-0   w-screen flex justify-center items-start animate ${animation} animate-duration-1000 animate-once`}>
                    <div className="space-y-2 ">
                    {errors.map((error)=>{
                       return  <div   key={uuidv4()}  className="bg-red-400 rounded-b-lg p-2 text-white"> {error.msg}</div>
                        })}
                    </div>
                </div>

})