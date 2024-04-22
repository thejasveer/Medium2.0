export interface Blog {
    tags: {
        tag: string;
    }[];
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: Date;
    author: {
        name: string | null;
        description: string;
    };
}  
export interface User{
    userId?:string
    username?:string
    email?:string
    description?:string
    blogs?: Blog[]
    list?:Blog[]
    
}