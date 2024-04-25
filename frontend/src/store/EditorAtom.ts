import {atom, atomFamily, selectorFamily, useRecoilValue} from 'recoil';
import { Blog } from '../interfaces';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useAuth } from '../hooks/apis';
import { authAtom } from './userAtom';
 
// export const contentAtom = atomFamily({
//     key:"contentAtom",
//     default: (id) => ({
//         id: id,
//         "title":"",
//         "content": "",
//         "published":false,
//         "createdAt": "",
//         "author": {
//             "name": "",
//             "description":""
//         },
//         "tags":[]
//     })
//   });

  export const contentAtom = atomFamily({
    key: 'contentAtom',
    default: selectorFamily({
      key: "contentAtomSelectorFamily",
      get: (id: string| null) => async ({get}) => {
        console.log(id)
        const token = get(authAtom)
        const res = await axios.get(`${BACKEND_URL}/blog/editor/${id}`,{
            headers:{
                Authorization: 'Bearer'+ token
            }

        });
            const blog= res.data.blog;
       
            if(!blog){
                return {
                    null: null,
                    "title":"",
                    "content": "",
                    "published":false,
                    "createdAt": "",
                    "author": {
                        "name": "",
                        "description":""
                    },
                    "tags":[]

                }
            }else{
                return blog;
            }
            },
    })
  });

export const reviewToggleAtom = atom({
    key:"reviewToggleAtom",
    default:false
})
export interface TagType{
    tag:string
 
}
export const tagsAtom= atom<TagType[]>({
    key:"tagsAtom",
    default: [] 
})
export const placeholderIdAtom =atom({
    key:"placeholderIdAtom",
    default:null
})