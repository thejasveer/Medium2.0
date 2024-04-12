import {z} from 'zod';
export const blogSchema = z.object({
    title: z.string().min(3,{message:"Title should atleast be 3 characters"}),
    content : z.string().min(3,{message:"Content should be 3 characters"}),
}) 