 
 
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useSetRecoilState } from 'recoil';
import {ContentEditor} from '../components/Editor';
import { ReviewBlog } from '../components/ReviewBlog';
import { TitleEditor } from '../components/TitleEditor';
import { useBlogCrud, useSanitize } from '../hooks/apis';
import { contentAtom, draftState, placeholderIdAtom, reviewToggleAtom, todosAtomFamily } from '../store/EditorAtom';
import { Auth } from '../components/Auth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { v4 as uuidv4 } from 'uuid';
const editorStyles={
"border": "none",
"borderRadius": ".375rem",
"display": "flex",
"flexDirection": "column",
"height": "100vh",
"overflow": "hidden",
"resize":" vertical",
"width": "500px",
"fontFamily":" medium-content-serif-font, Georgia, Cambria, Times New Roman, Times, serif",
"fontWeight": "400",
"fontStyle": "normal",
"fontSize": "25px",
"lineHeight": "2.5rem",
"letterSpacing":"-.003em",
  "caretColor": "#94a3b8"
}
 
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

      useEffect(()=>{
      setPlaceholderId(placeholderId.current)
    
      },[])

      useEffect(()=>{
    
        setDraftState("")
         let timerId;
          timerId = setTimeout((  )=>{
              pathname=='/new-story'?getPlaceholderId():updateBlog()
          }  ,3000)
          return ()=>{
              clearTimeout(timerId)
          }
         },[blog])
   
     function onChangeTitle(e){
       
        const title =useSanitize(e.target.value)
        
        setBlog((prevBlog:any) => ({
          ...prevBlog,
          id: id,
          title: title,
          
        }));
       }
      function onChangeContent(e) {
     
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
              : <div className='flex justify-center w-full gap-2 mt-5 '>
                    <div className='max-w-lg min-h-screen flex flex-col gap-10'  >
                          <div>
                          <TitleEditor onchange={onChangeTitle} value={blog.contents.title} />
                          </div>
                          <ContentEditor  containerProps={{ style:editorStyles}}
                        
                             value={blog.contents.content}
                            onChange={onChangeContent}  />
                    </div>
                </div>
            }
          </Auth>
      }
}