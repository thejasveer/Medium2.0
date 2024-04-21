 
 
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ContentEditor from '../components/Editor';
import { ReviewBlog } from '../components/ReviewBlog';
import { TitleEditor } from '../components/TitleEditor';
import { useSanitize } from '../hooks/apis';
import { contentAtom, reviewToggleAtom } from '../store/EditorAtom';
import { Auth } from '../components/Auth';

const editorStyles={
"border": "none",
"borderRadius": ".375rem",
"display": "flex",
"flexDirection": "column",
  "height": "100%",
"overflow": "hidden",
"resize":" vertical",
"width": "500px",
"fontFamily":" medium-content-serif-font, Georgia, Cambria, Times New Roman, Times, serif",
"fontWeight": "400",
  "fontStyle": "normal",
  "fontSize": "17px",
  "lineHeight": "1.58",
  "letterSpacing":"-.003em",
   "caretColor": "#94a3b8"
}
 
export const Publish = ()=>{
 
  const [blog, setBlog] = useRecoilState(contentAtom);
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true)
  const reviewToggle = useRecoilValue(reviewToggleAtom);
 
  useEffect(()=>{
    if(blog.content.length>0){
      setShowPlaceholder(false)
       }else{
      setShowPlaceholder(true)
          }
  },[blog])

      
      function onChangeContent(e) {
        const content =useSanitize(e.target.value)
        setBlog({...blog, content: content});
       }
      function onChangeTitle(e){
       const title =  useSanitize(e.target.value)
        setBlog({...blog, title: title});
        
      }

 
    return <Auth>
           {reviewToggle == true  ? <ReviewBlog/>
              : <div className='flex justify-center w-full gap-2 mt-5 '>
                    <div className='max-w-lg min-h-screen flex flex-col gap-10'  >
                        <div><TitleEditor onchange={onChangeTitle} /></div>
                        <ContentEditor  containerProps={{ style:editorStyles}} showplaceholder={showPlaceholder} value={blog.content}  onChange={onChangeContent}  />
                  </div>
                </div>
            }
          </Auth>
}