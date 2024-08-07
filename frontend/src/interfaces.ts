export interface Blog {
    tags: {
        tag: string;
    }[];
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
    img: string;
    claps:string,
    author: {
        name: string;
        id:string;
        description: string;
    };
}  
export interface User{
    userId?:string
    username?:string

    email?:string
    description?:string
    blogs?: Blog[]
    list?:  ReadingList[]
 
    
} 
interface ReadingList{
    "id": string,
    "postId": string,
    "userId":string,
    "post": Blog
}
export interface SweetError{
msg: string
}
export interface Alert{
msg: string,
bgColor:string
}

enum DRAFTSTATE {
    SAVING = 'Saving....',
   SAVED= 'Saved'
  }
  export default DRAFTSTATE;