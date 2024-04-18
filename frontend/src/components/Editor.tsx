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
 
export default function ContentEditor(props: EditorProps) {
 
  const btnStyle= {
    "background": "#3b3a3a",
    "color": "rgb(246, 235, 235)",
    "cursor": "pointer",
    "fontSize": "1em",
    "height": "2em",
    "outline": "none",
    "padding": "0",
    "width": "2em"
  }
 
  const [toolbarStyle,setToolbarStyle] = useState({
    "alignItems": "center",
    "backgroundColor": "transparent",
    "display": "none",
    "width":"500px",
    "border": "none",
    "position": "absolute",
    "top": "156",
    "left": "0"
    
  })
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
      <Editor {...props} onSelect={onchange2}   >
        {1 &&<div className="absolute text-slate-300 text-3xl font-sans">Tell Your Story...</div>}
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

 
