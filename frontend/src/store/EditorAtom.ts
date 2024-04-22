import {atom} from 'recoil';
 
export const contentAtom = atom({
    key:"contentAtom",
    default:{
        "id":"",
        "title":"",
        "content": "",
        "published":false,
        "createdAt": "",
        "author": {
            "name": "",
            "description":""
        }
    }
})

export const reviewToggleAtom = atom({
    key:"reviewToggleAtom",
    default:false
})
export interface TagType{
    tag:string
    active:boolean
}
export const tagsAtom= atom<TagType[]>({
    key:"tagsAtom",
    default: [] 
})