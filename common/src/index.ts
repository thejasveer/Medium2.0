import {z} from 'zod';
export const blogSchema = z.object({
    title: z.string().min(3,{message:"Title should atleast be 3 characters"}),
    content : z.string().min(3,{message:"Content should be 3 characters"}),
}) 
export const updateBlogSchema = z.object({
    id: z.string().min(1,{message:"Id required"}),
    title: z.optional(z.string().min(3,{message:"Title should atleast be 3 characters"})),
    content: z.optional(z.string().min(3,{message:"Content should be 3 characters"})),
}) 
export const signupSchema = z.object({
    name: z.string().min(3,{message:"Name should atleast be 3 charachter long."}),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(5,{message:"Password should atleast be at least 5 characters long."}),
})

export const signinSchema = z.object({
    email: z.string().min(1,{message: "Invalid credentials"},),
    password: z.string().min(1,{message: "invalid credentials"},),
})
export type blogParams = z.infer< typeof blogSchema>
export type updateBlogParams = z.infer< typeof updateBlogSchema>
export type signinParams = z.infer< typeof signinSchema>
export type signupParams = z.infer< typeof signupSchema>