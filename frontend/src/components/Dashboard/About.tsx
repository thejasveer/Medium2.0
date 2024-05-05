 
import { useRecoilValue } from "recoil"
import { ContentEditor } from "../Editor"
import { userAtom } from "../../store/userAtom"

export const About=()=>{
    const user = useRecoilValue(userAtom)

    return <div>
        
 

    </div>
}