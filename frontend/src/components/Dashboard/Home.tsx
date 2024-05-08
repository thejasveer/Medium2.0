 
import { Loading } from "../Loading";
import { BlogsHtml } from "../../pages/Blogs";
import {  useEffect, useState } from "react";
 
import { useBlogs } from "../../hooks/apis";
import { useNavigate } from "react-router-dom";

export const Home= ()=>{
    const navigate = useNavigate()
    const { myblogs } = useBlogs();
  
         if(myblogs.state=='loading'){
            return <Loading/>
         }
         if(myblogs.state=='hasValue'){
            if(myblogs.contents.length==0){
                return  <div className="h-dvh"> <div onClick={()=> navigate('/new-story')} className="cursor-pointer flex gap-2 text-slate-500 text-sm text-center items-center justify-center border-dashed border-2 border-slate-300 h-32 mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                 <h3 className="break-normal">Add new stories to your list. </h3>
              
              </div></div>
              
            }
            
            return<div className="mt-5  ">
            <div className="flex justify-center items-center gap-2 text-slate-400">
                <div className="flex gap-1 items-center"> <div className= "bg-green-500  h-2 w-2 rounded-full mx-1 inline-bloc"></div>Publised</div>
                <div className="flex gap-1 items-center"> <div className= "bg-red-500  h-2 w-2 rounded-full mx-1 inline-bloc"></div>Draft</div>
            </div>
           <BlogsHtml showStatus={true} blogs={myblogs.contents}/>
             </div>
            
         }
 
    
 
}