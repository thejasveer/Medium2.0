 
 
import { useEffect, useRef, useState } from 'react';
import {  useRecoilStateLoadable, useRecoilValue, useSetRecoilState } from 'recoil';
import {ContentEditor} from '../components/Editor';
import { ReviewBlog } from '../components/ReviewBlog';
import { TitleEditor } from '../components/TitleEditor';
import { useBlogCrud, useSanitize } from '../hooks/apis';
import { contentAtom, draftState, placeholderIdAtom, reviewToggleAtom  } from '../store/EditorAtom';
import { Auth } from '../components/Auth';
import { useLocation,  useParams } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { v4 as uuidv4 } from 'uuid';
 import {editorStyles} from '../utils/styleObject';
 import gif from '../assets/giphy.webp'
export const Publish = ()=>{
      const {id} = useParams();
      const location = useLocation();
      const{pathname} = location;
      const setDraftState= useSetRecoilState(draftState)
      let placeholderId = useRef(!id?uuidv4():id) 
      const setPlaceholderId = useSetRecoilState(placeholderIdAtom)
      const [blog, setBlog] = useRecoilStateLoadable(contentAtom(placeholderId.current));
      const reviewToggle = useRecoilValue(reviewToggleAtom);
      const {getPlaceholderId,updateBlog} = useBlogCrud(placeholderId.current)
      const [newToSite,SetNewToSite]= useState("true")
      useEffect(()=>{
      setPlaceholderId(placeholderId.current)
      const s=  localStorage.getItem('newToSite') 
      if(!s){
        localStorage.setItem('newToSite','true')
      }else{
        SetNewToSite(s)
      }
    
      },[])
      const handleNewToSite= ()=>{
        localStorage.setItem("newToSite","false")
        SetNewToSite("false")
      }

      useEffect(()=>{
    
        setDraftState("")
         let timerId;
          timerId = setTimeout((  )=>{
              pathname=='/new-story'?getPlaceholderId():updateBlog()
          }  ,2000)
          return ()=>{
              clearTimeout(timerId)
          }
         },[blog.contents.title,blog.contents.content])
   
     function onChangeTitle(e:any){
       
        const title =useSanitize(e.target.value)
        
        setBlog((prevBlog:any) => ({
          ...prevBlog,
          id: id,
          title: title,
          
        }));
       }
      function onChangeContent(e:any) {
     
        const content =useSanitize(e.target.value)
 
        setBlog((prevBlog:any) => ({
          ...prevBlog,
          id: id,
          content: content,
          
        }));
     
       }
      if(blog.state=='loading'){
        return <Loading/>
      }
      if(blog.state=='hasValue'){
 
      return <Auth>
           {reviewToggle == true  ? <ReviewBlog placeholderId={placeholderId.current}/>
              : <div className='flex justify-center w-full gap-2 mt-5  '>
                    <div className='relative w-full lg:w-3/6  h-dvh flex flex-col items-center gap-10'  >
                          <div className='w-full '>
                          <TitleEditor onchange={onChangeTitle} 
                          value={blog.contents.title} />
                          </div>
                          <ContentEditor  containerProps={{ style: editorStyles }}
                            value={blog.contents.content}
                            onChange={onChangeContent}  />
                            
                           {newToSite=="true"&&<div   className="mt-10 w-full bg-black     
                            flex justify-center absolute bottom-14 h-1/6 border rounded-lg py-2   ">
                           <div  style={{ backgroundImage:  `url(${gif})`}} className={`bg-center bg-white   
                            w-full relative drop-shadow-md flex justify-end p-2 bg-no-repeat  h-auto `}  
                            >
                          
                  
                          <svg onClick={handleNewToSite} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg> 

                            </div>
                        
                             </div>}  
                    </div>
                   
                </div>
            }
          </Auth>
      }
}