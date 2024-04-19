interface props {
    html: string
}
export const RenderHtml = ({html} : props) =>{


    return <div    dangerouslySetInnerHTML={{__html: html}} >

    </div>
}