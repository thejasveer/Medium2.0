import { useFormatDate } from "../hooks/apis"

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

export function Avatar({name,size="size-8",text="text-lg"}: {name: string, size?: string,text?:string}){
 
    name = name[0]
return   <div className={`relative inline-flex items-center justify-center  ${size} overflow-hidden bg-slate-400 rounded-full `}>
<span className={`font-medium ${ text} text-gray-300 dark:text-gray-300`}>{name}</span>
</div>
}