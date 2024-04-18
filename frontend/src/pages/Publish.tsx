 
 
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ContentEditor from '../components/Editor';
import { TitleEditor } from '../components/TitleEditor';
import { contentAtom } from '../store/EditorAtom';
const editorStyles={
  "border": "none",
  "borderRadius": ".375rem",
 "display": "flex",
  "flexDirection": "column",
  "minHeight": "100px",
  "overflow": "hidden",
  "resize":" vertical",
  "width": "500px",
}
export const Publish = ()=>{
  const [html, setHtml] = useState('<p>Tell Your Story</p>');
  const [blog, setBlog] = useRecoilState(contentAtom);
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true)
  useEffect(()=>{
    if(blog.content.length>0){
      setShowPlaceholder(false)
    }else{
      setShowPlaceholder(true)
    }
  },[blog])
 //todo fix placeholder
      function onChangeContent(e) {
      
        setBlog({...blog, content: e.target.value});
        console.log(blog)
      }
      function onChangeTitle(e){
        setBlog({...blog, title: e.target.value});
        console.log(blog)
      }
 
 
    return <div className='flex justify-center w-full gap-2 mt-5 '>
      
      <div className='max-w-lg flex flex-col gap-10'  >
      <div><TitleEditor onchange={onChangeTitle}/></div>
      <ContentEditor  containerProps={{ style:editorStyles}} showplaceholder={showPlaceholder} value={blog.content}  onChange={onChangeContent}  />
   
      </div>
      </div>
}