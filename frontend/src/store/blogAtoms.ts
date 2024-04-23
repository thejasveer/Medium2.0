import axios from 'axios';
import {atomFamily, selectorFamily,selector,atom, useRecoilValue,} from 'recoil'
import { BACKEND_URL } from '../config'
import { authAtom } from './userAtom';
export const blogAtom = atomFamily ({
    key:"blogAtom",
    default: selectorFamily({
      key:"blog",
      get: (id: string) => async ({get}) => {
        const res = await axios.get(`${BACKEND_URL}/blog/specific/${id}`);
        return res.data.blog;
    }})
  });
  export const myBlogsAtom = atom ({
    key:"blogAtom",
    default: selector({
      key:"blog",
      get: async ({get}) => {
        const res = await axios.get(`${BACKEND_URL}/blog/my`,{
          headers:{
            Authorization: "Bearer "+  useRecoilValue(authAtom)
          }
        });
        return res.data.blogs;
    }})
  });