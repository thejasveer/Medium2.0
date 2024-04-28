interface props {
    html: string
}
export const RenderHtml = ({html} : props) =>{

    console.log('html',html)
    return <div    dangerouslySetInnerHTML={{__html: html}} >

    </div>
}