import { useRecoilState, useRecoilValue } from "recoil"
 
import { memo, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { alertAtom } from "../store/alertAtom";

 
export const SweetAlert = memo(()=>{
    const [alerts,setAlert]= useRecoilState(alertAtom);
    const [animation,setAnimation] = useState("")
        useEffect(()=>{
           
               let timerId: any;
               setAnimation('animate-fade-down');
        if (alerts.length > 0) {
            timerId = setTimeout(() => {
                const newAlerts = alerts.slice(1);
                setAnimation('animate-jump-out');
                setAlert(newAlerts);
            }, 5000);
        }

        return () => {
            clearTimeout(timerId);
        }
    
        },[alerts,setAlert])
 

        return alerts.length>0 &&<div className={`absolute top-0   w-screen flex justify-center items-start animate ${animation} animate-duration-1000 animate-once`}>
                    <div className="space-y-2 ">
                    {alerts.map((alert)=>{
                       return  <div   key={uuidv4()}  className={`${alert.bgColor} rounded-b-lg p-2 text-white`}> {alert.msg}</div>
                        })}
                    </div>
                </div>

})