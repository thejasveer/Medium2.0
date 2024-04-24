 
 
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ContentEditor from '../components/Editor';
import { ReviewBlog } from '../components/ReviewBlog';
import { TitleEditor } from '../components/TitleEditor';
import { useSanitize } from '../hooks/apis';
import { contentAtom, reviewToggleAtom } from '../store/EditorAtom';
import { Auth } from '../components/Auth';
import { useParams } from 'react-router-dom';

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
  const {id} = useParams();
  if(!id){
    console.log('yes')
  }
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

    const debounce= (fn: { (e: any): void; (e: any): void; apply?: any; },delay: number | undefined)=>{
      let timeoutId: number | undefined;

        return (...args: any)=>{
          clearTimeout(timeoutId);
          timeoutId =  setTimeout(()=>{
            fn.apply(null,args);
        },delay)

        }

    }
    const handleInput1Debounced = debounce(onChangeTitle, 1000);
    const handleInput2Debounced = debounce(onChangeContent, 1000);

    
      
      function onChangeContent(e) {
        console.log(e.target.value)
        const content =useSanitize(e.target.value)
        setBlog({...blog, content: content});
       }
      function onChangeTitle(e){
        console.log(e.target.value)
       const title =  useSanitize(e.target.value)
        setBlog({...blog, title: title});
        
      }

 
    return <Auth>
           {reviewToggle == true  ? <ReviewBlog/>
              : <div className='flex justify-center w-full gap-2 mt-5 '>
                    <div className='max-w-lg min-h-screen flex flex-col gap-10'  >
                        <div><TitleEditor onchange={handleInput1Debounced} /></div>
                        <ContentEditor  containerProps={{ style:editorStyles}} showplaceholder={showPlaceholder} value={blog.content}  onChange={handleInput2Debounced}  />
                  </div>
                </div>
            }
          </Auth>
}