import { Link, useNavigate } from "react-router-dom"
import { useAuth, useFormatDate, useReadingList } from "../hooks/apis"
import { Blog } from "../interfaces"
import { Avatar } from "./Avatar"
import ActiveReadingListIcon, { ReadingListIcon, ReadingListicon } from "./ReadingListIcon"
import { BlogMenu } from "./BlogMenu"
import { RenderHtml } from "./RenderHtml"
import { useEffect, useState } from "react"
 
export const BlogCard=({blog  }: {blog: Blog})=>{
  const date =useFormatDate(blog.createdAt) ;
  const [showActions,setShowActions] = useState(false)
  const {user,userExist}= useAuth();
  const navigate = useNavigate()
  useEffect(()=>{
    if(userExist){
 
        if(user.userId== blog.author.id){
            setShowActions(true)
        }
      }
    
  },[user])

 

  const handleEdit =()=>{
    navigate( `/p/${blog.id}/edit`)
  }
  const handleDelete=()=>{
    console.log('delete')
  }

return  <div   className=" gap-1 flex flex-col p-2">
          
                <div className="grid grid-cols-12">
                  <div className="col-span-11 ">
                      <Link className=" backdrop: space-y-5 focus:outline-none" key=  {blog.id}  to={blog.published?"/blog/"+blog.id:''}>
                          <div className="flex gap-2 items-center ">
                              <div>
                            <Avatar name={blog.author.name||''} size={'size-6'} text={'text-xs'} />
                                  </div>
                              <div className="font-light capitalize">{blog.author.name}</div>
                              <div className="font-light text-slate-500">- {date}</div>
                             

                          </div>
                        <div className="font-bold text-xl text-left">
                          {blog.title}
                          </div>
                          <div className="font-light flex flex-col gap-4 ">
                          <RenderHtml html={blog.content?.slice(0,50)+"... "}/> 
                            
                          <div className="flex space-x-2 items-center">
                              {blog.tags.length>0?
                              <div className="bg-gray-200 text-light text-center rounded-full p-1 text-sm w-max overflow-hidden px-3 ">
                              <span>{blog.tags[0].tag}</span>
                            </div>:''}
                            <div className= "text-sm font-light text-slate-500">
                                {`${Math.ceil(blog.content?.length/100)} mins read`}
                            </div>
                          
                            </div>
                        </div>
                    </Link>
                </div>
                  <div className="col-span-1 flex flex-col  justify-between">
                    <ReadingListIcon  id={blog.id}/>
                    <div className="flex space-x-2 text-slate-400">
                    {showActions?<BlogMenu  handleDelete={handleDelete} handleEdit={handleEdit}/>:""}
                    </div>
                  </div>
                
                </div>
            
        <hr className="mt-5" />
        </div>
 

}

