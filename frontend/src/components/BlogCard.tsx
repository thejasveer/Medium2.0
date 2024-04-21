import { useFormatDate } from "../hooks/apis"
import { Avatar } from "./Avatar"

interface BlogCardProps{
    authorName: string
    title: string
    content: string
    publishedDate: string
}
export const BlogCard=({authorName,title,content,publishedDate}: BlogCardProps)=>{
  const date =useFormatDate(publishedDate)
return <div   className=" gap-1 flex flex-col p-2">
        <div className="flex gap-2 items-center ">
            <div>
              <Avatar name={authorName}  />
                </div>
            <div className="font-light">{authorName}</div>
            <div className="font-light text-slate-500">- {date}</div>

        </div>
        <div className="font-bold text-xl text-left">
            {title}
        </div>
        <div className="font-light ">
            {content.slice(0,100)}...
        </div>

        <div className="mt-2 font-light text-slate-500">
            {`${Math.ceil(content.length/100)} mins read`}
        </div>
        <hr className="mt-5" />
        
</div>

}

