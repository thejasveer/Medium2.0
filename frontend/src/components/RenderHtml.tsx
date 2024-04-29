interface props {
    html: string
}
export const RenderHtml = ({html} : props) =>{
 
    return <div  className=" "  dangerouslySetInnerHTML={{__html: html}} >

    </div>
}