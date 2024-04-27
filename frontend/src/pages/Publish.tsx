 
 
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from 'recoil';
import ContentEditor from '../components/Editor';
import { ReviewBlog } from '../components/ReviewBlog';
import { TitleEditor } from '../components/TitleEditor';
import { useBlogCrud, useSanitize } from '../hooks/apis';
import { contentAtom, placeholderIdAtom, reviewToggleAtom, todosAtomFamily } from '../store/EditorAtom';
import { Auth } from '../components/Auth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { v4 as uuidv4 } from 'uuid';
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
      const location = useLocation();
      const{pathname} = location;

      let [placeholderId,setPlaceholderId] = useRecoilState(placeholderIdAtom);
    
      const [blog, setBlog] = useRecoilStateLoadable(contentAtom(placeholderId));
    
      const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true)
      const reviewToggle = useRecoilValue(reviewToggleAtom);
      const {getPlaceholderId,updateBlog} = useBlogCrud()
      useEffect(()=>{
      
        if(!id)
        {
          setPlaceholderId(uuidv4())
        }else{
          // setPlaceholderId(id)
        }
      },[])
   
    
    useEffect(()=>{
      if (blog.state === 'hasValue'){
        console.log(blog)
        if (blog.contents.content!="") {
        setShowPlaceholder(false);
      } else {
        setShowPlaceholder(true);
      }
 
    
    }
  },[blog.contents.content])

 
  
   
    const debounce= (fn: { (e: any): void; (e: any): void; apply?: any; },delay: number | undefined)=>{
 
      let timeoutId: number | undefined;
          return (...args: any)=>{
            clearTimeout(timeoutId);
            timeoutId =  setTimeout(()=>{
              fn.apply(null,args);
          },delay)
          }
      }
      const callBackendforid = async() =>{
     debugger
      if(pathname =='/new-story'){
       
        getPlaceholderId()
        }else{
          updateBlog()
        }
      }

      const handleInput1Debounced = debounce(callBackendforid, 0);
      const handleInput2Debounced = debounce(callBackendforid, 0);

      // Event handler for input field 1
      function handleChangeInput1(event: { target: { value: any; }; }) {
        handleInput1Debounced(event.target.value);
      }

      // Event handler for input field 2
      function handleChangeInput2() {
        handleInput2Debounced();
      }
      
    
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
        // return <Loading/>
      }
      if(blog.state=='hasValue'){
 
    return <Auth>
           {reviewToggle == true  ? <ReviewBlog/>
              : <div className='flex justify-center w-full gap-2 mt-5 '>
                    <div className='max-w-lg min-h-screen flex flex-col gap-10'  >
                          <div>
                          <TitleEditor onchange={onChangeTitle}  />
                          </div>
                          <ContentEditor  containerProps={{ style:editorStyles}}
                            showplaceholder={showPlaceholder} 
                             value={blog.contents.content}
                            onChange={onChangeContent}  />
                    </div>
                </div>
            }
          </Auth>
      }
}