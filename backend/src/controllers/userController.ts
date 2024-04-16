 
import {Context} from 'hono'
import {z} from "zod";
import {  sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinSchema, signupSchema }  from '@codewithjass/common'
import StatusCode from '../utils/statusCode';
interface singupInput  {
    name:String
    email:String
    password:String
}
interface signinInput {
    email: String
    password: String
}

 export const signup = async (c:Context) => {
        try {
            const input: singupInput = await  c.req.json();
            console.log(input);
            const {success,error} = await signupSchema.safeParse(input);
            if(!success){
                c.status(StatusCode.BADREQ);
              
                return   c.json({"error": error.issues});
            }else{
                const prisma = new PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL,
                  }).$extends(withAccelerate());
                
                const exist= await prisma.user.findFirst({where:{email:input.email}});
                if(exist!=null){
                    c.status(StatusCode.BADREQ);
                    return c.json({"error":[{message: 'Email already exist.'}]});
                }

                const user= await prisma.user.create({data: input});
          
                const token = await sign( user.id , c.env.JWT_SECRET)
                c.status(StatusCode.OK);
                return c.json({
                    token: token,
                    message:"user added successfully",
                    user: {
                        userId: user.id,
                        username: user.username,
                        email:user.email,
                      },
                })
            }

    } catch (error: any) {
      
        c.status(StatusCode.BADREQ);
        return   c.json({"error": [{message: error.message}]});
    }
 
}

export const signin= async (c:Context) => {
    try {
        const input: signinInput =   await c.req.json();
        const {success,error} =  signinSchema.safeParse(input);
        if(!success) {
            c.status(StatusCode.BADREQ);
            return   c.json({"error": error.issues});
        }else{
            const prisma = new PrismaClient({
                datasourceUrl: c.env.DATABASE_URL,
              }).$extends(withAccelerate());
            const user=  await prisma.user.findFirst({where:{email: input.email,password:input.password}})
              
            if(user==null){
                c.status(StatusCode.BADREQ);
                return c.json({message: "Please enter valid credentials"});
            }else{
                const token = await sign( user.id , c.env.JWT_SECRET)
                c.status(StatusCode.OK);
                return c.json({
                    token: token,
                    message:"logged in successfully",
                    user: {
                        userId: user.id,
                        username: user.username,
                        email:user.email,
                      },
                })
            }

        }

        
    } catch (error: any) {
      
        c.status(StatusCode.BADREQ);
        return c.json({"error": [{message: error.message}]});
    }
}
