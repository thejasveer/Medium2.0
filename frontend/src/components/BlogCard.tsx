import { Link, useNavigate } from "react-router-dom"
import { useAuth, useBlog, useBlogs, useFormatDate, useReadingList } from "../hooks/apis"
import { Blog } from "../interfaces"
import { Avatar } from "./Avatar"
import { ReadingListIcon,  } from "./ReadingListIcon"
import { BlogMenu } from "./BlogMenu"
import { RenderHtml } from "./RenderHtml"
import { useEffect, useState } from "react"
import { Loading } from "./Loading"
 
export const BlogCard=({blog  }: {blog: Blog})=>{
  const date =useFormatDate(blog.createdAt) ;
  const [showActions,setShowActions] = useState(false)
  const {user,userExist}= useAuth();
  const navigate = useNavigate()
  const {deleteBlog,loading} = useBlogs()
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
  const handleDelete =()=>{
   deleteBlog(blog.id)
  }

return loading? <Loading/>: <div   className=" gap-1 flex flex-col p-2">
            <div className="grid grid-cols-12 space-x-5">
              <div className="col-span-3 md:col-4 flex justify-center items-center">
              <div 
                style={{ backgroundImage:  `url(${blog.img})`}} className={`bg-center bg-white rounded-lg
                 md:size-full relative drop-shadow-md   bg-cover  flex justify-center items-center p-10`}  
                >
              {blog.img=="" &&   <svg className=" svgIcon-use" height="25" viewBox="0 0 1043.63 592.71"><g data-name="Layer 2"><g data-name="Layer 1"><path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36"></path><path d="M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279"></path><path d="M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path></g></g></svg>
   }

                </div>
              </div>
              
                  <div className="col-span-7 md:col-span-8  ">
                      <Link className=" backdrop: space-y-5  focus:outline-none" key=  {blog.id}  to={blog.published?"/blog/"+blog.id:''}>
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
            
                                
                  <div className="col-span-1   flex flex-col  justify-between">
                    <ReadingListIcon  id={blog.id}/>
                    <div className="flex space-x-2 text-slate-400">
                    {showActions?<BlogMenu  handleDelete={handleDelete} handleEdit={handleEdit}/>:""}
                    </div>
                  </div>
                
                </div>
            
        <hr className="mt-5" />
        </div>
 

}

