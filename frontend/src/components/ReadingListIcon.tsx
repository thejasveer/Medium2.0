import { useEffect, useMemo } from "react"
import { useRecoilValue } from "recoil"
import { userAtom } from "../store/userAtom"
import { useReadingList } from "../hooks/apis"

 

export const ReadingListIcon = ({id}:{id: string})=>{
     const {list} = useRecoilValue(userAtom)
     const {update,loading} = useReadingList();
        const handleReadingList = ()=>{
                update(id)
        } 
 
        const exist = useMemo(() => {
            const exist = list?.some(l => l.post.id === id);
            return !!exist ; // Convert to boolean
        }, [id, list]);
 


    return     <div className="flex flex-col gap-5 text-slate-400"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
               <svg onClick={handleReadingList}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6  cursor-pointer ${exist? 'fill-slate-400':''}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                    </div>
          
}

 