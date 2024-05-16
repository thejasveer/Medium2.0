import { memo, useEffect, useState } from 'react';
import "../assets/editorStyles.css"
import { 
      BtnBold, 
    BtnItalic,
    BtnLink, 
    BtnRedo,
    BtnStrikeThrough, 
    BtnUnderline,
    BtnUndo,  
  Editor,
  EditorProvider,
  Toolbar,
   
} from 'react-simple-wysiwyg';
import { btnStyle, defaultToolbarStyles } from '../utils/styleObject';
 

export   const  ContentEditor = memo(({containerProps,onChange,value}: any)=> {
 
 
  const [toolbarStyle,setToolbarStyle] = useState(defaultToolbarStyles)
  const [showplaceholder,setShowPlaceholder] = useState(true);
  useEffect(()=>{
 
    if (value!="") {
      setShowPlaceholder(false);
      } else {
        setShowPlaceholder(true);
      }
  },[value])
  
  function onSelect() {
     const selection: any = window.getSelection();
    let {top,left} = selection.getRangeAt(0).getBoundingClientRect();
      console.log(top,left)
      top -=42;
 
       if(left>300){
    
        left -=300
       }
    if(selection.toString().length > 0 ){
      setToolbarStyle({...toolbarStyle,display: "flex",top:top,left:left})
    }
    if(selection.toString().length == 0 ){
     
      setToolbarStyle({...toolbarStyle,display: "none"})
    }

   
  }
 
 
  return (
 
         <EditorProvider>
            <Editor containerProps={containerProps} onChange={onChange} value={value}  onSelect={onSelect}   >
              {showplaceholder && <div className='relative'>
                                <div className="absolute text-slate-300 text-2xl top-2 px-3 font-serif not-italic flex leading-normal">Tell your story...</div>
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
});




 
