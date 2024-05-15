import {   useEffect, useMemo, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userAtom } from "../store/userAtom"
import { useReadingList } from "../hooks/apis"
import { ButtonSpinner } from "./ButtonSpinner"
 
import { alertAtom } from "../store/alertAtom"
import { useNavigate } from "react-router-dom"

 

export const ReadingListIcon = ({id , col=true}:{id: string,col?:boolean})=>{
 
     const {update,loading} = useReadingList();
     const setAlert= useSetRecoilState(alertAtom)
     const [copiedClass,setCopiedClass]= useState(false)
     const user = useRecoilValue(userAtom)
     const navigate = useNavigate()
       const handleReadingList = ()=>{
        if(Object.keys(user).length>0){
            update(id)
        }else{
            navigate('/signin')
        }
               
        } 
        useEffect(()=>{
            let timerId = setTimeout(()=>{
                setCopiedClass(false)
               },2000)

               return ()=> clearTimeout(timerId)
         
        },[copiedClass])
        const copy = async ()=>{
            setCopiedClass(true)
           
            const domain = window.location.host;
            await navigator.clipboard.writeText(`${domain}/blog/${id}`);
            setAlert([{msg: 'Link copied',bgColor:'bg-black'}])
    }
 
        const exist = useMemo(() => {
           
            const exist = user.list?.some(l => l.post?.id === id);
            return !!exist ; // Convert to boolean
        }, [id, user?.list]);
 


    return     <div className={ `flex ${col ? 'flex-col': ''}  gap-5 text-slate-400`}> 
                        <div className="relative">
                            {copiedClass?   <div className="absolute -ml-16 bg-white animate-fade-left z-10">copied</div> : ''}
                         
                        <svg onClick={copy} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`${copiedClass?'fill-slate-800 size-5 z-20':''} size-6 cursor-pointer `}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                      
                        </svg>
                        </div>
                       

                     {loading ? <ButtonSpinner  /> :    <svg onClick={handleReadingList}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  cursor-pointer ${exist? 'fill-slate-400':''}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>}
                  
                    </div>
          
}
 
 