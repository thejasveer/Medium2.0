import axios from 'axios';
import {atomFamily, selectorFamily,selector,atom   } from 'recoil'
import { BACKEND_URL } from '../config'
import { authAtom } from './userAtom';


  export const BlogTrigger = atom({
    key: "blogTrigger",
    default: 0
  });
 export const MyBlogsTrigger = atom({
    key: "myBlogsTrigger",
    default: 0
  });
  export const AllBlogsTrigger = atom({
    key: "allBlogsTrigger",
    default: 0
  });
  export const blogAtom = atomFamily ({
    key:"blogAtom",
    default: selectorFamily({
      key:"blogAtomSelector",
      get: (id: string) => async ({get}) => {
        get(BlogTrigger);
        const res = await axios.get(`${BACKEND_URL}/blog/specific/${id}`);
        return res.data.blog;
    }})
  });
  export const myBlogsAtom = atom ({
    key:"myBlogAtom",
    default: selector({
      key:"myBlogAtomSelector",
      get: async ({get}) => {
        get(MyBlogsTrigger);
        const res = await axios.get(`${BACKEND_URL}/blog/my`,{
          headers:{
            Authorization: "Bearer "+  get(authAtom)
          }
        });
        return res.data.blogs;
    },
   
    })
  });

  export const AllBlogsAtom = atom ({
    key:"allBlogAtom",
    default: selector({
      key:"allBlogAtomSelector",
      get: async ({get}) => {
         get(AllBlogsTrigger);
        const res = await axios.get(`${BACKEND_URL}/blog/bulk`,{
          headers:{
            Authorization: "Bearer "+  get(authAtom)
          }
        });
        return res.data.blogs;
    },
   
    })
  });
 

 export  const clapClassAtom = atom({
    key:'clapClassAtom',
    default:'fill-slate-400'
  })