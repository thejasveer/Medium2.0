import {atom, atomFamily, selectorFamily, useRecoilValue} from 'recoil';
import { Blog } from '../interfaces';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useAuth } from '../hooks/apis';
import { authAtom } from './userAtom';
import { v4 as uuidv4 } from 'uuid';
 
export const contentAtom = atomFamily({
    key: 'contentAtom',
    default: selectorFamily({
      key: `contentAtomSelectorFamily`,
      get: (id: string| null| undefined) => async ({get}) => {
            if(!id) return;
            const token = get(authAtom)
            const res = await axios.get(`${BACKEND_URL}/blog/editor/${id}`,{
                headers:{
                    Authorization: 'Bearer'+ token
                }
    
            });
           
           const blog = res.data.blog || {
                id: id,
                title: "cdeww",
                content: "dewdwe",
                published: "false",
                createdAt: "",
                author: {
                  name: "",
                  description: ""
                },
                tags: []
              };
              return blog;
        }
              
            
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
export const placeholderIdAtom =atom<string|undefined|null>({
    key:"placeholderIdAtom",
    default: null
})