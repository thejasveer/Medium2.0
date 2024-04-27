import { useState } from 'react';
import "../assets/editorStyles.css"
import { 
    
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
  Editor,
  EditorProvider,
  Toolbar,
  EditorProps
} from 'react-simple-wysiwyg';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { contentAtom, placeholderIdAtom } from '../store/EditorAtom';
const btnStyle= {
  "background": "#3b3a3a",
  "color": "rgb(246, 235, 235)",
  "cursor": "pointer",
  "fontSize": "1em",
  "height": "2em",
  "outline": "none",
  "padding": "7px",
  "width": "2em",
  
}

export default function ContentEditor({containerProps,onChange,value,showplaceholder}: any) {
 
 
  const [toolbarStyle,setToolbarStyle] = useState({
    "alignItems": "center",
    "backgroundColor": "transparent",
    "display": "none",
    "width":"-webkit-fill-available",
    "border": "none",
    "position": "absolute",
    "top": "156",
    "left": "0",
    "padding": "3px"
    
  })
  const placeholderId = useRecoilValue(placeholderIdAtom);
  
  function onchange2(e) {
    
    const selection: any = window.getSelection();
    let {top,left} = selection.getRangeAt(0).getBoundingClientRect();
      
      top -=39;
       
    if(selection.toString().length > 0 ){
      setToolbarStyle({...toolbarStyle,display: "flex",top:top,left:left})
    }
    if(selection.toString().length == 0 ){
     
      setToolbarStyle({...toolbarStyle,display: "none"})
    }
   
  }
 
  return (
    <EditorProvider>
      <Editor containerProps={containerProps} onChange={onChange} value={value}  onSelect={onchange2}   >
        {showplaceholder && <div className='relative'>
                          <div className="absolute text-slate-300 text-xl top-2 px-3 font-serif not-italic flex leading-normal">Tell your story...</div>
                        </div>}
         <Toolbar style={toolbarStyle}>
      
        <BtnUndo style={btnStyle} />
          <BtnRedo style={btnStyle}  />
         
          <BtnBold  style={btnStyle} />
          <BtnItalic style={btnStyle}  />
         
          <BtnUnderline  style={btnStyle} />
          <BtnStrikeThrough style={btnStyle}  />
          
          
          <BtnLink style={btnStyle} />
          
        </Toolbar>
        
      </Editor>
    </EditorProvider>
  );
}

 
