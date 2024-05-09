export const editorStyles={
    "border": "none",
    "borderRadius": ".375rem",
    "display": "flex",
    "flexDirection": "column",
    "height": "67vh",
    "overflow": "hidden",
    "resize":" vertical",
    "width": "100%",
    "fontFamily":" medium-content-serif-font, Georgia, Cambria, Times New Roman, Times, serif",
    "fontWeight": "400",
    "fontStyle": "normal",
    "fontSize": "25px",
    "lineHeight": "2.5rem",
    "letterSpacing":"-.003em",
      "caretColor": "#94a3b8",
     "overFlow":"scroll",
    }
    export const btnStyle= {
      "background": "#3b3a3a",
      "color": "rgb(246, 235, 235)",
      "cursor": "pointer",
      "fontSize": "1em",
      "height": "1.5em",
      "outline": "none",
      "padding": "1px",
      "width": "2em",
      
    }
    
    export const defaultToolbarStyles: ToolbarStyleTypes={
      "alignItems": "center",
      "backgroundColor": "transparent",
      "display": "none",
      "width":"-webkit-fill-available",
      "border": "none",
      "position": "fixed",
      "top": "156",
      "left": "0",
      "padding": "3px"
         }
  export  type ToolbarStyleTypes = {
      alignItems: string;
      backgroundColor: string;
      display: string;
      width: string;
      border: string;
      position?: 'absolute' | 'relative' | 'fixed' | 'static' | 'sticky' | undefined; // Define position type
      top: string;
      left: string;
      padding: string;
    };