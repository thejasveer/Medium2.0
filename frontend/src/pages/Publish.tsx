 
 
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from 'recoil';
import ContentEditor from '../components/Editor';
import { ReviewBlog } from '../components/ReviewBlog';
import { TitleEditor } from '../components/TitleEditor';
import { useBlogCrud, useSanitize } from '../hooks/apis';
import { contentAtom, placeholderIdAtom, reviewToggleAtom, todosAtomFamily } from '../store/EditorAtom';
import { Auth } from '../components/Auth';
import { useNavigate, useParams } from 'react-router-dom';

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
  let {id} = useParams();
  let [placeholderId,setPlaceholderId] = useRecoilState(placeholderIdAtom);
  const [blog, setBlog] = useRecoilStateLoadable(contentAtom(placeholderId));
 
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true)
  const reviewToggle = useRecoilValue(reviewToggleAtom);
  const {getPlaceholderId,postBlog} = useBlogCrud()
  useEffect(() => {
    setPlaceholderId(id ? id : "wswswswz");
  }, []);

 
  useEffect(():any => {

    if (blog.state === 'hasValue'){
      if (blog.contents.content!="") {
        setShowPlaceholder(false);
      } else {
        setShowPlaceholder(true);
      }
    }

  }, [blog]);
  

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
        if(!id){
         await getPlaceholderId()
        }else{
          // setPlaceholderId(id)
          postBlog()
        }
   }

      const handleInput1Debounced = debounce(callBackendforid, 1000);
      const handleInput2Debounced = debounce(callBackendforid, 1000);

      // Event handler for input field 1
      function handleChangeInput1(event: { target: { value: any; }; }) {
        handleInput1Debounced(event.target.value);
      }

      // Event handler for input field 2
      function handleChangeInput2(event: { target: { value: any; }; }) {
        handleInput2Debounced(event.target.value);
      }
      
      function onChangeContent(e) {
        
        const content =useSanitize(e.target.value)
        setBlog((prev) => ({
          ...prev.contents,
          contents: {
            ...prev.contents,
            content: content
          }
        }));
        handleChangeInput2(e)
       }
      function onChangeTitle(e){
       
        console.log(e.target.value)
       const title =  useSanitize(e.target.value)
 
       setBlog((prevBlogLoadable) => {
        if (prevBlogLoadable.state === 'hasValue') {
          const prevBlog = prevBlogLoadable.contents;
          const updatedContent = { ...prevBlog.contents, content: title };
          return { ...prevBlogLoadable, contents: updatedContent };
        }
        // Handle other states like 'loading' or 'hasError'
        return prevBlogLoadable; // Return unchanged value for other states
      });
      
        handleChangeInput1(e)
        
      }

 
    return <Auth>
           {reviewToggle == true  ? <ReviewBlog/>
              : <div className='flex justify-center w-full gap-2 mt-5 '>
                    <div className='max-w-lg min-h-screen flex flex-col gap-10'  >
                          <div>
                          <TitleEditor onchange={onChangeTitle} 
                        />
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