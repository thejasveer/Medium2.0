import { memo } from "react"

interface props {
    html: string
}
export const RenderHtml = memo(({html} : props) =>{
 
    return <div   dangerouslySetInnerHTML={{__html: html}} >

    </div>
})