import {atom, atomFamily, selectorFamily } from 'recoil';
 
import axios from 'axios';
import { BACKEND_URL } from '../config';
 
import { authAtom } from './userAtom';
 


export const contentAtom = atomFamily({
    key: 'contentAtom',
    default: selectorFamily({
      key: `contentAtomSelectorFamily`,
      get: (id: string| null| undefined) => async ({get}) => {
    
            // if(!id) return;
            const token = get(authAtom)
            const res = await axios.get(`${BACKEND_URL}/blog/editor/${id}`,{
                headers:{
                    Authorization: 'Bearer'+ token
                }
    
            });
      
           const blog = res.data.blog || {
                id: id,
                title: "",
                content: "",
                published: false,
                img:"",
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
export const draftState = atom<string>({
    key:"draftState",
    default: ""
})

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
export const ImgAtom= atom<any>({
    key:"ImgAtom",
    default: {
        src:"",
        newSrc:""
    }
})
export const placeholderIdAtom =atom<string|undefined|null>({
    key:"placeholderIdAtom",
    default: ""
})