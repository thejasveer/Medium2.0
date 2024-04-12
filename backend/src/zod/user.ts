import {z} from "zod";
export const signupSchema = z.object({
    name: z.string().min(3,{message:"Name should atleast be 3 charachter long."}),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(5,{message:"Password should atleast be at least 5 characters long."}),
})

export const signinSchema = z.object({
    email: z.string().nonempty({message: "Invalid credentials"},),
    password: z.string().nonempty({message: "invalid credentials"},),
})