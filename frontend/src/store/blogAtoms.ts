import axios from 'axios';
import {atomFamily, selectorFamily} from 'recoil'
import { BACKEND_URL } from '../config'
export const blogAtom = atomFamily ({
    key:"blogAtom",
    default: selectorFamily({
      key:"blog",
      get: (id: string) => async ({get}) => {
        const res = await axios.get(`${BACKEND_URL}/blog/specific/${id}`);
        return res.data.blog;
    }})
  });