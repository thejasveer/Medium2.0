import { Link, useLocation } from "react-router-dom"
import {  useRecoilValue, useSetRecoilState } from "recoil";
import {  draftState, reviewToggleAtom } from "../store/EditorAtom";
import { Avatar } from "./Avatar"
import { PublishButton } from "./PublishButton";
import { authAtom, userAtom} from "../store/userAtom";
 
import { searchToggleAtom } from "../store/searchAtom";
import { useAuth } from "../hooks/apis";
 
 
 
export const Appbar =()=>{
    const location = useLocation()
    const {pathname} = location;
    const setReviewToggle = useSetRecoilState(reviewToggleAtom)
    const authenticated = useRecoilValue(authAtom)
    const currDraftState = useRecoilValue(draftState)
    const  setShowSearch  = useSetRecoilState(searchToggleAtom)
      const {}= useAuth();
    const user  = useRecoilValue(userAtom)
    return(<div className=" flex justify-between px-3 py-3  md:px-20 border-b ">
        <div className=" flex gap-5 items-center">
            <Link to={'/'}>
                <svg className="svgIcon-use" height="25" viewBox="0 0 1043.63 592.71"><g data-name="Layer 2"><g data-name="Layer 1"><path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36"></path><path d="M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279"></path><path d="M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path></g></g></svg></Link> 
            { pathname.includes("/edit") || pathname.includes("new-story") ? <div className="mx-2 font-light text-sm capitalize">Draft in {user?.username}  </div>
            :<div  onClick={()=>{setShowSearch(true)}} >
                  <svg onClick={()=>{setShowSearch(true)}} className="block sm:hidden size-5 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <div className="relative hidden sm:block" >
            <div   className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg onClick={()=>{setShowSearch(true)}} className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search"
            onClick={()=>{setShowSearch(true)}}
            className=" block focus:ring-0  outline-none   w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  " placeholder="Search" required />
            <button type="submit" className=" text-slate-400 absolute end-2.5 bottom-0.5      font-medium rounded-lg text-sm px-4 py-2">⌘k</button>
        </div>
            </div>
         
            
            } 
            { currDraftState!= ''   && <div className="mx-2 font-light text-sm capitalize"><span>{currDraftState}</span> </div> } 
            </div>
    
                <div className="grid grid-cols-2 gap-1 lg:gap-2  items-center">
                        <div className="font-light px-2 col-span-1">
                            { pathname.includes("edit") || pathname.includes("new-story") ?  <PublishButton text={"publish"} onclick={()=>{ setReviewToggle(true)}}/>
                                :       <Link to={"/new-story"} className="flex gap-1 items-center w-full text-light text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.} stroke="currentColor" className="size-7 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                <span className="text-sm text-light">Write</span>
                            </Link>}
                
                        </div>
            

                        { (authenticated) ?   
                                    <div className="col-span-1 flex justify-center   ">
                                    <Avatar  size={"size-8"} text={"text-xl"} name={user.username} showlogout={true}/>
                                    </div>
                                    :
                                    <div className="col-span-1 flex gap-2 space-x-2 lg:space-x-4 text-slate-400">
                                        <Link to={"/signup"}>
                                             <button  className="hidden lg:block"> 
                                        Sign up
                                        </button></Link>
                                         <Link to={"/signin"}> 
                                        <button className=" bg-green-700 px-3 text-sm py-1 text-white rounded-full"> 
                                            Sign in
                                        </button>
                                        </Link>
                                    </div>
                        }
                </div>   
         
           
    
        </div>)
    } 