import { memo } from "react"

interface props {
    html: string
}
export const RenderHtml = memo(({html} : props) =>{
 
    return <div  className=" "  dangerouslySetInnerHTML={{__html: html}} >

    </div>
})