import { Link, Route, Routes, useLocation, useParams } from "react-router-dom"
 
 
import { useAuth } from "../hooks/apis";
 
import { NotFound } from "../components/NotFound";
import { Loading } from "../components/Loading";
import { Home } from "../components/Dashboard/Home";
import { Lists } from "../components/Dashboard/Lists";
import { About } from "../components/Dashboard/About";
import { Avatar } from "../components/Avatar";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/userAtom";
 

export const Dashboard = ()=>{
    const {username} = useParams()
 
    const user = useRecoilValue(userAtom)
 
 

      if(username!='@'+user.username){
            return <NotFound/>
        }
 
   


    return  Object.keys(user).length>0&& <div className="flex justify-center">
             <div className=" w-full md:max-w-6xl grid grid-cols-12 h-fit  ">
                <div className="col-span-12 md:col-span-8 py-10 px-8">
                <AppBar username={user.username} />
                 <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="lists" element={<Lists />} />
                    <Route path="about" element={<About />} />
                </Routes>
                </div>
                <div className="col-span-0   md:col-span-4 hidden md:flex flex-col space-y-3 border-l py-8  px-5 border-slate-200 ">
                    <Avatar name={user.username} size={'size-20'} text={"text-3xl"} />
                    <div className="capitalize font-semibold"> {user.username}</div>
                    {/* <Link className="text-green-600  text-sm" to={'about'}>Edit profile </Link> */}
                </div>
              
                
            </div>
            </div>
         
                

}

const AppBar =({username}: {username?:string})=>{
    const location = useLocation()
    const {pathname} = location;
 
    const pathArr ={
        1:`/@${username}`,
        2:`/@${username}/lists`,
        3:`/@${username}/about`,
    }

    const activeClass = 'text-slate-700 font-semibold border-b border-black -mb-[1px]'
    return <div className="space-y-4 "> 
                <div className="text-5xl capitalize flex justify-between items-center">
                    <span>{username}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 text-slate-700">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>

                </div>
                 <div className="flex  gap-10 text-sm text-slate-500   font-light border-b border-slate-200 ">
                    <Link to={''}><div className={`${pathArr[1] == pathname && activeClass  } py-4`}>Home</div></Link>
                    <Link to={'lists'}><div className={`${pathArr[2] == pathname &&activeClass  } py-4`}>Lists</div></Link> 
                    {/* <Link to={'about'}>  <div className={`${pathArr[3] == pathname &&activeClass  } py-4`}>About</div></Link> */}
                </div>
            </div> 
  
}