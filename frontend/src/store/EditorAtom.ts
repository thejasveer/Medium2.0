import {atom} from 'recoil';
import { useFormatDate } from '../hooks/apis';

const date = new Date().toDateString();
export const contentAtom = atom({
    key:"contentAtom",
    default:{
        "id":"string",
        "title":"",
        "content": "",
        "published":"false",
        "createdAt": useFormatDate(date),
        "author": {
            "name": "JAsveer",
            "description":" Reandom" 
        }
    }
})

export const reviewToggleAtom = atom({
    key:"reviewToggleAtom",
    default:false
})

export const tagsAtom= atom({
    key:"tagsAtom",
    default: [] 
})