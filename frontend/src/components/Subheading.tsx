import { Link } from "react-router-dom"

export const Subheading=({text,link}: {text:String, link: String})=>{
    return <div className=" text-center text-slate-400 mb-5">
{text} <Link className="underline "to={("Signin"== link)? "/signin":"/signup"}>{link}</Link>

    </div>
}