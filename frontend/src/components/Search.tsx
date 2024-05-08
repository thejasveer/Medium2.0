import { useRecoilState, useSetRecoilState } from "recoil"
import { searchToggleAtom } from "../store/searchAtom"
import { useBlogs, useRecentSearches } from "../hooks/apis";
import { useEffect, useRef, useState } from "react";
import { Blog } from "../interfaces";
import { RenderHtml } from "./RenderHtml";
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BlogTrigger } from "../store/blogAtoms";
export const Search =()=>{
 const [showSearch, setShowSearch] = useRecoilState(searchToggleAtom)

    useEffect(()=>{
    
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
               event.preventDefault(); // Prevent default browser behavior
             setShowSearch(true)// Focus on the search input
            } 
            if (event.key === 'Escape') {
                event.preventDefault(); // Prevent default browser behavior
                setShowSearch(false) // Remove focus from the search input
              }
          };
        document.addEventListener('keydown', handleKeyDown);
         return () => { 
          document.removeEventListener('keydown', handleKeyDown);
        };
    },[])
    
return showSearch && <Modal toggle={setShowSearch}  />

}


const Modal=({toggle}:{toggle:any})=>{
    const searchRef = useRef<HTMLInputElement>(null)
    const {blogs}= useBlogs();
    const [searchInput,setSearchInput]= useState("")
    const [filteredList,setFilteredList] = useState<Blog[]>([])
    const {recentSearches,add,remove} = useRecentSearches()
    const navigate = useNavigate();
    const resetBlog= useSetRecoilState(BlogTrigger)
    const {pathname} = useLocation()
     
 
    useEffect(()=>{
        searchRef.current?.focus()
       
    },[])
//reset blog
    const handleNavigation=({title,content,id}:{title:string,content:string,id:string })=>{
        if(pathname.includes('/blog/')){
            resetBlog((x)=>x+1)
        }
       
        navigate(`/blog/${id}`)
        const recentSearch = {title,content,id}
        add(recentSearch)
        toggle(false)
    }
    const filter=()=>{
        const n = blogs.contents.filter((b: { title: string | string[]; })=> b.title.toLowerCase().includes(searchInput.toLowerCase()))  
        setFilteredList(n)
    }
    useEffect(()=>{
        const timerId = setTimeout(()=>{
          filter()      
        },500)
        return ()=>{
            clearTimeout(timerId)
        }
    },[searchInput])
    
    return <div
    id="select-modal"
    // onClick={()=>toggle(true)}
  
    className=" overflow-y-auto overflow-x-hidden flex absolute top-0   opacity-3  z-50 justify-center items-start w-full  h-full backdrop-opacity-10 backdrop-invert bg-white/30"
>
<div className="relative p-4 w-full mt-20 max-w-md h-max">
            <div className="relative bg-white rounded-lg shadow">
                {/* Modal header */}
                <div className="flex items-center justify-between w-full px-4 border-b rounded-t">
                    <div className="relative w-5/6">
                        <div className="absolute   inset-y-0 start-0 focus:ring-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            ref={searchRef}
                            onChange={(e)=>{
                                setSearchInput(e.target.value)
                            }}
                            className="block outline-none w-full p-4 ps-10 text-sm focus:ring-0
                             text-gray-900   "
                            placeholder="Search stories..."
                      
                        />
                    </div>
                  
                        <svg onClick={()=>{toggle(false)}}
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                  
                </div>
          
                <div className="p-4 md:p-5">
                    {searchInput.length>0?     <ul className="space-y-4 mb-4 overflow-auto h-96">
                            {filteredList.length>0 ? filteredList.map((blog)=>{
                                  return   <li key={blog.id} onClick={()=>handleNavigation(blog)}>
                                       
                                     <label
                                        
                                        className="inline-flex items-center border-b-1 justify-between w-full p-2  text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                                    >
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">{blog.title}</div>
                                            <div className="w-full text-gray-500">< RenderHtml  html={blog.content?.slice(0,5)+'...'}/></div>
                                        </div>
                                        <svg
                                            className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M1 5h12m0 0L9 1m4 4L9 9"
                                            />
                                        </svg>
                                    </label>
                                        
                                </li>
                            }):  <p className="text-center text-gray-500 mb-4">No results for <span className="text-slate-700 font-semibold">"{searchInput}"</span></p>
                        }
                    </ul>
                    : <div>
                         <p className="text-gray-500 mb-4">Recent</p>
                        <ul className=" space-y-4 mb-4 overflow-auto  ">
                            {recentSearches.length>0 ?recentSearches.map((r,i)=>{
                                  return   <li  className=" " key={uuidv4()}>
                                                    
                                    <label
                                        
                                        className="inline-flex items-center border-b-1 justify-between w-full p-2  text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                                    >
                                        <div className="block w-full " onClick={()=>handleNavigation(r)}> 
                                            <div className="w-full text-lg font-semibold">{r.title}</div>
                                            <div className="w-full text-gray-500">< RenderHtml  html={r.content?.slice(0,5)+'...'}/></div>
                                        </div>
                                        <svg onClick={()=>remove(i)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>

                                    </label>
                                </li>
                            }) :<p className="text-center text-gray-500 mb-4">No recent... </p>
                        }
                    </ul>
                    </div>
                    }
                
                    
                </div>
            </div>
        </div>
</div>
}
